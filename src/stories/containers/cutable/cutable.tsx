import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CuCategory } from '../../../core/enums/cu-category';
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
  CoreUnitDAO,
  countInitiativesFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLinksFromCoreUnit,
  getMipFromCoreUnit,
  getSubmissionDateFromCuMip
} from './cutable.api';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { loadAsync, selectCuTableItems } from './cutable.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategory) as string[];
const headers = ['Core Units', 'Initiatives', 'Expenditure', 'Team Members', 'Links'];

export const CUTable = () => {
  const data = useSelector((state: RootState) => selectCuTableItems(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAsync());
  }, []);

  const items = useMemo(() => {
    if (!data) return [];
    console.log(data);
    return data.map((coreUnit: CoreUnitDAO, i: number) => {
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
          value={16500}
          percent={120}
          items={[{ value: 55 }, { value: 90 }, { value: 120 }]}
          budgetCap={100}
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
  }, [data]);

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
        <Title>Core Units: </Title>
        <CustomMultiSelect label={'Status'} items={statuses} />
        <CustomMultiSelect label={'Category'} items={categories} />
        <Separator />
        <SearchInput label={'Search CUs'} placeholder={'Search CUs by name or Code'} />
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
