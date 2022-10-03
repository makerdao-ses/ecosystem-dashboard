import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import {
  getExpenditureValueFromCoreUnit,
  getFTEsFromCoreUnit,
  getLastMonthWithData,
  getLatestMip39FromCoreUnit,
} from '../../../core/business-logic/core-units';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/url.utils';
import request from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import { GETCoreUnits } from './cu-table.api';
import useSWR from 'swr';
import { CustomTableColumn, CustomTableRow } from '../../components/custom-table/custom-table-2';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import {
  renderExpenditures,
  renderLastModified,
  renderLinks,
  renderSummary,
  renderTeamMember,
} from './cu-table.renders';
import { SortEnum } from '../../../core/enums/sort.enum';
import { sortAlphaNum } from '../../../core/utils/sort.utils';

export const useCoreUnitsTableMvvm = () => {
  const router = useRouter();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);

  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const fetcher = (query: string) => request(GRAPHQL_ENDPOINT, query);
  const { data: res, error } = useSWR(GETCoreUnits, fetcher);

  const data = res?.coreUnits ?? null;
  const status = !data && !error ? 'loading' : data ? 'success' : 'idle';

  const [sortColumn, setSortColumn] = useState<number>(0);
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
  }, [filteredData]);

  const statusCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(CuStatusEnum).forEach((cat) => {
      result[cat] = statusesFiltered?.filter((cu) => getLatestMip39FromCoreUnit(cu)?.mipStatus === cat).length;
    });
    result.All = statusesFiltered.length;
    return result;
  }, [filteredData]);

  const clearFilters = () => {
    router.push({
      pathname: '/',
      search: '',
    });

    const input = document.querySelector('#search-input');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    input.value = '';
  };

  const onClickRow = useCallback(
    (cu: CoreUnitDto) => {
      const queryStrings = buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      });
      router.push(`/core-unit/${cu.shortCode}${queryStrings}`);
    },
    [filteredCategories, filteredStatuses, router, searchText]
  );

  const onClickFinances = useCallback(
    (cu: CoreUnitDto) => {
      const queryStrings = buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      });
      router.push(`/core-unit/${cu.shortCode}/finances/reports${queryStrings}`);
    },
    [filteredCategories, filteredStatuses, router, searchText]
  );

  const columns: CustomTableColumn[] = [
    {
      header: 'Core Unit',
      justifyContent: 'flex-start',
      style: { paddingLeft: '16px' },
      cellRender: renderSummary,
      onClick: onClickRow,
      width: '400px',
    },
    {
      header: 'Expenditure',
      justifyContent: 'flex-start',
      cellRender: renderExpenditures,
      onClick: onClickFinances,
      width: '215px',
    },
    {
      header: 'Team Members',
      justifyContent: 'center',
      cellRender: renderTeamMember,
      onClick: onClickRow,
      width: '205px',
      sortReverse: true,
    },
    {
      header: 'Last Modified',
      justifyContent: 'flex-start',
      cellRender: renderLastModified,
      onClick: onClickRow,
      width: '122px',
      sortReverse: true,
    },
    {
      header: '',
      justifyContent: 'center',
      cellRender: renderLinks,
      onClick: onClickRow,
      width: '358px',
      responsiveWidth: '186px',
    },
  ];

  const sortData = (items: CoreUnitDto[]) => {
    if (headersSort[sortColumn] === SortEnum.Disabled) return items;

    const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
    const nameSort = (a: CoreUnitDto, b: CoreUnitDto) => sortAlphaNum(a.name, b.name) * multiplier;
    const expendituresSort = (a: CoreUnitDto, b: CoreUnitDto) =>
      (getExpenditureValueFromCoreUnit(a) - getExpenditureValueFromCoreUnit(b)) * multiplier;
    const teamMembersSort = (a: CoreUnitDto, b: CoreUnitDto) =>
      (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;
    const lastModifiedSort = (a: CoreUnitDto, b: CoreUnitDto) => {
      return (
        ((getLastMonthWithData(a.budgetStatements)?.toMillis() ?? 0) -
          (getLastMonthWithData(b.budgetStatements)?.toMillis() ?? 0)) *
        multiplier
      );
    };
    const sortAlg = [nameSort, expendituresSort, teamMembersSort, lastModifiedSort, () => 0];
    return [...items].sort(sortAlg[sortColumn]);
  };

  const tableItems: CustomTableRow[] = useMemo(() => {
    const sortedData = sortData(filteredData);
    return sortedData?.map((x: CoreUnitDto) => ({
      value: x,
      key: x.code,
    }));
  }, [data, sortColumn, headersSort, filteredCategories, filteredStatuses, searchText]);

  const onSortClick = (index: number) => {
    const sortNeutralState = [
      SortEnum.Neutral,
      SortEnum.Neutral,
      SortEnum.Neutral,
      SortEnum.Neutral,
      SortEnum.Disabled,
    ];

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
  };
};
