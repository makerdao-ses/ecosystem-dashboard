import { styled } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from '@/components/Card/Card';
import { siteRoutes } from '@/config/routes';
import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLast3MonthsWithDataFormatted,
  getLastMonthWithData,
  getLatestMip39FromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '@/core/businessLogic/coreUnits';
import type { TeamStatus } from '@/core/models/interfaces/types';
import { getShortCode } from '@/core/utils/string';
import { CuRenderLinks } from '../../CuRenderLinks/CuRenderLinks';
import { CuTableColumnExpenditures } from '../../CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnSummary } from '../../CuTableColumnSummary/CuTableColumnSummary';
import CuTableColumnTeamMember from '../../CuTableColumnTeamMember/CuTableColumnTeamMember';
import { LastModifiedActorCoreUnit } from '../../LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import CardItemCoreUnitMobile from '../CardItemCoreUnitMobile/CardItemCoreUnitMobile';
import type { CustomTableColumn } from '../CustomTable2';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface Props {
  queryStrings?: string;
  columns: CustomTableColumn[];
  cu: CoreUnit;
}

export const ItemCoreUnit = ({ columns, cu, queryStrings }: Props) => (
  <>
    <TableWrapper>
      <TableRow columns={columns}>
        <Summary>
          <CuTableColumnSummary
            href={`${siteRoutes.coreUnitAbout(cu.shortCode)}/${queryStrings}`}
            key={`summary-${cu.code}`}
            title={cu.name}
            status={cu.status as TeamStatus}
            statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(cu))}
            imageUrl={cu.image}
            mipUrl={getMipUrlFromCoreUnit(cu)}
            code={getShortCode(cu.shortCode)}
            categories={cu?.category}
            queryStrings={queryStrings}
          />
        </Summary>
        <DivSpaceSummary href={`${siteRoutes.coreUnitAbout(cu.shortCode)}/${queryStrings}`} />

        <LastModified>
          <LastModifiedActorCoreUnit
            href={siteRoutes.coreUnitActivityFeed(cu.shortCode)}
            date={getLastMonthWithData(cu)}
          />
        </LastModified>
        <DivSpaceLastModified href={`${siteRoutes.coreUnitAbout(cu.shortCode)}/${queryStrings}`} />
        <ExpendituresContainer>
          <InsideExpenditureContainer>
            <CuTableColumnExpenditures
              value={getExpenditureValueFromCoreUnit(cu)}
              percent={getPercentFromCoreUnit(cu)}
              months={getLast3MonthsWithDataFormatted(cu)}
              items={getLast3ExpenditureValuesFromCoreUnit(cu)}
              budgetCaps={getBudgetCapsFromCoreUnit(cu)}
              code={getShortCode(cu.shortCode)}
            />
          </InsideExpenditureContainer>
        </ExpendituresContainer>
        <DivSpaceExpenditure href={`${siteRoutes.coreUnitAbout(cu.shortCode)}/${queryStrings}`} />
        <TeamMemberContainer href={`${siteRoutes.coreUnitAbout(cu.shortCode)}/${queryStrings}`}>
          <CuTableColumnTeamMember members={getFacilitatorsFromCoreUnit(cu)} fte={getFTEsFromCoreUnit(cu)} />
        </TeamMemberContainer>
        <DivSpaceTeam href={`${siteRoutes.coreUnitAbout(cu.shortCode)}/${queryStrings}`} />
        <ContainerLinks>
          <CuRenderLinks coreUnit={cu} />
        </ContainerLinks>
      </TableRow>
    </TableWrapper>
    <ListWrapper>
      <CardItemCoreUnitMobile coreUnit={cu} />
    </ListWrapper>
  </>
);
export default ItemCoreUnit;

const TableWrapper = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    gap: 8,
  },
}));

const TableRow = styled(Card)<{ columns: CustomTableColumn[] }>(({ theme }) => ({
  borderRadius: 16,
  background: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
  display: 'flex',
  padding: '16px 16px 8px 8px',
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',

  marginTop: '16px',
  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
  ':hover': {
    background: theme.palette.isLight ? 'white' : '#10191F',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 16px 8px 16px',
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px 8px 8px',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: '100%',
  },
}));

const ListWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  gap: 32,

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const ExpendituresContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  margin: 'auto 0',
  paddingLeft: 20,
  [theme.breakpoints.up('desktop_1024')]: {
    paddingLeft: 20,
    marginLeft: 4,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 0,
    marginLeft: -2,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    paddingLeft: 0,
    marginLeft: -4,
  },
}));

const InsideExpenditureContainer = styled('div')(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: -2,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    paddingLeft: 0,
  },
}));

const TeamMemberContainer = styled(Link)(({ theme }) => ({
  display: 'flex',

  alignItems: 'flex-end',
  minHeight: 50,
  minWidth: 140,

  [theme.breakpoints.up('desktop_1024')]: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    marginTop: -2,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 164,

    justifyContent: 'flex-start',
    paddingLeft: 0,
    marginTop: -1,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    justifyContent: 'flex-start',
    height: 'revert',
    marginTop: -4,
    width: 160,
  },
}));

const ContainerLinks = styled('div')({
  display: 'flex',
  marginLeft: -8,
});

const Summary = styled('div')(({ theme }) => ({
  width: 325,

  [theme.breakpoints.up('desktop_1024')]: {
    width: 325,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 360,
  },
}));

const LastModified = styled('div')(({ theme }) => ({
  width: 120,
  paddingLeft: 16,
  [theme.breakpoints.up('desktop_1280')]: {
    width: 120,
    paddingLeft: 0,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    width: 120,
    paddingLeft: 0,
    marginLeft: 0,
  },
}));

const DivSpaceSummary = styled(Link)(({ theme }) => ({
  display: 'flex',

  flexGrow: 1,
  height: '100%',
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
const DivSpaceLastModified = styled(Link)(({ theme }) => ({
  display: 'flex',

  flexGrow: 1,
  height: '100%',

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
const DivSpaceExpenditure = styled(Link)(({ theme }) => ({
  display: 'flex',

  flexGrow: 1,
  height: '100%',
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
  height: '100%',
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
