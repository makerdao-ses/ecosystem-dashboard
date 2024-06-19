import { styled } from '@mui/system';
import { SearchInput } from '@ses/components/SearchInput/SearchInput';
import DeliverableCard from '@ses/containers/ActorProjects/components/DeliverableCard/DeliverableCard';
import DeliverableViewModeToggle from '@ses/containers/ActorProjects/components/DeliverableViewModeToggle/DeliverableViewModeToggle';
import { splitInRows } from '@ses/containers/ActorProjects/components/ProjectCard/ProjectCard';
import ViewAllButton from '@ses/containers/ActorProjects/components/ViewAllButton/ViewAllButton';
import { DeliverableBuilder } from '@ses/core/businessLogic/builders/actors/deliverableBuilder';
import { DeliverableStatus } from '@ses/core/models/interfaces/projects';
import { useState } from 'react';
import type { DeliverableViewMode } from '@ses/containers/ActorProjects/components/ProjectCard/ProjectCard';

interface DeliverablesSectionProps {
  minimal?: boolean;
}

const SEARCH_FEATURE_ENABLED = false;

const DeliverablesSection: React.FC<DeliverablesSectionProps> = ({ minimal }) => {
  const [deliverableViewMode, setDeliverableViewMode] = useState<DeliverableViewMode>('compacted');
  const [showAllDeliverables, setShowAllDeliverables] = useState<boolean>(true);

  // mocked deliverables
  const deliverables = [
    new DeliverableBuilder()
      .withId('6')
      .withTitle('PEA-01 On-Chain Data Reconciliation')
      .withDescription(
        "On-Chain Data Reconciliation will help ensure that all data related to Maker Protocol's expenses are accurate and up-to-date. This component will include a thorough analysis of all On-Chain data related to expenses, which will help to identify any discrepancies."
      )
      .withOwnerData(
        '1',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
        'Powerhouse',
        'POWERHOUSE'
      )
      .withStatus(DeliverableStatus.DELIVERED)
      .addKeyResult('1', 'Business Analysis', 'https://makerdao.com')
      .addKeyResult('2', 'Wireframes', 'https://makerdao.com')
      .addKeyResult('3', 'Dashboard - Staging ', 'https://makerdao.com')
      .addKeyResult('4', 'Dashboard - Production ', 'https://makerdao.com')
      .addKeyResult('5', 'API Playground - Production', 'https://makerdao.com')
      .addKeyResult('6', 'API Playground - Staging', 'https://makerdao.com')
      .addKeyResult('7', 'Extra 1', 'https://makerdao.com')
      .addKeyResult('8', 'Extra 2', 'https://makerdao.com')
      .build(),
    new DeliverableBuilder()
      .withId('5')
      .withTitle('PEA-02 Delegates Transparency')
      .withDescription('Comprehensive overview of Delegates costs and changes over time.')
      .withOwnerData(
        '2',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png',
        'Phoenix Lab',
        'PHOENIX'
      )
      .withStatus(DeliverableStatus.INPROGRESS)
      .withProgress({
        __typename: 'Percentage',
        value: 0.73,
      })
      .addKeyResult('1', 'Business Analysis', 'https://makerdao.com')
      .addKeyResult('2', 'Wireframes', 'https://makerdao.com')
      .addKeyResult('3', 'Dashboard - Staging ', 'https://makerdao.com')
      .addKeyResult('4', 'Dashboard - Production ', 'https://makerdao.com')
      .build(),
    new DeliverableBuilder()
      .withId('1')
      .withTitle('PEA-02 Delegates Transparency')
      .withOwnerData(
        '3',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/DEWIZ/DEWIZ_logo.png',
        'Dewiz',
        'DEWIZ'
      )
      .withStatus(DeliverableStatus.TODO)
      .build(),
    new DeliverableBuilder()
      .withId('2')
      .withTitle('PEA-02 Delegates Transparency')
      .withOwnerData(
        '2',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/PHOENIX/PHOENIX_logo.png',
        'Phoenix Lab',
        'PHOENIX'
      )
      .withStatus(DeliverableStatus.INPROGRESS)
      .withProgress({
        __typename: 'StoryPoints',
        total: 5,
        completed: 3,
      })
      .addKeyResult('1', 'Business Analysis', 'https://makerdao.com')
      .addKeyResult('2', 'API Playground - Production', 'https://makerdao.com')
      .addKeyResult('3', 'Dashboard - Production', 'https://makerdao.com')
      .addKeyResult('4', 'Dashboard - Staging ', 'https://makerdao.com')
      .addKeyResult('5', 'Dashboard - Staging ', 'https://makerdao.com')
      .build(),
    new DeliverableBuilder()
      .withId('3')
      .withTitle('PEA-03 SPF Finances')
      .withOwnerData(
        '4',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png',
        'BA Labs',
        'BA-LABS'
      )
      .withStatus(DeliverableStatus.DELIVERED)
      .build(),
    new DeliverableBuilder()
      .withId('4')
      .withTitle('PEA-03 SPF Finances')
      .withOwnerData(
        '4',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png',
        'BA Labs',
        'BA-LABS'
      )
      .withStatus(DeliverableStatus.DELIVERED)
      .build(),
    new DeliverableBuilder()
      .withId('1')
      .withTitle('PEA-03 SPF Finances')
      .withOwnerData(
        '4',
        'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/BA-LABS/BA_LABS_logo.png',
        'BA Labs',
        'BA-LABS'
      )
      .withStatus(DeliverableStatus.DELIVERED)
      .build(),
  ];
  const deliverablesRows = splitInRows(showAllDeliverables ? deliverables : deliverables.slice(0, 6), 2);

  return (
    <DeliverablesContainer>
      <Header>
        <TitleBox>
          <Title>Deliverables</Title>
          <Count>{deliverables.length}</Count>
        </TitleBox>

        {!minimal && (
          <DeliverableViewModeToggle
            deliverableViewMode={deliverableViewMode}
            onChangeDeliverableViewMode={(mode: DeliverableViewMode) => setDeliverableViewMode(mode)}
          />
        )}
      </Header>

      {!minimal && SEARCH_FEATURE_ENABLED && (
        <SearchContainer>
          <CustomSearchInput placeholder="Search" legacyBreakpoints={false} />
        </SearchContainer>
      )}

      <BackgroundContainer>
        <DeliverablesGrid showDeliverablesBelow={false}>
          {deliverablesRows.map((row) =>
            row.map((deliverable) => (
              <DeliverableCard
                key={deliverable.id}
                isProjectCard={false}
                deliverable={deliverable}
                viewMode={minimal ? 'detailed' : deliverableViewMode}
                maxKeyResultsOnRow={row.map((d) => d.keyResults.length).reduce((a, b) => Math.max(a, b), 0)}
              />
            ))
          )}
        </DeliverablesGrid>
        {!minimal && deliverables.length > 6 && (
          <ViewAllButton viewAll={showAllDeliverables} onClick={() => setShowAllDeliverables((prev) => !prev)}>
            View {showAllDeliverables ? 'less' : 'all'} Deliverables
          </ViewAllButton>
        )}
      </BackgroundContainer>
    </DeliverablesContainer>
  );
};

