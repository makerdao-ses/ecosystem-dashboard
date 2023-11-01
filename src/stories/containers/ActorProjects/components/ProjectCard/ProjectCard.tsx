import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import Image from 'next/image';
import React from 'react';
import BudgetTypeBadge from '../BudgetTypeBadge/BudgetTypeBadge';
import DeliverableCard from '../DeliverableCard/DeliverableCard';
import ProjectOwnerChip from '../ProjectOwnerChip/ProjectOwnerChip';
import ProjectProgress from '../ProjectProgress/ProjectProgress';
import ProjectStatusChip from '../ProjectStatusChip/ProjectStatusChip';
import SupportedTeamsAvatarGroup from '../SupportedTeamsAvatarGroup/SupportedTeamsAvatarGroup';
import type { Project } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isLight } = useThemeContext();
  const isUpDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));

  const statusSection = (
    <StatusData>
      <ProjectStatusChip status={project.status} />
      <ProgressContainer>
        <ProjectProgress percentage={project.progress?.value ?? 0} />
      </ProgressContainer>
    </StatusData>
  );

  return (
    <Card isLight={isLight}>
      <MainContent>
        <ProjectHeader>
          <NameContainer>
            <TitleContainer>
              <ProjectCode isLight={isLight}>{project.code}</ProjectCode>{' '}
              <ProjectTitle isLight={isLight}>{project.title}</ProjectTitle>
            </TitleContainer>
            <BudgetTypeBadge budgetType={project.budgetType} />
          </NameContainer>

          <ParticipantsContainer>
            <ProjectOwnerChip owner={project.owner} />
            <SupportedTeamsAvatarGroup />
          </ParticipantsContainer>
        </ProjectHeader>

        <Row>
          <LeftColumn>
            {isUpDesktop1280 && statusSection}
            <ImageContainer>
              <Image src="https://placehold.co/600x400" layout="fill" unoptimized />
            </ImageContainer>
            <DataContainer>
              {!isUpDesktop1280 && statusSection}
              <Description isLight={isLight}>{project.abstract}</Description>
            </DataContainer>
          </LeftColumn>
          <RightColumn>
            <DeliverablesTitle isLight={isLight}>Deliverables</DeliverablesTitle>

            <DeliverablesContainer>
              {project.deliverables.map((deliverable) => (
                <DeliverableCard key={deliverable.id} deliverable={deliverable} />
              ))}
            </DeliverablesContainer>
          </RightColumn>
        </Row>
      </MainContent>
    </Card>
  );
};

export default ProjectCard;

const Card = styled.article<WithIsLight>(({ isLight }) => ({
  overflow: 'hidden',
  background: isLight ? '#fff' : 'red',
  borderRadius: 6,
  border: `1px solid ${isLight ? '#e6e6e6' : '#D1DEE6'}`,
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px red, 0px 20px 40px 0px red',
}));

const MainContent = styled.div({
  padding: '16px 16px 24px 16px',

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

const ProjectCode = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#9FAFB9' : 'red',
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
}));

const ProjectTitle = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#25273D' : 'red',
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

const Row = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 16,
  gap: 24,

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'row',
    gap: 32,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 64,
  },
});

const LeftColumn = styled.div({
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

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flexDirection: 'column',
    flex: 0.632,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    flex: 0.639,
  },
});

const RightColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 16,

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flex: 1,
  },
});

const ImageContainer = styled.div({
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
});

const DataContainer = styled.div({
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
});

const StatusData = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  width: '100%',
  justifyContent: 'space-between',
});

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
  color: isLight ? '#231536' : 'red',
  fontSize: 14,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));

const DeliverablesTitle = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
}));

const DeliverablesContainer = styled.div({
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
});
