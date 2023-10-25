import styled from '@emotion/styled';
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectList: React.FC = () => (
  <List>
    {[...Array(3)].map((_, index) => (
      <ProjectCard key={index} />
    ))}
  </List>
);

export default ProjectList;

const List = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
