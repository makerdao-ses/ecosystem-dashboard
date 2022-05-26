import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  countInitiativesFromCoreUnit,
  getBudgetCapFromCoreUnit,
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
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { CustomTable } from '../../components/custom-table/custom-table';
import { SearchInput } from '../../components/search-input/search-input';
import {
  loadCuTableItemsAsync,
  loadFacilitatorImage,
  selectCuTableItems,
  selectFacilitatorImages,
  setFacilitatorImageAsPending
} from './cu-table.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';
import { CoreUnitDao } from './cu-table.api';
import { SortEnum } from '../../../core/enums/sort.enum';
import { sortAlphaNum } from '../../../core/utils/sort.utils';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];
const sortInitialState = [SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Disabled];

export const CuTable = () => {
  const [filters] = useSearchParams();
  const navigate = useNavigate();
  const data: Array<CoreUnitDao> = useSelector((state: RootState) => selectCuTableItems(state));
  const facilitatorImages = useSelector((state: RootState) => selectFacilitatorImages(state));
  const dispatch = useAppDispatch();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', filters), [filters]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', filters), [filters]);
  const searchText = useMemo(() => getStringParam('searchText', filters), [filters]);

  const [headersSort, setHeadersSort] = useState(sortInitialState);
  const [sortColumn, setSortColumn] = useState(-1);

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

  const filteredData = useMemo(() =>
    filterData({
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
  }, [data]);

  const handleChangeUrlFilterArrays = useCallback((key: string) => (value: string[]) => {
    filters.set(key, value.join(','));
    navigate({
      pathname: '/',
      search: `?${filters.toString()}`,
    });
  }, [filters, navigate]);

  const handleChangeUrlFilterString = useCallback((key: string) => (value: string) => {
    filters.set(key, value);
    navigate({
      pathname: '/',
      search: `?${filters.toString()}`,
    });
  }, [filters, navigate]);

  const onClickRow = useCallback((id: string) => () => {
    navigate(`/about/${id}?${filters.toString()}`);
  }, [filters, navigate]);

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
          budgetCap={getBudgetCapFromCoreUnit(coreUnit)}
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
        />
      ];
    });
  }, [data, filteredStatuses, filteredCategories, searchText, facilitatorImages, headersSort]);

  return <ContainerHome>
    <Box
      component="main"
      sx={{
        px: '32px',
        flexGrow: 1,
        overflow: 'auto',
        mt: 4,
        mb: 4
      }}
    >
      <Header>
        <Title>Core Units</Title>
        <CustomMultiSelect
          label={'Status'}
          initialActiveItems={filteredStatuses}
          items={statuses}
          onChange={handleChangeUrlFilterArrays('filteredStatuses')}
        />
        <CustomMultiSelect
          label={'Category'}
          initialActiveItems={filteredCategories}
          items={categories}
          onChange={handleChangeUrlFilterArrays('filteredCategories')}
        />
        <Separator />
        <SearchInput
          value={searchText}
          label={'Search CUs'}
          placeholder={'Search CUs by name or Code'}
          onChange={handleChangeUrlFilterString('searchText')}
        />
      </Header>
      <CustomTable
        headers={headers}
        items={items}
        headersAlign={['flex-start', 'center', 'flex-start', 'flex-start', 'flex-start']}
        headersSort={headersSort}
        sortFunction={setSort}
      />
    </Box >
  </ContainerHome>;
};

const ContainerHome = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
});

const Title = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
  flex: 1,
});

const Separator = styled.span({
  width: '1px',
  height: '40px',
  backgroundColor: '#D3D4D8',
  margin: 'auto 24px'
});
