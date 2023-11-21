import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { LinkButton } from '@ses/components/LinkButton/LinkButton';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import lightTheme from '@ses/styles/theme/light';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import BudgetTypeBadge from '../BudgetTypeBadge/BudgetTypeBadge';
import DeliverableCard from '../DeliverableCard/DeliverableCard';
import DeliverableViewModeToggle from '../DeliverableViewModeToggle/DeliverableViewModeToggle';
import ProjectOwnerChip from '../ProjectOwnerChip/ProjectOwnerChip';
import ProjectProgress from '../ProjectProgress/ProjectProgress';
import ProjectStatusChip from '../ProjectStatusChip/ProjectStatusChip';
import SupportedTeamsAvatarGroup from '../SupportedTeamsAvatarGroup/SupportedTeamsAvatarGroup';
import ViewAllButton from '../ViewAllButton/ViewAllButton';
import type { Owner, Project } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ProjectCardProps {
  project: Project;
  isSupportedProject?: boolean;
}

export type DeliverableViewMode = 'compacted' | 'detailed';

function splitInRows<T = unknown>(arr: T[], rowLength: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += rowLength) {
    const row = arr.slice(i, i + rowLength);
    result.push(row);
  }

  return result;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isSupportedProject = false }) => {
  const { isLight } = useThemeContext();
  const isUpDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));

  const [deliverableViewMode, setDeliverableViewMode] = useState<DeliverableViewMode>('compacted');
  const handleChangeDeliverableViewMode = useCallback((viewMode: DeliverableViewMode) => {
    setDeliverableViewMode(viewMode);
  }, []);

  const [showAllDeliverables, setShowAllDeliverables] = useState<boolean>(false);

  const showGrayBackground = showAllDeliverables || !isUpDesktop1280;
  const showDeliverablesBelow = !isUpDesktop1280 || showAllDeliverables || deliverableViewMode === 'detailed';

  const supporters = useMemo(
    () =>
      // the supporters are the owners of the deliverables (they can be duplicated)
      Array.from(
        project.deliverables
          .filter((deliverable) => deliverable.owner.id !== project.owner.id)
          .reduce((prev, current) => prev.set(current.owner.id, current.owner), new Map<string, Owner>())
          .values()
      ),
    [project.deliverables, project.owner.id]
  );

  const statusSection = (
    <StatusData showDeliverablesBelow={showDeliverablesBelow}>
      <ProjectStatusChip status={project.status} />
      <ProgressContainer>
        <ProjectProgress percentage={project.progress?.value ?? 0} />
      </ProgressContainer>
    </StatusData>
  );

  const deliverables = showAllDeliverables
    ? project.deliverables
    : project.deliverables.slice(0, deliverableViewMode === 'detailed' && isUpDesktop1280 ? 6 : 4);
  // transforming deliverables into rows we can predict the max height needed to the cards
  const deliverablesRows = splitInRows(deliverables, isUpDesktop1280 ? 3 : 2);

  return (
    <Card isLight={isLight}>
      <MainContent>
        <ProjectHeader>
          <NameContainer>
            <TitleContainer>
              <ProjectCode>{project.code}</ProjectCode> <ProjectTitle isLight={isLight}>{project.title}</ProjectTitle>
            </TitleContainer>
            <BudgetTypeBadge budgetType={project.budgetType} />
          </NameContainer>

          <ParticipantsContainer>
            <ProjectOwnerChip owner={project.owner} />
            {supporters.length > 0 && <SupportedTeamsAvatarGroup supporters={supporters} />}
          </ParticipantsContainer>
        </ProjectHeader>

        <Row showDeliverablesBelow={showDeliverablesBelow}>
          <LeftColumn showDeliverablesBelow={showDeliverablesBelow}>
            {isUpDesktop1280 && !showDeliverablesBelow && statusSection}
            <ImageContainer isBigger={showDeliverablesBelow}>
              <Image src="/assets/img/project_placeholder.png" layout="fill" unoptimized />
            </ImageContainer>
            <DataContainer showDeliverablesBelow={showDeliverablesBelow}>
              {(!isUpDesktop1280 || showDeliverablesBelow) && statusSection}
              <Description isLight={isLight}>{project.abstract}</Description>
              {isSupportedProject && (
                <ViewEcosystem
                  isLight={isLight}
                  href={siteRoutes.ecosystemActorAbout(project.owner.code ?? '')}
                  buttonType={ButtonType.Default}
                  label="View Ecosystem Actor"
                />
              )}
            </DataContainer>
          </LeftColumn>
          <RightColumn>
            <DeliverableTitleContainer>
              <DeliverablesTitle isLight={isLight}>Deliverables</DeliverablesTitle>
              <DeliverableViewModeToggle
                deliverableViewMode={deliverableViewMode}
                onChangeDeliverableViewMode={handleChangeDeliverableViewMode}
              />
            </DeliverableTitleContainer>

            <GrayBackground isLight={isLight} showBackground={showGrayBackground}>
              <DeliverablesContainer showDeliverablesBelow={showDeliverablesBelow}>
                {deliverablesRows.map((row) =>
                  row.map((deliverable) => (
                    <DeliverableCard
                      key={deliverable.id}
                      deliverable={deliverable}
                      viewMode={deliverableViewMode}
                      isShownBelow={showDeliverablesBelow}
                      maxKeyResultsOnRow={row.map((d) => d.keyResults.length).reduce((a, b) => Math.max(a, b), 0)}
                    />
                  ))
                )}
              </DeliverablesContainer>
              {(isUpDesktop1280
                ? deliverableViewMode === 'compacted'
                  ? project.deliverables.length > 4
                  : project.deliverables.length > 6
                : project.deliverables.length > 4) && (
                <ViewAllButton viewAll={showAllDeliverables} onClick={() => setShowAllDeliverables((prev) => !prev)}>
                  View {showAllDeliverables ? 'less' : 'all'} Deliverables
                </ViewAllButton>
              )}
            </GrayBackground>
          </RightColumn>
        </Row>
      </MainContent>
    </Card>
  );
};

