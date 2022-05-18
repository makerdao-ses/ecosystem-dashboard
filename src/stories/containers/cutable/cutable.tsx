import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import { CustomTable } from '../../components/custom-table/custom-table';
import { CutableColumnSummary } from '../../components/cutable-column-summary/cutable-column-summary';
import { CutableColumnInitiatives } from '../../components/cutable-column-initiatives/cutable-column-initiatives';
import { CutableColumnExpenditures } from '../../components/cutable-column-expenditures/cutable-column-expenditures';
import { CutableColumnTeamMember } from '../../components/cutable-column-team-member/cutable-column-team-member';
import { CutableColumnLinks } from '../../components/cutable-column-links/cutable-column-links';
import { Box, Typography } from '@mui/material';
import {
  countInitiativesFromCoreUnit,
  getBudgetCapFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLinksFromCoreUnit,
  getMipFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip,
  getExpenditureValueFromCoreUnit
} from '../../../core/business-logic/core-units';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { loadAsync, selectCuTableItems } from './cutable.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';
import { CoreUnitDAO } from './cutable.api';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];

export const CUTable = () => {
  const data: Array<CoreUnitDAO> = useSelector((state: RootState) => selectCuTableItems(state));
  const dispatch = useAppDispatch();
  const [filteredStatuses, setFilteredStatuses] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(loadAsync());
  }, []);

  const filterData = () => {
    const lowerCaseStatuses = filteredStatuses.map(x => x.toLowerCase());
    const lowerCaseCategories = filteredCategories.map(x => x.toLowerCase());
    return data.filter(data => {
      let filterResult = true;

      // Filter by status
      filterResult = filterResult && (lowerCaseStatuses.length === 0 || lowerCaseStatuses.indexOf(data.cuMip[data.cuMip.length - 1]?.mipStatus?.toLowerCase() ?? 'non-present') > -1);

      // Filter by categories
      filterResult = filterResult && (lowerCaseCategories.length === 0 || data.category.some(x => lowerCaseCategories.indexOf(x.toLowerCase()) > -1));

      // Filter by name
      filterResult = filterResult && (searchText.trim().length === 0 || data.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || data.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

      return filterResult;
    });
  };

  const items = useMemo(() => {
    const filteredData = filterData();
    if (!filteredData) return [];
    return filteredData.map((coreUnit: CoreUnitDAO, i: number) => {
      return [
        <CutableColumnSummary
          key={`summary-${i}`}
          title={coreUnit.name}
          status={getMipFromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum }
          statusModified={getSubmissionDateFromCuMip(getMipFromCoreUnit(coreUnit))}
          imageUrl={coreUnit.image}
        />,
        <CutableColumnInitiatives
          key={`initiatives-${i}`}
          initiatives={countInitiativesFromCoreUnit(coreUnit)}
        />,
        <CutableColumnExpenditures
          key={`expenditures-${i}`}
          value={getExpenditureValueFromCoreUnit(coreUnit)}
          percent={getPercentFromCoreUnit(coreUnit)}
          items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
          budgetCap={getBudgetCapFromCoreUnit(coreUnit)}
        />,
        <CutableColumnTeamMember
          key={`teammember-${i}`}
          members={
            getFacilitatorsFromCoreUnit(coreUnit)
          }
          fte={getFTEsFromCoreUnit(coreUnit)}
        />,
        <CutableColumnLinks
          key={`links-${i}`}
          links={getLinksFromCoreUnit(coreUnit)}
        />
      ];
    });
  }, [data, filteredStatuses, filteredCategories, searchText]);

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
        <CustomMultiSelect label={'Status'} items={statuses} onChange={setFilteredStatuses}/>
        <CustomMultiSelect label={'Category'} items={categories} onChange={setFilteredCategories}/>
        <Separator />
        <SearchInput label={'Search CUs'} placeholder={'Search CUs by name or Code'} onChange={setSearchText}/>
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

const Title = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 600,
  flex: 1,
}));

const Separator = styled.span({
  width: '1px',
  height: '40px',
  backgroundColor: '#D3D4D8',
  margin: 'auto 24px'
});
