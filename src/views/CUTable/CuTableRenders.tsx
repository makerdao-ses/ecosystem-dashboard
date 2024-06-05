import { styled } from '@mui/material';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
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
import PopoverListLinks from '../Actors/components/PopoverListLinks/PopoverListLinks';
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
  return (
    <LinksContainer>
      <ContainerLinksArrowsDesk>
        <PopoverListLinksStyled label="Links" />
        <VerticalLine />
        <InternalLinkButtonStyled href={''} showIcon />
      </ContainerLinksArrowsDesk>
    </LinksContainer>
  );
};

export const renderCard = (coreUnit: CoreUnit, key?: number) => {
  if (!coreUnit) return <CoreUnitCard key={`card-placeholder-${key}`} coreUnit={{} as CoreUnit} isLoading />;
  return <CoreUnitCard key={`card-${coreUnit.code}`} coreUnit={coreUnit} />;
};

export const renderLastModified = (coreUnit: CoreUnit) => {
  if (!coreUnit) return <CuTableColumnLastModified date={undefined} isLoading={!coreUnit} />;
  return <LastModifiedActorCoreUnit href={coreUnit.shortCode} date={getLastMonthWithData(coreUnit)} />;
};

const LinksContainer = styled('div')({
  display: 'flex',
  width: 150,
  justifyContent: 'flex-end',

  paddingRight: '16px',

  height: '50px',
  cursor: 'pointer',
});

const ExpendituresContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  margin: 'auto 0',
});

const InsideExpenditureContainer = styled('div')(({ theme }) => ({
  display: 'block',
  paddingLeft: '8px',
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: '-4px',
    paddingLeft: 0,
  },
}));

const TeamMemberContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'flex-end',
  height: '50px',
  [theme.breakpoints.up('desktop_1440')]: {
    justifyContent: 'flex-start',
  },
}));

const ContainerLinksArrowsDesk = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 140,
    justifyContent: 'flex-end',
  },
}));

const PopoverListLinksStyled = styled(PopoverListLinks)(({ theme }) => ({
  'div:first-of-type': {
    width: 21,
    height: 21,
    justifyContent: 'flex',
    alignItem: 'center',
  },
  '& button': {
    gap: 4,
    [theme.breakpoints.up('desktop_1280')]: {
      padding: '5px 7px 5px 4px',
    },
  },
}));

const VerticalLine = styled('div')(({ theme }) => ({
  marginLeft: 8,
  marginRight: 8,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[800]}`,
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 16,
    marginRight: 16,
  },
}));

const InternalLinkButtonStyled = styled(InternalLinkButton)({
  borderRadius: 8,
  padding: '2px 8px 2px 8px',
  ':hover': {
    padding: '2px 8px 2px 8px',
  },
});
