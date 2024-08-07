import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import ExternalLink from '@ses/components/ExternalLink/ExternalLink';
import AvatarPlaceholderIcon from 'public/assets/svg/avatar_placeholder.svg';

import Card from '@/components/Card/Card';
import InternalLinkButton from '@/components/InternalLinkButton/InternalLinkButton';

import { siteRoutes } from '@/config/routes';
import type { Maybe } from '@/core/models/interfaces/generics';
import type { Milestone } from '@/core/models/interfaces/roadmaps';
import { DeliverableSetStatus } from '@/core/models/interfaces/roadmaps';
import { usLocalizedNumber } from '@/core/utils/humanization';
import { progressPercentage } from '@/views/RoadmapMilestones/utils';

import useMilestoneCard from './useMilestoneCard';

import type { FC } from 'react';

interface MilestoneCardProps {
  slug: string;
  milestoneData: Milestone;
}

interface ElementWithProgress {
  progress: number;
}

interface ElementWithStatus {
  status: Maybe<DeliverableSetStatus>;
}

const MilestoneCard: FC<MilestoneCardProps> = ({ slug, milestoneData }) => {
  const { statusLabel } = useMilestoneCard(milestoneData.scope?.status);

  const progress = progressPercentage(milestoneData.scope?.progress);

  const keyResults = milestoneData.scope?.deliverables
    ?.map((deliverableData) => deliverableData.keyResults)
    ?.flat()
    ?.slice(0, 3);

  return (
    <Container>
      <Header>
        <CodesContainer>
          <SequenceCode>{milestoneData.sequenceCode}</SequenceCode>
          <Code>{milestoneData.code}</Code>
        </CodesContainer>
        <StyledInternalLinkButton
          href={`${siteRoutes.roadmapMilestones(slug)}#${milestoneData.code}`}
          label="Details"
        />
      </Header>
      <TitleContainer className="title-container">
        <Title>{milestoneData.title}</Title>
        <Abstract>{milestoneData.abstract}</Abstract>
      </TitleContainer>
      <Progress>
        <ProgressTitleWrapper>
          <ProgressTitleContainer>
            <ProgressTitle>Progress</ProgressTitle>
          </ProgressTitleContainer>
          <StatusLabelContainer status={milestoneData.scope?.status}>
            <StatusLabel status={milestoneData.scope?.status}>{statusLabel}</StatusLabel>
          </StatusLabelContainer>
        </ProgressTitleWrapper>
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
          <ProgressLabel progress={progress}>{usLocalizedNumber(progress * 100, 0)}%</ProgressLabel>
        </ProgressBarContainer>
      </Progress>
      <CoordinatorsContainer className="coordinators-container">
        <CoordinatorsTitle>Coordinators</CoordinatorsTitle>
        <Coordinators>
          {milestoneData.coordinators?.map((coordinatorData) => (
            <CoordinatorAvatarContainer key={coordinatorData.id}>
              {coordinatorData.imageUrl === 'N/A' ? (
                <CoordinatorAvatar>
                  <AvatarPlaceholderIcon />
                </CoordinatorAvatar>
              ) : (
                <CoordinatorAvatar alt={coordinatorData.name} src={coordinatorData.imageUrl} />
              )}
              <CoordinatorName>{coordinatorData.name}</CoordinatorName>
            </CoordinatorAvatarContainer>
          ))}
        </Coordinators>
      </CoordinatorsContainer>
      <LatestKeyResultsContainer className="latest-key-results-container">
        <LatestKeyResultsTitle>Latest Key Results</LatestKeyResultsTitle>
        {keyResults.map((keyResultData) => (
          <KeyResult key={keyResultData.id}>
            {keyResultData.link ? (
              <KeyResultLink href={keyResultData.link} wrapText>
                {keyResultData.title}
              </KeyResultLink>
            ) : (
              <NoKeyResultLink>
                <span>{keyResultData.title}</span>
                <Todo>Todo</Todo>
              </NoKeyResultLink>
            )}
          </KeyResult>
        ))}
      </LatestKeyResultsContainer>
    </Container>
  );
};

export default MilestoneCard;

const Container = styled(Card)(() => ({
  width: '100%',
  height: '100%',
  padding: '0px 0px 8px 0px',
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '5px 8px 4px 8px',
  borderRadius: '12px 12px 0px 0px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
}));

const CodesContainer = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

const SequenceCode = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
}));

