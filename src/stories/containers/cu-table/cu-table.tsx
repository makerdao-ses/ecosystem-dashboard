import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import { CustomTable } from '../../components/custom-table/custom-table';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnInitiatives } from '../../components/cu-table-column-initiatives/cu-table-column-initiatives';
import { CuTableColumnExpenditures } from '../../components/cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
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
import {
  loadCuTableItemsAsync,
  loadFacilitatorImage,
  selectCuTableItems,
  selectFacilitatorImages,
  setFacilitatorImageAsPending
} from './cu-table.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';
import { CoreUnitDAO } from './cu-table.api';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];

export const CuTable = () => {
  const data: Array<CoreUnitDAO> = useSelector((state: RootState) => selectCuTableItems(state));
  const facilitatorImages = useSelector((state: RootState) => selectFacilitatorImages(state));

  const dispatch = useAppDispatch();

  const [filteredStatuses, setFilteredStatuses] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
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

  const items = useMemo(() => {
    const filteredData = filterData();
    if (!filteredData) return [];
    return filteredData.map((coreUnit: CoreUnitDAO, i: number) => {
      return [
        <CuTableColumnSummary
          key={`summary-${i}`}
          title={coreUnit.name}
          status={getMipFromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum }
          statusModified={getSubmissionDateFromCuMip(getMipFromCoreUnit(coreUnit))}
          imageUrl={coreUnit.image}
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
  }, [data, filteredStatuses, filteredCategories, searchText, facilitatorImages]);

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
