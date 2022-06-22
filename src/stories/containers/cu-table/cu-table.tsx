import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  countInitiativesFromCoreUnit,
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLinksFromCoreUnit,
  getMipFromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip
} from '../../../core/business-logic/core-units';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { CuTableColumnExpenditures } from '../../components/cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnInitiatives } from '../../components/cu-table-column-initiatives/cu-table-column-initiatives';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';
import { CustomTable } from '../../components/custom-table/custom-table';
import {
  loadCuTableItemsAsync,
  loadFacilitatorImage,
  selectCuTableItems,
  selectCuTableStatus,
  selectFacilitatorImages,
  setFacilitatorImageAsPending
} from './cu-table.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';
import { CoreUnitDao } from './cu-table.api';
import { SortEnum } from '../../../core/enums/sort.enum';
import { sortAlphaNum } from '../../../core/utils/sort.utils';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import { CustomButton } from '../../components/custom-button/custom-button';
import { useDebounce } from '../../../core/utils/use-debounce';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];
const sortInitialState = [SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Disabled];
const headerStyles: CSSProperties[] = [{ paddingLeft: '80px' }, { paddingLeft: '35px' }, { marginLeft: '-40px' }, {}, {}];

export const CuTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const debounce = useDebounce();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);
  const data: Array<CoreUnitDao> = useSelector((state: RootState) => selectCuTableItems(state));
  const facilitatorImages = useSelector((state: RootState) => selectFacilitatorImages(state));
  const status = useSelector((state: RootState) => selectCuTableStatus(state));

  const [headersSort, setHeadersSort] = useState(sortInitialState);
  const [sortColumn, setSortColumn] = useState(-1);

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

  const filteredData = useMemo(() => filterData({
    data,
    filteredStatuses,
    filteredCategories,
    searchText
  }), [data, filteredCategories, filteredStatuses, searchText]);

  const setSort = (index: number, prevStatus: SortEnum) => {
    if (prevStatus === 3) {
      setHeadersSort(sortInitialState);
      setSortColumn(-1);
    } else {
      const temp = [...sortInitialState];
      temp[index] = prevStatus + 1;
      setHeadersSort(temp);
      setSortColumn(index);
    }
  };

  const sortData = useCallback((items: CoreUnitDao[]) => {
    if (headersSort[sortColumn] === SortEnum.Disabled) return items;

    const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
    const nameSort = (a: CoreUnitDao, b: CoreUnitDao) => sortAlphaNum(a.name, b.name) * multiplier;
    const initiativesSort = (a: CoreUnitDao, b: CoreUnitDao) => (countInitiativesFromCoreUnit(a) - countInitiativesFromCoreUnit(b)) * multiplier;
    const expendituresSort = (a: CoreUnitDao, b: CoreUnitDao) => (getExpenditureValueFromCoreUnit(a) - getExpenditureValueFromCoreUnit(b)) * multiplier;
    const teamMembersSort = (a: CoreUnitDao, b: CoreUnitDao) => (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;

    const sortAlg = [nameSort, initiativesSort, expendituresSort, teamMembersSort];
    return [...items].sort(sortAlg[sortColumn]);
  }, [headersSort, sortColumn]);

  useEffect(() => {
    data.forEach(coreUnit => {
      const facilitators = getFacilitatorsFromCoreUnit(coreUnit);
      facilitators.forEach(facilitator => {
        const id = facilitator?.id?.toString();
        if (id && facilitatorImages[id] == null) {
          dispatch(setFacilitatorImageAsPending(id));
          dispatch(loadFacilitatorImage(id));
        }
      });
    });
  }, [data, dispatch, facilitatorImages]);

  const clearFilters = () => {
    router.push({
      pathname: '/',
      search: '',
    });
  };

  const handleChangeUrlFilterArrays = useCallback((key: string) => (value: string[] | string) => {
    const search = router.query;
    search[key] = Array.isArray(value) ? value.join(',') : (value || '');
    router.push({
      pathname: '/',
      search: stringify(search),
    });
  }, [router]);

  const onClickRow = useCallback((id: string) => () => {
    console.log('router.query', filteredStatuses, filteredCategories, searchText);
    router.push(`/about/${id}?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`);
  }, [filteredCategories, filteredStatuses, router, searchText]);

  const items = useMemo(() => {
    if (!filteredData) return [];
    const sortedData = sortData(filteredData);
    return sortedData.map((coreUnit: CoreUnitDao, i: number) => {
      return [
        <CuTableColumnSummary
          key={`summary-${i}`}
          title={coreUnit.name}
          status={getMipFromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
          statusModified={getSubmissionDateFromCuMip(getMipFromCoreUnit(coreUnit))}
          imageUrl={coreUnit.image}
          mipUrl={getMipUrlFromCoreUnit(coreUnit)}
          onClick={onClickRow(coreUnit.code)}
          code={coreUnit.code}
        />,
        <CuTableColumnInitiatives
          key={`initiatives-${i}`}
          initiatives={countInitiativesFromCoreUnit(coreUnit)}
        />,
        <CuTableColumnExpenditures
          key={`expenditures-${i}`}
          value={getExpenditureValueFromCoreUnit(coreUnit)}
          percent={getPercentFromCoreUnit(coreUnit)}
          items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
          budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
        />,
        <CuTableColumnTeamMember
          key={`teammember-${i}`}
          members={
            getFacilitatorsFromCoreUnit(coreUnit)
          }
          fte={getFTEsFromCoreUnit(coreUnit)}
          facilitatorImages={facilitatorImages}
        />,
        <CuTableColumnLinks
          key={`links-${i}`}
          links={getLinksFromCoreUnit(coreUnit)}
          spacingsRight={22}
          fill="#708390"
        />
      ];
    });
  }, [filteredData, sortData, onClickRow, facilitatorImages]);

  return <ContainerHome>
    <Header>
      <Title>Core Units</Title>
      <CustomButton
        label="Reset Filters"
        style={{
          marginRight: '16px',
          width: '114px',
          border: 'none'
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick={clearFilters}
        disabled={filteredStatuses && filteredStatuses.length === 0}
      />
      <CustomMultiSelect
        label="Status"
        activeItems={filteredStatuses}
        items={statuses}
        onChange={(value: string[]) => {
          handleChangeUrlFilterArrays('filteredStatuses')(value);
        }}
        style={{ marginRight: '16px' }}
      />
      <CustomMultiSelect
        label="CU Category"
        activeItems={filteredCategories}
        items={categories}
        onChange={(value: string[]) => {
          handleChangeUrlFilterArrays('filteredCategories')(value);
        }}
        style={{ marginRight: '16px' }}
      />
      <Separator />
      {router.isReady && <SearchInput
        defaultValue={searchText}
        placeholder="Search"
        onChange={(value: string) => {
          debounce(() => {
            handleChangeUrlFilterArrays('searchText')(value);
          }, 300);
        }}
        style={{ marginLeft: '16px' }}
      />}
      {!router.isReady && <SearchInput
        defaultValue={searchText}
        placeholder="Search"
        onChange={(value: string) => {
          debounce(() => {
            handleChangeUrlFilterArrays('searchText')(value);
          }, 300);
        }}
        style={{ marginLeft: '16px' }}
      />}
    </Header>
    <CustomTable
      headers={headers}
      items={items}
      headersAlign={['flex-start', 'center', 'center', 'flex-start', 'center']}
      headersSort={headersSort}
      headersStyles={headerStyles}
      sortFunction={setSort}
      loading={status === 'loading'}
    />
  </ContainerHome>;
};

const ContainerHome = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '22px 128px 0',
  marginTop: '64px',
  width: '100%',
  height: 'calc(100vh - 64px)',
  overflowY: 'scroll',
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
});

const Title = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  letterSpacing: '0.4px',
  flex: 1,
  color: '#231536'
});

const Separator = styled.span({
  width: '1px',
  height: '32px',
  backgroundColor: '#D4D9E1',
});
