import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLatestMip39FromCoreUnit } from '../../../core/business-logic/core-units';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { RootState } from '../../../core/store/store';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/url.utils';
import { loadCuTableItemsAsync, selectCuTableHeadersSort, selectCuTableSortColumn } from './cu-table.slice';
import isEmpty from 'lodash/isEmpty';
import request from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../../../config/endpoints';
import { GETCoreUnits } from './cu-table.api';
import useSWR from 'swr';
import { CustomTableColumn, CustomTableRow } from '../../components/custom-table/custom-table-2';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { renderExpenditures, renderLinks, renderSummary, renderTeamMember } from './cu-table.renders';

export const useCoreUnitsTableMvvm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);

  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const fetcher = (query: string) => request(GRAPHQL_ENDPOINT, query);
  const { data: res, error } = useSWR(GETCoreUnits, fetcher);

  const data = res?.coreUnits ?? null;
  const status = !data && !error ? 'loading' : data ? 'success' : 'idle';

  const sortColumn = useSelector((state: RootState) => selectCuTableSortColumn(state));
  const headersSort = useSelector((state: RootState) => selectCuTableHeadersSort(state));
  const [filtersPopup, setFiltersPopup] = useState(false);

  const toggleFiltersPopup = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('body').style.overflow = filtersPopup ? 'auto' : 'hidden';
    setFiltersPopup(!filtersPopup);
  };

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(loadCuTableItemsAsync());
    }
  }, [dispatch]);

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
      style: { paddingLeft: '79.5px' },
      cellRender: renderSummary,
      onClick: onClickRow,
    },
    {
      header: 'Expenditure',
      justifyContent: 'flex-start',
      cellRender: renderExpenditures,
      onClick: onClickFinances,
    },
    {
      header: 'Team Members',
      justifyContent: 'center',
      cellRender: renderTeamMember,
      onClick: onClickRow,
    },
    {
      header: 'Links',
      justifyContent: 'center',
      cellRender: renderLinks,
      onClick: onClickRow,
    },
  ];

  const tableItems: CustomTableRow[] = useMemo(() => {
    return data?.map((x: CoreUnitDto) => ({
      value: x,
      key: x.code,
    }));
  }, [data]);

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
    tableItems
  };
};
