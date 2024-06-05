import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import Card from '@/components/Card/Card';
import LastModifiedActorCoreUnit from '@/components/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import type { TeamStatus } from '@/core/models/interfaces/types';
import { CuTableColumnExpenditures } from '@/views/CUTable/components/CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnSummary } from '@/views/CUTable/components/CuTableColumnSummary/CuTableColumnSummary';
import CuTableColumnTeamMember from '@/views/CUTable/components/CuTableColumnTeamMember/CuTableColumnTeamMember';
import ListMobileSheetIconArrow from '@/views/CUTable/components/ListMobileSheetIconArrow';

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
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { CuTableColumnLastModified } from '../CuTableColumnLastModified/CuTableColumnLastModified';
import { CuTableColumnLinks } from '../CuTableColumnLinks/CuTableColumnLinks';
import { CategoriesSkeleton } from './CategoriesSkeleton';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CoreUnitCardProps {
  coreUnit: CoreUnit;
  isLoading?: boolean;
}

const CoreUnitCard = ({ coreUnit, isLoading = false }: CoreUnitCardProps) => {
  if (isLoading) {
    return (
      <Container>
        <Summary>
          <Skeleton variant="rectangular" width={100} height={20} style={{ borderRadius: '4px' }} />
          <CuTableColumnSummary isLoading />
        </Summary>
        <Expenditure>
          <Skeleton variant="rectangular" width={100} height={20} style={{ borderRadius: '4px' }} />
          <CuTableColumnExpenditures isLoading />
        </Expenditure>
        <Team>
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            style={{
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <CuTableColumnTeamMember isLoading />
        </Team>
        <Line />
        <Categories>
          <CategoriesSkeleton />
        </Categories>
        <Links>
          <CuTableColumnLinks isLoading />
        </Links>
        <LastModified>
          <Skeleton
            variant="rectangular"
            width={100}
            height={20}
            style={{
              borderRadius: '4px',
              marginBottom: '16px',
            }}
          />
          <CuTableColumnLastModified isLoading />
        </LastModified>
      </Container>
    );
  }

  return (
    <Container>
      <ContainerRow>
        <Summary>
          <CuTableColumnSummary
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
        <Team>
          <CuTableColumnTeamMember
            members={getFacilitatorsFromCoreUnit(coreUnit)}
            fte={getFTEsFromCoreUnit(coreUnit)}
          />
        </Team>
        <Line />
        <ContainerLinks>
          <ListMobileSheetIconArrow />
        </ContainerLinks>
      </ContainerRow>

      <Categories>
        {coreUnit.category?.map((category) => (
          <CategoryChip key={category} category={category} />
        ))}
      </Categories>

      <LastModifiedActorCoreUnit
        date={getLastMonthWithData(coreUnit)}
        href={`${siteRoutes.coreUnitActivityFeed(coreUnit.shortCode)}`}
      />
    </Container>
  );
};

export default CoreUnitCard;

const Container = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 8px 0px 8px',
}));

const Summary = styled('div')(() => ({
  display: 'flex',
}));

const Expenditure = styled('div')(({ theme }) => ({
  gridArea: 'expenditure',
  paddingTop: '32px',
  marginBottom: '29px',
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    paddingTop: '0',
    marginBottom: '14px',
  },
}));

const Team = styled('div')(({ theme }) => ({
  gridArea: 'team',
  marginTop: '0px',
  display: 'none',
  width: 'fit-content',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
}));

const LastModified = styled('div')({});

const Line = styled('div')(({ theme }) => ({
  gridArea: 'line',
  height: 1,
  borderRadius: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[50] : 'red'}`,
  margin: '4px 0 0px',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const Categories = styled('div')(({ theme }) => ({
  gridArea: 'categories',
  display: 'none',
  alignItems: 'center',
  marginBottom: '16px',
  justifyContent: 'center',

  '& > div': {
    marginRight: '8px',
    [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
      marginRight: '16px',
    },
  },
  '& div:last-child': {
    marginRight: '0px',
  },
}));

const Links = styled('div')({
  display: 'flex',
});

const ContainerRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const ContainerLinks = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
