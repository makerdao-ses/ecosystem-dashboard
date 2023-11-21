import styled from '@emotion/styled';
import { TablePlaceholder } from '@ses/components/CustomTable/TablePlaceholder';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import type { Project } from '@ses/core/models/interfaces/projects';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ProjectListProps {
  projects: Project[];
  isSupportedProjects?: boolean;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, isSupportedProjects = false }) => {
  const { isLight } = useThemeContext();

  return (
    <List>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} isSupportedProject={isSupportedProjects} />
      ))}

      {projects.length === 0 &&
        (isSupportedProjects ? (
          <NoResults isLight={isLight}>No results found</NoResults>
        ) : (
          <TablePlaceholder description="There are no Projects available with this combination of filters." />
        ))}
    </List>
  );
};

export default ProjectList;

const List = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const NoResults = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 20,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'italic',
  margin: '32px 0',

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
  },
}));
