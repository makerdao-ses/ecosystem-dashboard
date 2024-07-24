import { styled } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import type { TeamStatus } from '@/core/models/interfaces/types';
import ListMobileSheetIconArrow from '@/views/CoreUnitsIndex/ListMobileSheetIconArrow';
import { CuTableColumnExpenditures } from '@/views/CoreUnitsIndex/components/CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnSummary } from '@/views/CoreUnitsIndex/components/CuTableColumnSummary/CuTableColumnSummary';
import CuTableColumnTeamMember from '@/views/CoreUnitsIndex/components/CuTableColumnTeamMember/CuTableColumnTeamMember';
import LastModifiedActorCoreUnit from '@/views/CoreUnitsIndex/components/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';

import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLastMonthWithData,
  getLast3ExpenditureValuesFromCoreUnit,
  getLast3MonthsWithDataFormatted,
  getLatestMip39FromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '../../../core/businessLogic/coreUnits';
import { getShortCode } from '../../../core/utils/string';

import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CoreUnitCardProps {
  coreUnit: CoreUnit;
}

const CoreUnitCard = ({ coreUnit }: CoreUnitCardProps) => (
  <Container>
    <ContainerRow>
      <Summary>
        <CuTableColumnSummary
          href={siteRoutes.coreUnitAbout(coreUnit.shortCode)}
          title={coreUnit?.name}
          status={coreUnit.status as TeamStatus}
          statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
          imageUrl={coreUnit?.image}
          mipUrl={getMipUrlFromCoreUnit(coreUnit)}
          code={getShortCode(coreUnit.code)}
          categories={coreUnit.category}
          isCard={true}
        />
      </Summary>
      <DivSpaceSummary href={siteRoutes.coreUnitAbout(coreUnit.shortCode)} />
      <Expenditure>
        <CuTableColumnExpenditures
          value={getExpenditureValueFromCoreUnit(coreUnit)}
          percent={getPercentFromCoreUnit(coreUnit)}
          items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
          budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
          months={getLast3MonthsWithDataFormatted(coreUnit)}
          code={getShortCode(coreUnit.code)}
        />
      </Expenditure>
      <DivSpaceExpenditure href={siteRoutes.coreUnitAbout(coreUnit.shortCode)} />
      <Team href={siteRoutes.coreUnitAbout(coreUnit.shortCode)}>
        <CuTableColumnTeamMember members={getFacilitatorsFromCoreUnit(coreUnit)} fte={getFTEsFromCoreUnit(coreUnit)} />
      </Team>
      <DivSpaceTeam href={siteRoutes.coreUnitAbout(coreUnit.shortCode)} />

      <ContainerLinks>
        <ListMobileSheetIconArrow coreUnit={coreUnit} />
      </ContainerLinks>
    </ContainerRow>

    <LastModifiedActorCoreUnitStyled
      date={getLastMonthWithData(coreUnit)}
      href={`${siteRoutes.coreUnitActivityFeed(coreUnit.shortCode)}`}
    />
  </Container>
);

export default CoreUnitCard;

const Container = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 0px 0px 0px',
}));

const Summary = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 0,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 4,
    width: 294,
  },
}));

const Expenditure = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',

    marginTop: -4,
  },
}));

const Team = styled(Link)(({ theme }) => ({
  marginTop: '0px',
  display: 'none',
  width: 'fit-content',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',

    marginTop: -2,
  },
}));

const ContainerRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: 8,
  paddingRight: 8,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 8,
    marginBottom: 6,
  },
}));

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    '& div': {
      gap: 4,
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const LastModifiedActorCoreUnitStyled = styled(LastModifiedActorCoreUnit)(({ theme }) => ({
  padding: '4px 8px 4px 8px',
  [theme.breakpoints.up('tablet_768')]: {
    padding: '2px 8px 4px 8px',
  },
}));

const DivSpaceSummary = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  minWidth: 10,
  minHeight: 46,

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    minWidth: 30,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
  },
}));

const DivSpaceExpenditure = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
  },
}));

const DivSpaceTeam = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    display: 'flex',
  },
}));
