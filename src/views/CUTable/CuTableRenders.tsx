import { styled } from '@mui/material';
import LastModifiedActorCoreUnit from '@/components/LastModifiedActorCoreUnit/LastModifiedActorCoreUnit';

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
import { CuRenderLinks } from './components/CuRenderLinks/CuRenderLinks';
import { CuTableColumnExpenditures } from './components/CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnSummary } from './components/CuTableColumnSummary/CuTableColumnSummary';
import CuTableColumnTeamMember from './components/CuTableColumnTeamMember/CuTableColumnTeamMember';
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
  return <CuRenderLinks coreUnit={coreUnit} />;
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
    marginLeft: 0,
    marginTop: 2,
    paddingLeft: 0,
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
    marginLeft: 0,
    height: 'revert',
    marginTop: -2,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    justifyContent: 'flex-start',
    marginLeft: 4,
    height: 'revert',
    marginTop: -8,
    width: 164,
  },
}));

const LastModifiedActorCoreUnitContainer = styled('div')({
  marginTop: 8,
});