export default DeliverablesSection;

const DeliverablesContainer = styled('div')(() => ({}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 16,
  },
}));

const TitleBox = styled('div')(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
}));

const Title = styled('h3')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',
  margin: 0,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
  },
}));

const Count = styled('div')(({ theme }) => ({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0.4,
  },
}));

// Disabled temporary the search
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 24,

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: 32,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    paddingRight: 16,
  },
}));

// Disabled temporary the search
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomSearchInput = styled(SearchInput)(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    width: '100%',

    '& > div': {
      width: '100%',
    },
  },

  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: 319,

    '& input': {
      height: 32,
    },
  },

  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    width: 253,

    '& input': {
      height: 32,
      width: 253,
    },
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 320,
  },
}));

const BackgroundContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  background:
    theme.palette.mode === 'light'
      ? 'linear-gradient(0deg, #F6F8F9 85.04%, rgba(246, 248, 249, 0.00) 121.04%)'
      : 'linear-gradient(180deg, rgba(16, 30, 38, 0.60) 0%, #101E26 100%)',
  margin: '8px -16px -24px',
  padding: '8px 16px 24px',
  borderRadius: 6,

  [theme.breakpoints.up('tablet_768')]: {
    margin: '8px -24px -24px',
    padding: '8px 24px 24px',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    gap: 24,
    margin: '8px 0 0 -8px',
    padding: '8px 8px 16px',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    margin: '8px 0 0 -16px',
    padding: '8px 16px 24px',
  },
}));

const DeliverablesGrid = styled('div')<{ showDeliverablesBelow: boolean }>(({ theme, showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    '& > *': {
      width: '100%',
      maxWidth: 'calc(50% - 8px)',
    },
  },

  ...(showDeliverablesBelow && {
    [theme.breakpoints.up('desktop_1024')]: {
      gap: 24,

      '& > *': {
        maxWidth: 'calc(50% - 12px)',
      },
    },

    [theme.breakpoints.up('desktop_1280')]: {
      gap: 16,

      '& > *': {
        maxWidth: 'calc(33% - 7px)',
      },
    },
  }),

  [theme.breakpoints.up('desktop_1440')]: {
    gap: 24,

    '& > *': {
      ...(showDeliverablesBelow
        ? {
            maxWidth: 'calc(33% - 12px)',
          }
        : {
            maxWidth: 'calc(50% - 12px)',
          }),
    },
  },
}));
