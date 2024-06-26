import { stringify } from 'querystring';
import { useMediaQuery, useTheme } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import type { Filter, SelectOption } from '@/components/FiltersBundle/types';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import {
  getStatusMip39AcceptedOrObsolete,
  getExpenditureValueFromCoreUnit,
  getFTEsFromCoreUnit,
  getLastMonthWithData,
} from '@/core/businessLogic/coreUnits';
import { CuCategoryEnum } from '@/core/enums/cuCategoryEnum';
import { SortEnum } from '@/core/enums/sortEnum';
import { useDebounce } from '@/core/hooks/useDebounce';
import { TeamStatus } from '@/core/models/interfaces/types';
import type { TeamCategory } from '@/core/models/interfaces/types';
import { filterData, getArrayParam, getStringParam } from '@/core/utils/filters';
import { sortAlphaNum } from '@/core/utils/sort';
import { pascalCaseToNormalString } from '@/core/utils/string';
import { buildQueryString } from '@/core/utils/urls';
import CustomItemAll from '../EcosystemActorsIndexView/components/ActorCustomItem/CustomItemAll';
import { renderExpenditures, renderLastModified, renderLinks, renderSummary, renderTeamMember } from './CuTableRenders';
import CustomCategoryFilter from './FilterItems/CustomCategoryFilter';
import CustomStatusItemFilter from './FilterItems/CustomStatusItemFilter';
import type { CustomTableColumn, CustomTableRow } from './CustomTable/CustomTable2';
import type { Theme } from '@mui/material';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

const statuses = Object.keys(TeamStatus) as string[];
const categories = Object.values(CuCategoryEnum) as string[];