const Code = styled('h3')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const StyledInternalLinkButton = styled(InternalLinkButton)(({ theme }) => ({
  padding: 0,
  fontSize: 14,

  '&:hover': {
    gap: 8,
    padding: 0,

    '& div:first-of-type': {
      color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
    },

    '& div:last-of-type > svg path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
    },
  },

  '&:active, &:focus': {
    borderColor: 'transparent',
  },

  '& div:first-of-type': {
    color: theme.palette.isLight ? theme.palette.colors.charcoal[800] : theme.palette.colors.charcoal[200],
  },

  '& div:last-of-type': {
    width: 20,
    height: 20,

    '& > svg': {
      width: 20,
      height: 20,

      '& path': {
        fill: theme.palette.isLight ? theme.palette.colors.charcoal[800] : theme.palette.colors.charcoal[200],
      },
    },
  },
}));

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 0',
  gap: 4,
  margin: '8px 8px 0px',
  padding: '4px 8px',
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const Title = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
}));

const Abstract = styled('p')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
}));

const Progress = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: '4px 8px 0px',
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const ProgressTitleWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ProgressTitleContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2.67,
}));

const ProgressTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const ProgressBarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 4,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[600],
}));

const ProgressBar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'progress',
})<ElementWithProgress>(({ theme, progress }) => ({
  width: `${progress * 100}%`,
  height: 16,
  borderRadius: `4px ${progress === 1 ? '4px 4px' : '0px 0px'} 4px`,

  ...(progress === 1 && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900],
  }),

  ...(progress !== 1 && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900],
  }),
}));

const ProgressLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'progress',
})<ElementWithProgress>(({ theme, progress }) => ({
  position: 'absolute',
  top: 0,
  right: 8,
  fontWeight: 700,
  fontSize: 12,
  lineHeight: '16px',

  ...(progress === 1 && {
    color: theme.palette.colors.slate[50],
  }),

  ...(progress !== 1 && {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[600],
  }),
}));

const StatusLabelContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'status',
})<ElementWithStatus>(({ theme, status }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1px 16px',
  borderRadius: 6,

  ...(status === DeliverableSetStatus.FINISHED && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.green[100] : 'rgba(52, 168, 83, 0.40)',
  }),

  ...(status === DeliverableSetStatus.IN_PROGRESS && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.blue[100] : 'rgba(0, 132, 255, 0.40)',
  }),

  ...((status === DeliverableSetStatus.DRAFT || status === DeliverableSetStatus.TODO) && {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.orange[100] : 'rgba(255, 138, 0, 0.40)',
  }),
}));

const StatusLabel = styled('span', {
  shouldForwardProp: (prop) => prop !== 'status',
})<ElementWithStatus>(({ theme, status }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',

  ...(status === DeliverableSetStatus.FINISHED && {
    color: theme.palette.isLight ? theme.palette.colors.green[800] : theme.palette.colors.green[50],
  }),

  ...(status === DeliverableSetStatus.IN_PROGRESS && {
    color: theme.palette.isLight ? theme.palette.colors.blue[800] : theme.palette.colors.blue[50],
  }),

  ...((status === DeliverableSetStatus.DRAFT || status === DeliverableSetStatus.TODO) && {
    color: theme.palette.isLight ? theme.palette.colors.orange[800] : theme.palette.colors.orange[100],
  }),
}));

const CoordinatorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 0',
  gap: 8,
  margin: '4px 8px 0px',
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const CoordinatorsTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const Coordinators = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
}));

const CoordinatorAvatarContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const CoordinatorAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,

  '& > svg': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[800],
    '& rect': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[800],
    },
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[600] : theme.palette.colors.charcoal[500],
    },
  },
}));

const CoordinatorName = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.charcoal[400],
}));

const LatestKeyResultsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 0',
  gap: 8,
  margin: '4px 8px 0px',
  padding: 8,
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]}`,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.charcoal[900],
}));

const LatestKeyResultsTitle = styled('h4')(({ theme }) => ({
  margin: 0,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
}));

const KeyResult = styled('li')(() => ({
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none',
}));

const KeyResultLink = styled(ExternalLink)(({ theme }) => ({
  position: 'relative',
  maxWidth: 'calc(100% - 14px)',
  gap: 6,
  paddingLeft: 14,
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '18px',

  '& span': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.colors.blue[700],
  },

  '& svg': {
    minWidth: 11,
    minHeight: 10,

    '& path': {
      fill: theme.palette.colors.blue[700],
    },
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    left: 0,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: theme.palette.colors.blue[700],
  },
}));

const NoKeyResultLink = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 'calc(100% - 14px)',
  display: 'flex',
  gap: 8,
  paddingLeft: 14,

  '& span': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '18px',
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
  },

  '& svg': {
    minWidth: 11,
    minHeight: 10,
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    display: 'block',
    left: 0,
    top: 6,
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
  },
}));

const Todo = styled('div')(({ theme }) => ({
  marginLeft: 'auto',
  padding: '0px 8px',
  borderRadius: 6,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[50],
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(72, 82, 101, 0.40)',
}));
