import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetTypeBadge from '../BudgetTypeBadge/BudgetTypeBadge';
import ProjectOwnerChip from '../ProjectOwnerChip/ProjectOwnerChip';
import SupportedTeamsAvatarGroup from '../SupportedTeamsAvatarGroup/SupportedTeamsAvatarGroup';
import type { Project } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isLight } = useThemeContext();

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
      </MainContent>
    </Card>
  );
};

export default ProjectCard;

const Card = styled.div<WithIsLight>(({ isLight }) => ({
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
    padding: '16px 24px 24px 24px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 32px 32px 32px',
  },
});

const ProjectHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

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
  display: 'flex',
  alignItems: 'center',
  gap: 4,

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
