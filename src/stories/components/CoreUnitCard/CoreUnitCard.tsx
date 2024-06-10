import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { siteRoutes } from '@ses/config/routes';
import React from 'react';
import Card from '@/components/Card/Card';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import type { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { CuTableColumnExpenditures } from '@/views/CoreUnits/CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnSummary } from '@/views/CoreUnits/CuTableColumnSummary/CuTableColumnSummary';
import CuTableColumnTeamMember from '@/views/CoreUnits/CuTableColumnTeamMember/CuTableColumnTeamMember';
import LastModifiedActorCoreUnit from '@/views/CoreUnits/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import ListMobileSheetIconArrow from '@/views/CoreUnits/ListMobileSheetIconArrow';

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
            logoDimension="32px"
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
          <ListMobileSheetIconArrow coreUnit={coreUnit} />
        </ContainerLinks>
      </ContainerRow>

      <Categories>
        {coreUnit.category?.map((category) => (
          <CategoryChip key={category} category={category as TeamCategory} />
        ))}
      </Categories>

      <LastModifiedActorCoreUnitStyled
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
  gridArea: 'expenditure',
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    marginLeft: 24,
    marginTop: -4,
  },
}));

const Team = styled('div')(({ theme }) => ({
  gridArea: 'team',
  marginTop: '0px',
  display: 'none',
  width: 'fit-content',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    alignItem: 'center',
    marginLeft: 10,
    marginTop: -2,
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

const ContainerRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
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