export default ProjectCard;

const Card = styled.article<WithIsLight>(({ isLight }) => ({
  overflow: 'hidden',
  background: isLight ? '#fff' : '#10191F',
  borderRadius: 6,
  border: `1px solid ${isLight ? '#e6e6e6' : '#10191F'}`,
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : ' 0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
}));

const MainContent = styled.div({
  padding: '15px 15px 23px 15px',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '15px 23px 23px 23px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '15px 31px 31px 31px',
  },
});

const ProjectHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 7,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
});

const NameContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  alignSelf: 'stretch',

  [lightTheme.breakpoints.up('tablet_768')]: {
    justifyContent: 'normal',
    alignItems: 'center',
    gap: 8,
  },
});

const TitleContainer = styled.div({
  lineHeight: '17px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
});

const ProjectCode = styled.span({
  color: '#9FAFB9',
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 'normal',
  textTransform: 'uppercase',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
  },
});

const ProjectTitle = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#25273D' : '#D2D4EF',
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.4,
    lineHeight: 'normal',
    marginLeft: 3,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    fontSize: 24,
  },
}));

const ParticipantsContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

const Row = styled.div<{ showDeliverablesBelow: boolean }>(({ showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,
  gap: 24,

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,

    ...(!showDeliverablesBelow && {
      flexDirection: 'row',
      gap: 32,
    }),
  },

  ...(!showDeliverablesBelow && {
    [lightTheme.breakpoints.up('desktop_1440')]: {
      gap: 64,
    },
  }),
}));

const LeftColumn = styled.div<{ showDeliverablesBelow: boolean }>(({ showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    gap: 16,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },

  ...(showDeliverablesBelow
    ? {
        [lightTheme.breakpoints.up('desktop_1440')]: {
          gap: 64,
        },
      }
    : {
        [lightTheme.breakpoints.up('desktop_1280')]: {
          flexDirection: 'column',
          flex: 0.632,
        },

        [lightTheme.breakpoints.up('desktop_1440')]: {
          flex: 0.639,
        },
      }),
}));

const RightColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 16,

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flex: 1,
  },
});

const ImageContainer = styled.div<{ isBigger: boolean }>(({ isBigger }) => ({
  position: 'relative',
  width: '100%',
  height: 175,
  borderRadius: 6,
  overflow: 'hidden',

  '& img': {
    objectFit: 'cover',
  },

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 256,
    minHeight: 256,
    flex: 1,
  },

  ...(isBigger && {
    [lightTheme.breakpoints.up('desktop_1280')]: {
      height: 320,
      minHeight: 320,
    },
  }),

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 578,
  },
}));

const DataContainer = styled.div<{ showDeliverablesBelow: boolean }>(({ showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginTop: 0,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    justifyContent: showDeliverablesBelow ? 'center' : 'flex-start',
  },
}));

const StatusData = styled.div<{ showDeliverablesBelow: boolean }>(({ showDeliverablesBelow }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  width: '100%',
  justifyContent: 'space-between',

  ...(showDeliverablesBelow && {
    [lightTheme.breakpoints.up('desktop_1280')]: {
      justifyContent: 'normal',
      gap: 64,
    },
  }),
}));

const ProgressContainer = styled.div({
  maxWidth: 256,
  width: '100%',
});

const Description = styled.p<WithIsLight>(({ isLight }) => ({
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
  '-webkit-line-clamp': '8',
  lineClamp: '8',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  alignSelf: 'stretch',
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const DeliverableTitleContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  gap: 16,
});

const DeliverablesTitle = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
}));

const GrayBackground = styled.div<WithIsLight & { showBackground: boolean }>(({ isLight, showBackground }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  background: showBackground
    ? isLight
      ? 'linear-gradient(0deg, #F6F8F9 85.04%, rgba(246, 248, 249, 0.00) 121.04%)'
      : 'none'
    : 'none',
  padding: '8px 16px 24px 16px',
  margin: '-8px -16px -24px -16px',

  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '8px 23px 23px 23px',
    margin: '-8px -23px -23px -23px',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 24,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 16,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 24,
    padding: '8px 31px 31px 31px',
    margin: '-8px -31px -31px -31px',
  },
}));

const DeliverablesContainer = styled.div<{ showDeliverablesBelow: boolean }>(({ showDeliverablesBelow }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    '& > *': {
      width: '100%',
      maxWidth: 'calc(50% - 8px)',
    },
  },

  ...(showDeliverablesBelow && {
    [lightTheme.breakpoints.up('desktop_1024')]: {
      gap: 24,

      '& > *': {
        maxWidth: 'calc(50% - 12px)',
      },
    },

    [lightTheme.breakpoints.up('desktop_1280')]: {
      gap: 16,

      '& > *': {
        maxWidth: 'calc(33% - 7px)',
      },
    },
  }),

  [lightTheme.breakpoints.up('desktop_1440')]: {
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

const ViewEcosystem = styled(LinkButton)<WithIsLight>(({ isLight }) => ({
  borderColor: isLight ? '#D4D9E1' : '#708390',
  borderRadius: '22px',
  fontFamily: 'Inter, sans serif',
  fontStyle: 'normal',
  padding: '7px 23px',

  '& > div': {
    color: isLight ? '#31424E' : '#ADAFD4',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '&:hover': {
    background: isLight ? '#F6F8F9' : '#10191F',
    border: `1px solid ${isLight ? '#ECF1F3' : '#1E2C37'}}`,
  },
}));
