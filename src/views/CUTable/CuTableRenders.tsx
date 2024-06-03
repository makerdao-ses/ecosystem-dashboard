import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';
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
import { CuTableColumnExpenditures } from '@/stories/components/CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnLastModified } from '@/stories/components/CuTableColumnLastModified/CuTableColumnLastModified';
import { CuTableColumnLinks } from '@/stories/components/CuTableColumnLinks/CuTableColumnLinks';
import { CuTableColumnTeamMember } from '@/stories/components/CuTableColumnTeamMember/CuTableColumnTeamMember';
import PopoverListLinks from '../Actors/components/PopoverListLinks/PopoverListLinks';
import { CuTableColumnSummary } from './components/CuTableColumnSummary/CuTableColumnSummary';
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
  return <CuTableColumnLastModified date={getLastMonthWithData(coreUnit)} code={getShortCode(coreUnit.shortCode)} />;
};

const LinksContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  paddingRight: '16px',
  // width: '100%',
  height: '50px',
  // margin: 'auto 0',
  cursor: 'pointer',
  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingRight: '0px',
    height: 'fit-content',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    paddingRight: '0px',
  },
});

const ExpendituresContainer = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  margin: 'auto 0',
  height: '50px',
});

const InsideExpenditureContainer = styled('div')({
  display: 'block',
  paddingLeft: '8px',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    marginLeft: '-4px',
    paddingLeft: 0,
  },
});

const TeamMemberContainer = styled('div')({
  display: 'flex',
  flex: 1,
  alignItems: 'flex-end',
  height: '50px',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    justifyContent: 'flex-start',
  },
});

const ContainerLinksArrowsDesk = styled('div')(({ theme }) => ({
  // display: 'none',
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
