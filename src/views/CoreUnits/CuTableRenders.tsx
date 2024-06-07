import { styled } from '@mui/material';

import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFTEsFromCoreUnit,
  getFacilitatorsFromCoreUnit,
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
import CoreUnitCard from '@/stories/components/CoreUnitCard/CoreUnitCard';
import { CuTableColumnLastModified } from '@/stories/components/CuTableColumnLastModified/CuTableColumnLastModified';
import { CuTableColumnLinks } from '@/stories/components/CuTableColumnLinks/CuTableColumnLinks';
import { CuRenderLinks } from './CuRenderLinks/CuRenderLinks';
import { CuTableColumnExpenditures } from './CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnSummary } from './CuTableColumnSummary/CuTableColumnSummary';
import CuTableColumnTeamMember from './CuTableColumnTeamMember/CuTableColumnTeamMember';
import LastModifiedActorCoreUnit from './LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

export const renderSummary = (coreUnit: CoreUnit) => {
  if (!coreUnit) return <CuTableColumnSummary isLoading />;
  return (
    <CuTableColumnSummary
      key={`summary-${coreUnit.code}`}
      title={coreUnit.name}
      status={coreUnit.status as TeamStatus}
      statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
      imageUrl={coreUnit.image}
      mipUrl={getMipUrlFromCoreUnit(coreUnit)}
      code={getShortCode(coreUnit.shortCode)}
      categories={coreUnit?.category}
    />
  );
};

export const renderExpenditures = (coreUnit: CoreUnit) => {
  if (!coreUnit) return <CuTableColumnExpenditures isLoading />;

  return (
    <ExpendituresContainer>
      <InsideExpenditureContainer>
        <CuTableColumnExpenditures
          value={getExpenditureValueFromCoreUnit(coreUnit)}
          percent={getPercentFromCoreUnit(coreUnit)}
          months={getLast3MonthsWithDataFormatted(coreUnit)}
          items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
          budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
          code={getShortCode(coreUnit.shortCode)}
        />
      </InsideExpenditureContainer>
    </ExpendituresContainer>
  );
};

export const renderTeamMember = (coreUnit: CoreUnit) => {
  if (!coreUnit) return <CuTableColumnTeamMember isLoading />;
  return (
    <TeamMemberContainer>
      <CuTableColumnTeamMember members={getFacilitatorsFromCoreUnit(coreUnit)} fte={getFTEsFromCoreUnit(coreUnit)} />
    </TeamMemberContainer>
  );
};

export const renderLinks = (coreUnit: CoreUnit) => {
  if (!coreUnit) return <CuTableColumnLinks isLoading />;
  return (
    <ContainerLinks>
      <CuRenderLinks coreUnit={coreUnit} />
    </ContainerLinks>
  );
};

export const renderCard = (coreUnit: CoreUnit, key?: number) => {
  if (!coreUnit) return <CoreUnitCard key={`card-placeholder-${key}`} coreUnit={{} as CoreUnit} isLoading />;
  return <CoreUnitCard key={`card-${coreUnit.code}`} coreUnit={coreUnit} />;
};

export const renderLastModified = (coreUnit: CoreUnit) => {
  if (!coreUnit) return <CuTableColumnLastModified date={undefined} isLoading={!coreUnit} />;
  return (
    <LastModifiedActorCoreUnitContainer>
      <LastModifiedActorCoreUnit href={coreUnit.shortCode} date={getLastMonthWithData(coreUnit)} />
    </LastModifiedActorCoreUnitContainer>
  );
};

const ExpendituresContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  margin: 'auto 0',
});

const InsideExpenditureContainer = styled('div')(({ theme }) => ({
  display: 'block',
  paddingLeft: '8px',
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: -4,
    marginTop: -2,
    paddingLeft: 0,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: -34,
  },
}));

const TeamMemberContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'flex-end',
  height: '50px',
  width: 128,
  [theme.breakpoints.up('desktop_1024')]: {
    width: 140,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: -2,
    marginTop: -2,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    width: 140,

    justifyContent: 'flex-start',
    marginLeft: -26,

    marginTop: 2,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    justifyContent: 'flex-start',
    height: 'revert',
    marginTop: -4,
    width: 164,
  },
}));

const LastModifiedActorCoreUnitContainer = styled('div')(({ theme }) => ({
  marginTop: -4,

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: -16,
    marginTop: 0,
  },
}));

const ContainerLinks = styled('div')({
  display: 'flex',
  marginLeft: -8,
});