export const useCoreUnitsTableView = (coreUnits: CoreUnit[]) => {
  const router = useRouter();
  const theme = useTheme();
  const debounce = useDebounce();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);

  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);
  const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop_1440'));
  const isDesk1024 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery((theme: Theme) => theme.breakpoints.between('desktop_1280', 'desktop_1440'));

  const data = coreUnits;
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Disabled,
  ]);

  const { filteredData, statusesFiltered, categoriesFiltered } = useMemo(
    () =>
      filterData({
        data,
        filteredStatuses,
        filteredCategories,
        searchText,
      }),
    [data, filteredCategories, filteredStatuses, searchText]
  );

  const categoriesCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(CuCategoryEnum).forEach((cat) => {
      result[cat] = categoriesFiltered?.filter((cu) => cu.category?.indexOf(cat) > -1).length;
    });
    result.All = categoriesFiltered.length;
    return result;
  }, [categoriesFiltered]);

  const statusCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.keys(TeamStatus).forEach((cat) => {
      result[cat] = statusesFiltered?.filter((cu) => cu.status === cat).length;
    });
    result.All = statusesFiltered.length;
    return result;
  }, [statusesFiltered]);

  const statusOptions = statuses.map((status) => ({
    label: pascalCaseToNormalString(status),
    value: status,
    extra: {
      count: `${statusCount[`${status}`]}`,
    },
  }));
  const categoriesOptions = categories.map((category) => ({
    label: category,
    value: category,
    extra: {
      count: `${categoriesCount[`${category}`]}`,
    },
  }));

  const queryStrings = useMemo(
    () =>
      buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      }),
    [filteredCategories, filteredStatuses, searchText]
  );

  const onClickRow = useCallback(
    (cu: CoreUnit) => {
      router.push(`/core-unit/${cu.shortCode}${queryStrings}`);
    },
    [queryStrings, router]
  );

  const onClickFinances = useCallback(
    (cu: CoreUnit) => {
      router.push(`/core-unit/${cu.shortCode}/finances/reports${queryStrings}`);
    },
    [queryStrings, router]
  );

  const onClickLastModified = useCallback(
    (cu: CoreUnit) => {
      router.push(`/core-unit/${cu.shortCode}/activity-feed${queryStrings}`);
    },
    [queryStrings, router]
  );

  const columns: CustomTableColumn[] = [
    {
      header: 'Core Unit',
      justifyContent: 'flex-start',

      cellRender: renderSummary,
      onClick: onClickRow,
      width: isDesk1024 ? '325px' : isDesk1280 ? '360px' : '360px',
      sortReverse: true,
      hasSort: true,

      style: {
        [theme.breakpoints.up('desktop_1280')]: {
          width: '290px',
        },
      },
    },
    {
      header: isDesk1024 ? 'L.M' : 'Last Modified',
      justifyContent: 'flex-start',
      cellRender: renderLastModified,
      onClick: onClickLastModified,
      width: '120px',
      sortReverse: true,
      hasSort: true,
      style: {
        [theme.breakpoints.up('desktop_1280')]: {
          width: 120,
          marginLeft: 70,
        },
      },
    },
    {
      header: 'Expenditure',
      justifyContent: 'flex-start',
      cellRender: renderExpenditures,
      onClick: onClickFinances,

      width: '141px',
      sortReverse: true,
      hasSort: true,
      style: {
        [theme.breakpoints.up('desktop_1280')]: {
          width: 165,
        },
      },
    },
    {
      header: 'Team',
      justifyContent: desktop ? 'center' : 'flex-start',
      cellRender: renderTeamMember,
      onClick: onClickRow,
      width: '140px',
      sortReverse: true,
      hasSort: true,
      style: {
        [theme.breakpoints.up('desktop_1280')]: {
          width: 165,
          minWidth: 165,
        },
        [theme.breakpoints.up('desktop_1440')]: {
          width: 165,
          minWidth: 165,
          justifyContent: 'flex-start',
        },
      },
    },

    {
      header: '',
      justifyContent: 'center',
      cellRender: renderLinks,
      onClick: onClickRow,
      width: '124px',
      hasSort: false,
      style: {
        [theme.breakpoints.up('desktop_1280')]: {
          width: 140,
          minWidth: 140,
        },
      },
    },
  ];

  const sortData = useMemo(() => {
    const sortDataFunction = (items: CoreUnit[]) => {
      if (headersSort[sortColumn] === SortEnum.Disabled) return items;

      const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
      // Give number much bigger than assigned in giveWeightByStatus
      const multiplierStatus = 45;
      const statusSort = (a: CoreUnit, b: CoreUnit) => {
        const aCoreUnit = {
          ...a,
          status: giveWeightByStatus(getStatusMip39AcceptedOrObsolete(a)),
        };
        const bCoreUnit = {
          ...b,
          status: giveWeightByStatus(getStatusMip39AcceptedOrObsolete(b)),
        };
        return (
          sortAlphaNum(aCoreUnit.name, bCoreUnit.name) * multiplier -
          (aCoreUnit.status - bCoreUnit.status) * multiplierStatus
        );
      };
      const lastModifiedSort = (a: CoreUnit, b: CoreUnit) => {
        if (multiplier === 1) {
          return (
            ((getLastMonthWithData(a)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis()) -
              (getLastMonthWithData(b)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis())) *
            multiplier
          );
        }
        return ((getLastMonthWithData(a)?.toMillis() ?? 0) - (getLastMonthWithData(b)?.toMillis() ?? 0)) * multiplier;
      };
      const expendituresSort = (a: CoreUnit, b: CoreUnit) =>
        (getExpenditureValueFromCoreUnit(a) - getExpenditureValueFromCoreUnit(b)) * multiplier;
      const teamMembersSort = (a: CoreUnit, b: CoreUnit) =>
        (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;

      const sortAlg = [statusSort, lastModifiedSort, expendituresSort, teamMembersSort, () => 0];
      return [...items].sort(sortAlg[sortColumn]);
    };
    return sortDataFunction;
  }, [headersSort, sortColumn]);

  const giveWeightByStatus = (status: TeamStatus) =>
    status === TeamStatus.Accepted
      ? 5
      : status === TeamStatus.FormalSubmission
      ? 4
      : status === TeamStatus.RFC
      ? 3
      : status === TeamStatus.Obsolete
      ? 2
      : status === TeamStatus.Rejected
      ? 1
      : 0;

  // Add a new property 'weight' to each item in the filtered data
  const dataWithStatus = useMemo(
    () =>
      filteredData?.map((item) => ({
        ...item,
        weight: giveWeightByStatus(item.status as TeamStatus),
      })),
    [filteredData]
  );

  // Group by weight and sort within each group alphabetically by name, then sort the groups by weight in descending order
  const groupByStatusDefaultSorting: CoreUnit[] = useMemo(() => {
    let resultArray: CoreUnit[] = [];
    const groupCoreUnitByWeight = groupBy(dataWithStatus, 'weight');

    const sortedGroups = Object.entries(groupCoreUnitByWeight).sort(
      ([weightA], [weightB]) => Number(weightB) - Number(weightA)
    );

    sortedGroups.forEach(([, arrayValues]) => {
      const alphabeticallyOrder = orderBy(arrayValues, (item) => item.name.toLowerCase(), ['asc']);

      resultArray = [...resultArray, ...alphabeticallyOrder];
    });

    return resultArray;
  }, [dataWithStatus]);

  const tableItems: CustomTableRow[] = useMemo(() => {
    const sortedData = sortData(groupByStatusDefaultSorting);
    return sortedData?.map((x: CoreUnit) => ({
      value: x,
      key: x.code,
    }));
  }, [groupByStatusDefaultSorting, sortData]);

  const onSortClick = (index: number) => {
    const sortNeutralState = columns.map((column) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled
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

  const handleChangeUrl = useCallback(
    (key: string) => (value: string[] | string) => {
      const search = router.query;
      const formattedValue = Array.isArray(value) ? value.map((val) => val.replace(/\s+/g, '')).join(',') : value || '';
      search[key] = formattedValue;
      router.push({
        pathname: siteRoutes.coreUnitsOverview,
        search: stringify(search),
      });
    },
    [router]
  );
  const searchFilters = (value: string) => {
    debounce(() => {
      handleChangeUrl('searchText')(value);
    }, 300);
  };

  // Filters Options
  const filters: Filter[] = [
    {
      type: 'select',
      id: 'status',
      label: 'Status',
      selected: filteredStatuses,
      multiple: true,
      onChange: (value: string | number | (string | number)[]) => {
        const formatValue = (val: string | number) => {
          if (typeof val === 'string') {
            return val.replace(/\s+/g, '');
          }
          return val;
        };

        const formattedValue = Array.isArray(value) ? value.map(formatValue) : formatValue(value);
        handleChangeUrl('filteredStatuses')(formattedValue as string | string[]);
      },

      options: statusOptions,
      customOptionsRender: (option: SelectOption, isActive: boolean) => (
        <CustomStatusItemFilter count={option?.extra?.count} isActive={isActive} status={option.label as TeamStatus} />
      ),
      withAll: true,
      customOptionsRenderAll: (isActive: boolean) => (
        <CustomItemAll isActive={isActive} total={data.length}>
          <StatusChip status={'All' as TeamStatus} />
        </CustomItemAll>
      ),

      widthStyles: {
        width: 'fit-content',

        menuWidth: 290,
      },
    },
    {
      type: 'select',
      id: 'categories',
      label: 'Categories',
      selected: filteredCategories,
      multiple: true,
      options: categoriesOptions,
      onChange: (value: string | number | (string | number)[]) => {
        const formattedValue = typeof value === 'string' ? value.replace(/\s+/g, '') : value;
        handleChangeUrl('filteredCategories')(formattedValue as string | string[]);
      },

      customOptionsRender: (option: SelectOption, isActive: boolean) => (
        <CustomCategoryFilter isActive={isActive} category={option.label as TeamCategory} count={option.extra?.count} />
      ),
      widthStyles: {
        width: 165,
        menuWidth: 290,
      },
      withAll: true,
      customOptionsRenderAll: (isActive: boolean) => (
        <CustomItemAll isActive={isActive} total={data.length}>
          <CategoryChip category={'All' as TeamCategory} />
        </CustomItemAll>
      ),
    },
  ];
  const canReset = searchText !== '' || filteredCategories.length > 0 || filteredStatuses.length > 0;
  const onReset = () => {
    const newQuery = { ...router.query };
    delete newQuery.searchText;
    delete newQuery.filteredStatuses;
    delete newQuery.filteredCategories;

    router.push({
      pathname: siteRoutes.coreUnitsOverview,
      search: stringify(newQuery),
    });
  };

  return {
    onClickFinances,
    onClickRow,

    statusCount,
    categoriesCount,
    filteredData,

    sortColumn,
    headersSort,
    filteredStatuses,
    filteredCategories,
    searchText,
    columns,
    tableItems,
    onSortClick,

    queryStrings,
    sortData,
    filters,
    canReset,
    onReset,
    searchFilters,
  };
};
