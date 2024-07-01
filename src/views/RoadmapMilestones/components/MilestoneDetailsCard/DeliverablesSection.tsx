import { styled } from '@mui/system';
import { SearchInput } from '@ses/components/SearchInput/SearchInput';
import DeliverableCard from '@ses/containers/ActorProjects/components/DeliverableCard/DeliverableCard';
import DeliverableViewModeToggle from '@ses/containers/ActorProjects/components/DeliverableViewModeToggle/DeliverableViewModeToggle';
import { splitInRows } from '@ses/containers/ActorProjects/components/ProjectCard/ProjectCard';
import ViewAllButton from '@ses/containers/ActorProjects/components/ViewAllButton/ViewAllButton';
import { useState } from 'react';
import type { Deliverable } from '@/core/models/interfaces/deliverables';
import type { DeliverableViewMode } from '@ses/containers/ActorProjects/components/ProjectCard/ProjectCard';

interface DeliverablesSectionProps {
  minimal?: boolean;
  deliverables: Deliverable[];
}

const SEARCH_FEATURE_ENABLED = false;

const DeliverablesSection: React.FC<DeliverablesSectionProps> = ({ minimal, deliverables }) => {
  const [deliverableViewMode, setDeliverableViewMode] = useState<DeliverableViewMode>('compacted');
  const [showAllDeliverables, setShowAllDeliverables] = useState<boolean>(true);

  const deliverablesRows = splitInRows(showAllDeliverables ? deliverables : deliverables.slice(0, 6), 2);

  return (
    <DeliverablesContainer>
      <Header>
        <TitleBox>
          <Title>Deliverables</Title>
          <Count>{deliverables?.length}</Count>
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
          {deliverables.length === 0 && <NoDeliverables>No Deliverable Available</NoDeliverables>}
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

const NoDeliverables = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  maxWidth: '100%',
  color: theme.palette.mode === 'light' ? '#B6BCC2' : '#6E7A8A',
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  padding: '64px 0',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));
