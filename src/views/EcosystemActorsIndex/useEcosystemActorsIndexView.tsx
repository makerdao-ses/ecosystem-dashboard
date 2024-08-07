import { stringify } from 'querystring';
import { siteRoutes } from '@ses/config/routes';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { ActorCategory, TeamCategory } from '@ses/core/models/interfaces/types';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import orderBy from 'lodash/orderBy';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import type { Filter, SelectOption } from '@/components/FiltersBundle/types';
import RoleChip from '@/components/RoleChip/RoleChip';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { TeamRole } from '@/core/enums/teamRole';
import type { Scope } from '@/core/models/interfaces/scopes';
import { pascalCaseToNormalString } from '@/core/utils/string';
import CustomItemAll from './components/ActorCustomItem/CustomItemAll';
import { CustomItemRole } from './components/ActorCustomItem/CustomItemRole';
import CustomItemScope from './components/ActorCustomItem/CustomItemScope';
import { filterActorsText, filterDataActors, filterDataScopeActors, getActorLastMonthWithData } from './utils/utils';
import type { ActorTableHeader } from './components/ActorHeader/ActorsHeaderTable';
import type { Team } from '@ses/core/models/interfaces/team';

const scopesDefinitions: Scope[] = [
  {
    id: '1',
    code: 'PRO',
    name: TeamScopeEnum.ProtocolScope,
  },
  {
    id: '2',
    code: 'ACC',
    name: TeamScopeEnum.AccessibilityScope,
  },
  {
    id: '3',
    code: 'GOV',
    name: TeamScopeEnum.GovernanceScope,
  },
  {
    id: '3',
    code: 'SUP',
    name: TeamScopeEnum.SupportScope,
  },
  {
    id: '3',
    code: 'STA',
    name: TeamScopeEnum.StabilityScope,
  },
];

