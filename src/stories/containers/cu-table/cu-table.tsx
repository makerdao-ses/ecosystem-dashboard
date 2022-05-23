import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  countInitiativesFromCoreUnit,
  getBudgetCapFromCoreUnit, getExpenditureValueFromCoreUnit, getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit, getLast3ExpenditureValuesFromCoreUnit, getLinksFromCoreUnit,
  getMipFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip
} from '../../../core/business-logic/core-units';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { RootState } from '../../../core/store/store';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { CuTableColumnExpenditures } from '../../components/cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnInitiatives } from '../../components/cu-table-column-initiatives/cu-table-column-initiatives';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { CustomTable } from '../../components/custom-table/custom-table';
import { SearchInput } from '../../components/search-input/search-input';
import { CoreUnitDAO } from './cu-table.api';
import {
  loadCuTableItemsAsync,
  loadFacilitatorImage,
  selectCuTableItems,
  selectFacilitatorImages,
  setFacilitatorImageAsPending
} from './cu-table.slice';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];

export const CuTable = () => {
  const [filters] = useSearchParams();
  const navigate = useNavigate();
  const data: Array<CoreUnitDAO> = useSelector((state: RootState) => selectCuTableItems(state));
  const facilitatorImages = useSelector((state: RootState) => selectFacilitatorImages(state));
  const dispatch = useAppDispatch();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', filters), [filters]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', filters), [filters]);
  const searchText = useMemo(() => getStringParam('searchText', filters), [filters]);

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

  const filteredData = useMemo(() =>
    filterData({
      data, filteredStatuses, filteredCategories, searchText
    }), [data, filteredCategories, filteredStatuses, searchText]);

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
    return filteredData.map((coreUnit: CoreUnitDAO, i: number) => {
      return [
        <CuTableColumnSummary
          key={`summary-${i}`}
          title={coreUnit.name}
          status={getMipFromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
          statusModified={getSubmissionDateFromCuMip(getMipFromCoreUnit(coreUnit))}
          imageUrl={coreUnit.image}
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
  }, [filteredData, onClickRow, facilitatorImages]);

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
        <CustomMultiSelect label={'Status'} initialActiveItems={filteredStatuses} items={statuses} onChange={handleChangeUrlFilterArrays('filteredStatuses')} />
        <CustomMultiSelect label={'Category'} initialActiveItems={filteredCategories} items={categories} onChange={handleChangeUrlFilterArrays('filteredCategories')} />
        <Separator />
        <SearchInput value={searchText} label={'Search CUs'} placeholder={'Search CUs by name or Code'} onChange={handleChangeUrlFilterString('searchText')} />
      </Header>
      <CustomTable
        headers={headers}
        items={items}
        headersAlign={['left', 'center', 'left', 'left', 'left']}
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
