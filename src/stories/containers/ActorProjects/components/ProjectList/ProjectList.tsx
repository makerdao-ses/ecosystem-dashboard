import styled from '@emotion/styled';
import { TablePlaceholder } from '@ses/components/CustomTable/TablePlaceholder';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import type { Project } from '@ses/core/models/interfaces/projects';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => (
  <List>
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}

    {projects.length === 0 && (
      <TablePlaceholder description="There are no Projects available with this combination of filters." />
    )}
  </List>
);

export default ProjectList;

const List = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
