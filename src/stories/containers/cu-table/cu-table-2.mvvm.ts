import { siteRoutes } from '@ses/config/routes';
import request from 'graphql-request';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import {
  getExpenditureValueFromCoreUnit,
  getFTEsFromCoreUnit,
  getLastMonthWithData,
  getStautsMip39AccetedOrObsolete,
} from '../../../core/business-logic/core-units';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { SortEnum } from '../../../core/enums/sort.enum';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { sortAlphaNum } from '../../../core/utils/sort.utils';
import { buildQueryString } from '../../../core/utils/url.utils';
import { GETCoreUnits } from './cu-table.api';
import {
  renderExpenditures,
  renderLastModified,
  renderLinks,
  renderSummary,
  renderTeamMember,
} from './cu-table.renders';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import type { CustomTableColumn, CustomTableRow } from '../../components/custom-table/custom-table-2';

export const useCoreUnitsTableMvvm = () => {
  const router = useRouter();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);

  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const fetcher = (query: string) => request(GRAPHQL_ENDPOINT, query);
  const { data: res, error } = useSWR(GETCoreUnits, fetcher);

  const data = res?.coreUnits ?? null;
  const status = !data && !error ? 'loading' : data ? 'success' : 'idle';

  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [headersSort, setHeadersSort] = useState<SortEnum[]>([
    SortEnum.Asc,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Neutral,
    SortEnum.Disabled,
  ]);

  const [filtersPopup, setFiltersPopup] = useState(false);

  const toggleFiltersPopup = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('body').style.overflow = filtersPopup ? 'auto' : 'hidden';
    setFiltersPopup(!filtersPopup);
  };

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
    Object.values(CuStatusEnum).forEach((cat) => {
      result[cat] = statusesFiltered?.filter((cu) => getStautsMip39AccetedOrObsolete(cu) === cat).length;
    });
    result.All = statusesFiltered.length;
    return result;
  }, [statusesFiltered]);

  const clearFilters = () => {
    router.push({
      pathname: siteRoutes.coreUnitsOverview,
      search: '',
    });

    const input = document.querySelector('#search-input');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    input.value = '';
  };

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
    (cu: CoreUnitDto) => {
      router.push(`/core-unit/${cu.shortCode}${queryStrings}`);
    },
    [queryStrings, router]
  );

  const onClickFinances = useCallback(
    (cu: CoreUnitDto) => {
      router.push(`/core-unit/${cu.shortCode}/finances/reports${queryStrings}`);
    },
    [queryStrings, router]
  );

  const onClickLastModified = useCallback(
    (cu: CoreUnitDto) => {
      router.push(`/core-unit/${cu.shortCode}/activity-feed${queryStrings}`);
    },
    [queryStrings, router]
  );

  const columns: CustomTableColumn[] = [
    {
      header: 'Core Unit',
      justifyContent: 'flex-start',
      style: { paddingLeft: '16px' },
      cellRender: renderSummary,
      onClick: onClickRow,
      width: '400px',
      hasSort: true,
    },
    {
      header: 'Expenditure',
      justifyContent: 'flex-start',
      cellRender: renderExpenditures,
      onClick: onClickFinances,
      width: '215px',
      sortReverse: true,
      hasSort: true,
    },
    {
      header: 'Team Members',
      justifyContent: 'flex-start',
      cellRender: renderTeamMember,
      onClick: onClickRow,
      width: '205px',
      sortReverse: true,
      hasSort: true,
    },
    {
      header: 'Last Modified',
      justifyContent: 'flex-start',
      cellRender: renderLastModified,
      onClick: onClickLastModified,
      width: '122px',
      sortReverse: true,
      hasSort: true,
    },
    {
      header: '',
      justifyContent: 'center',
      cellRender: renderLinks,
      onClick: onClickRow,
      width: '358px',
      responsiveWidth: '186px',
      hasSort: false,
    },
  ];

  const sortData = useMemo(() => {
    const sortDataFunction = (items: CoreUnitDto[]) => {
      if (headersSort[sortColumn] === SortEnum.Disabled) return items;

      const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
      // Give number much bigger than assigned in giveWeightByStatus
      const multiplierStatus = 45;
      const statusSort = (a: CoreUnitDto, b: CoreUnitDto) => {
        const aCoreUnit = {
          ...a,
          status: giveWeightByStatus(getStautsMip39AccetedOrObsolete(a)),
        };
        const bCoreUnit = {
          ...b,
          status: giveWeightByStatus(getStautsMip39AccetedOrObsolete(b)),
        };
        return (
          sortAlphaNum(aCoreUnit.name, bCoreUnit.name) * multiplier -
          (aCoreUnit.status - bCoreUnit.status) * multiplierStatus
        );
      };
      const expendituresSort = (a: CoreUnitDto, b: CoreUnitDto) =>
        (getExpenditureValueFromCoreUnit(a) - getExpenditureValueFromCoreUnit(b)) * multiplier;
      const teamMembersSort = (a: CoreUnitDto, b: CoreUnitDto) =>
        (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;
      const lastModifiedSort = (a: CoreUnitDto, b: CoreUnitDto) => {
        if (multiplier === 1) {
          return (
            ((getLastMonthWithData(a)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis()) -
              (getLastMonthWithData(b)?.toMillis() ?? DateTime.fromJSDate(new Date()).toMillis())) *
            multiplier
          );
        }
        return ((getLastMonthWithData(a)?.toMillis() ?? 0) - (getLastMonthWithData(b)?.toMillis() ?? 0)) * multiplier;
      };
      const sortAlg = [statusSort, expendituresSort, teamMembersSort, lastModifiedSort, () => 0];
      return [...items].sort(sortAlg[sortColumn]);
    };
    return sortDataFunction;
  }, [headersSort, sortColumn]);

  const giveWeightByStatus = (status: CuStatusEnum) =>
    status === CuStatusEnum.Accepted
      ? 5
      : status === CuStatusEnum.FormalSubmission
      ? 4
      : status === CuStatusEnum.RFC
      ? 3
      : status === CuStatusEnum.Obsolete
      ? 2
      : status === CuStatusEnum.Rejected
      ? 1
      : 0;

  const dataWithStatus = useMemo(
    () =>
      filteredData?.map((item) => ({
        ...item,
        status: giveWeightByStatus(getStautsMip39AccetedOrObsolete(item)),
      })),
    [filteredData]
  );

  const groupByStatusDefaultSorting: CoreUnitDto[] = useMemo(() => {
    let resultArray: CoreUnitDto[] = [];
    const groupCoreUnitByStatus = groupBy(dataWithStatus, 'status');
    Object.values(groupCoreUnitByStatus).map((arrayValues) => {
      const alphabeticallyOrder = orderBy(arrayValues, 'name');
      resultArray = [...alphabeticallyOrder, ...resultArray];
      return resultArray;
    });
    return resultArray;
  }, [dataWithStatus]);

  const tableItems: CustomTableRow[] = useMemo(() => {
    const sortedData = sortData(groupByStatusDefaultSorting);
    return sortedData?.map((x: CoreUnitDto) => ({
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

  const applySort = (index: number, sort: SortEnum) => {
    const sortNeutralState = columns.map((column) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled
    ) as SortEnum[];
    sortNeutralState[index] = sort;
    setHeadersSort(sortNeutralState);
    setSortColumn(index);
  };

  return {
    onClickFinances,
    onClickRow,
    clearFilters,
    statusCount,
    categoriesCount,
    filteredData,
    status,
    sortColumn,
    headersSort,
    filtersPopup,
    toggleFiltersPopup,
    filteredStatuses,
    filteredCategories,
    searchText,
    columns,
    tableItems,
    onSortClick,
    applySort,
    queryStrings,
  };
};