export const useEcosystemActorsIndexView = (actors: Team[], stories = false) => {
  const router = useRouter();
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const filteredScopes = useMemo(() => getArrayParam('filteredScopes', router.query), [router.query]);
  const previousSearchTextRef = useRef<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const deferredSearchText = useDeferredValue(searchText);
  const [readMore, setReadMore] = useState<boolean>(stories);
  const showTextDesk = readMore;

  const handleRead = () => {
    setReadMore(!readMore);
  };

  const handleChangeUrl = useCallback(
    (key: string) => (value: string[] | string) => {
      const search = router.query;
      const formattedValue = Array.isArray(value) ? value.map((val) => val.replace(/\s+/g, '')).join(',') : value || '';
      search[key] = formattedValue;
      router.push({
        pathname: siteRoutes.ecosystemActors,
        search: stringify(search),
      });
    },
    [router]
  );
  const searchFilters = (value: string) => {
    setSearchText(value);
  };

  useEffect(() => {
    const queryStrings = buildQueryString({
      filteredScopes,
      filteredCategories,
      searchText: deferredSearchText,
    });
    // Avoid re-render
    if (deferredSearchText !== previousSearchTextRef.current) {
      router.replace({
        pathname: siteRoutes.ecosystemActors,
        search: queryStrings,
      });
      previousSearchTextRef.current = deferredSearchText;
    }
  }, [deferredSearchText, filteredCategories, filteredScopes, router]);

  const queryStrings = useMemo(
    () =>
      buildQueryString({
        filteredScopes,
        filteredCategories,
        searchText,
      }),
    [filteredCategories, filteredScopes, searchText]
  );

  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Disabled,
  ]);

  const columns: ActorTableHeader[] = [
    {
      header: 'Ecosystem Actor',
      styles: {
        boxSizing: 'border-box',
        [lightTheme.breakpoints.up('desktop_1024')]: {
          width: 250,
          paddingLeft: 0,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          width: 304,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginTop: 1,
          paddingLeft: 8,
        },
      },
      sortReverse: true,
      sort: headersSort[0],
    },
    {
      header: 'Role',
      styles: {
        width: 200,
        paddingLeft: 4,
        [lightTheme.breakpoints.up('desktop_1024')]: {
          width: 220,
          minWidth: 200,
          paddingLeft: 10,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 36,
          width: 200,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 78,
          marginTop: 1,
        },
      },
      sortReverse: true,
      sort: headersSort[1],
    },
    {
      header: 'Scope',
      sort: headersSort[2],
      styles: {
        width: 232,
        [lightTheme.breakpoints.up('desktop_1024')]: {
          width: 200,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 72,
          width: 204,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 165,
          marginTop: 1,
          justifyContent: 'center',
        },
      },
      sortReverse: true,
    },
    {
      header: 'Last Modified',
      sort: headersSort[3],
      styles: {
        width: 200,
        [lightTheme.breakpoints.up('desktop_1024')]: {
          width: 200,
          marginLeft: 12,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          marginLeft: 124,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginLeft: 198,

          justifyContent: 'center',
        },
      },
      sortReverse: true,
    },
  ];
  const { filteredCategoryData } = useMemo(
    () =>
      filterDataActors({
        data: actors,
        filteredCategories,
      }),
    [actors, filteredCategories]
  );

  const { filteredScopeData } = useMemo(
    () =>
      filterDataScopeActors({
        data: filteredCategoryData,
        filteredScopes,
      }),
    [filteredCategoryData, filteredScopes]
  );

  const filteredTexData = useMemo(
    () =>
      filterActorsText({
        data: filteredScopeData,
        text: searchText,
      }),
    [filteredScopeData, searchText]
  );

  const groupByStatusDefaultSorting: Team[] = useMemo(() => {
    const resultMoment = orderBy(filteredTexData, 'name');

    return resultMoment;
  }, [filteredTexData]);

  const categoriesCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(TeamCategory).forEach((cat) => {
      result[cat] = actors?.filter((cu) => cu.category?.indexOf(cat) > -1).length;
    });
    result.All = actors.length;
    return result;
  }, [actors]);

  const scopeCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(TeamScopeEnum).forEach((cat) => {
      const getActorsNumbers = actors
        .map((actor) => actor.scopes?.map((scope) => scope.name))
        .filter((item) => item?.indexOf(cat) > -1).length;

      result[cat] = getActorsNumbers;
    });
    result.All = actors.length;
    return result;
  }, [actors]);
  const sortData = useMemo(() => {
    const sortDataFunction = (items: Team[]) => {
      if (headersSort[sortColumn] === SortEnum.Disabled) return items;

      const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;

      const name = (a: Team, b: Team) => a.name.localeCompare(b.name) * multiplier;
      const role = (a: Team, b: Team) => a.category?.[0]?.localeCompare(b.category?.[0]) * multiplier;
      const scope = (a: Team, b: Team) => a.scopes?.[0]?.name?.localeCompare(b.scopes?.[0]?.name) * multiplier;
      const lastModified = (a: Team, b: Team) => {
        if (multiplier === 1) {
          return (
            ((getActorLastMonthWithData(a)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis()) -
              (getActorLastMonthWithData(b)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis())) *
            multiplier
          );
        }
        return (
          ((getActorLastMonthWithData(a)?.toMillis() ?? 0) - (getActorLastMonthWithData(b)?.toMillis() ?? 0)) *
          multiplier
        );
      };

      const sortAlg = [name, role, scope, lastModified, () => 0];
      return [...items].sort(sortAlg[sortColumn]);
    };
    return sortDataFunction;
  }, [headersSort, sortColumn]);

  const tableItems: Team[] = useMemo(() => {
    const sortedData = sortData(groupByStatusDefaultSorting);
    return sortedData?.map((x: Team) => ({
      ...x,
      value: x,
      key: x.code,
    }));
  }, [groupByStatusDefaultSorting, sortData]);

  const onSortClick = (index: number) => {
    const sortNeutralState = columns.map((column) =>
      column.sort ? SortEnum.Neutral : SortEnum.Disabled
    ) as SortEnum[];

    if (headersSort[index] === SortEnum.Neutral) {
      if (columns[index].sortReverse) {
        sortNeutralState[index] = SortEnum.Desc;
      } else {
        sortNeutralState[index] = SortEnum.Asc;
      }
    } else {
      sortNeutralState[index] = headersSort[index] === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc;
    }

    setHeadersSort(sortNeutralState);
    setSortColumn(index);
  };

  const filtersActive = tableItems;
  const clearFilters = () => {
    router.push({
      pathname: siteRoutes.ecosystemActors,
      search: '',
    });
  };

  const categories = Object.values(ActorCategory) as string[];
  const categoryOptions: SelectOption[] = categories.map((category) => ({
    label: category,
    value: category,
    extra: {
      count: `${categoriesCount[`${category}`]}`,
    },
  }));

  const scopeOptions = scopesDefinitions.map((scope) => ({
    label: scope.name,
    value: scope.name,
    extra: {
      count: `${scopeCount[`${scope.name}`]}`,
    },
  }));

  const filter: Filter[] = [
    {
      type: 'select',
      id: 'scopes',
      label: 'Scopes',
      selected: filteredScopes.map((item) => pascalCaseToNormalString(item)),
      multiple: true,
      onChange: (value: string | number | (string | number)[]) => {
        const formattedValue = typeof value === 'string' ? value.replace(/\s+/g, '') : value;
        handleChangeUrl('filteredScopes')(formattedValue as string | string[]);
      },
      options: scopeOptions,
      customOptionsRender: (option: SelectOption, isActive: boolean) => (
        <CustomItemScope
          count={option?.extra?.count}
          isActive={isActive}
          scopes={scopesDefinitions}
          scope={option.label as TeamScopeEnum}
        />
      ),
      withAll: true,
      customOptionsRenderAll: (isActive: boolean) => (
        <CustomItemAll isActive={isActive} total={actors.length}>
          <ScopeChip
            size="medium"
            scope={{
              id: 'All',
              code: 'All',
              name: TeamScopeEnum.All,
            }}
          />
        </CustomItemAll>
      ),

      widthStyles: {
        width: 'fit-content',
        menuWidth: 350,
      },
    },
    {
      type: 'select',
      id: 'actor_role',
      label: 'Actor Role',
      selected: filteredCategories,
      multiple: true,
      alwaysNumberedLabel: true,
      options: categoryOptions,
      onChange: (value: string | number | (string | number)[]) => {
        handleChangeUrl('filteredCategories')(value as string | string[]);
      },
      customOptionsRender: (option: SelectOption, isActive: boolean) => (
        <CustomItemRole isActive={isActive} role={option.value as TeamRole} count={option?.extra?.count} />
      ),
      widthStyles: {
        width: 160,
        menuWidth: 350,
      },
      withAll: true,
      customOptionsRenderAll: (isActive: boolean) => (
        <CustomItemAll isActive={isActive} total={actors.length}>
          <RoleChip status={TeamRole.All} />
        </CustomItemAll>
      ),
    },
  ];

  const canReset = searchText !== '' || filteredCategories.length > 0 || filteredScopes.length > 0;
  const onReset = () => {
    const newQuery = { ...router.query };
    delete newQuery.searchText;
    delete newQuery.filteredCategories;
    delete newQuery.filteredScopes;

    router.push({
      pathname: siteRoutes.ecosystemActors,
      search: stringify(newQuery),
    });
    setSearchText('');
  };

  return {
    handleRead,
    readMore,
    showTextDesk,
    filtersActive,
    columns,
    onSortClick,
    clearFilters,
    categoriesCount,
    handleChangeUrl,
    filteredCategories,
    queryStrings,
    filteredScopes,
    scopeCount,
    searchText,
    filter,
    canReset,
    onReset,
    searchFilters,
  };
};
