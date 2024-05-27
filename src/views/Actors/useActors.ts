import { stringify } from 'querystring';
import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { TeamCategory } from '@ses/core/models/interfaces/types';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import orderBy from 'lodash/orderBy';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import { filterDataActors, filterDataScopeActors, getActorLastMonthWithData } from './utils/utils';
import type { ActorTableHeader } from './components/ActorHeader/ActorsHeaderTable';
import type { Team } from '@ses/core/models/interfaces/team';

export const useActors = (actors: Team[], stories = false) => {
  const router = useRouter();
  const isLessPhone = useMediaQuery(lightTheme.breakpoints.down(376));
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const filteredScopes = useMemo(() => getArrayParam('filteredScopes', router.query), [router.query]);
  const [readMore, setReadMore] = useState<boolean>(stories);
  const showTextDesk = readMore;
  const handleRead = () => {
    setReadMore(!readMore);
  };

  const queryStrings = useMemo(() => buildQueryString(router.query), [router.query]);

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
          minWidth: 250,
          paddingLeft: 16,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          width: 304,
          paddingLeft: 16,
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
          width: 230,
          minWidth: 200,
          paddingLeft: 25,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 55,
          width: 200,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 90,
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
          minWidth: 200,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 86,
          width: 204,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 190,
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
          minWidth: 250,
          marginLeft: 10,
        },
        [lightTheme.breakpoints.up('desktop_1280')]: {
          marginLeft: 140,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          marginLeft: 185,

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

  const groupByStatusDefaultSorting: Team[] = useMemo(() => {
    const resultMoment = orderBy(filteredScopeData, 'name');

    return resultMoment;
  }, [filteredScopeData]);

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

  // TODO: Remove this add new search when filter is add
  const filtersActive = tableItems;
  const clearFilters = () => {
    router.push({
      pathname: siteRoutes.ecosystemActors,
      search: '',
    });
  };

  const handleChangeUrlFilterArrays = useCallback(
    (key: string) => (value: string[] | string) => {
      const search = router.query;
      search[key] = Array.isArray(value) ? value.join(',') : value || '';
      router.push({
        pathname: '',
        search: stringify(search),
      });
    },
    [router]
  );

  return {
    handleRead,
    readMore,
    showTextDesk,
    isLessPhone,
    filtersActive,
    columns,
    onSortClick,
    clearFilters,
    categoriesCount,
    handleChangeUrlFilterArrays,
    filteredCategories,
    queryStrings,
    filteredScopes,
    scopeCount,
  };
};
