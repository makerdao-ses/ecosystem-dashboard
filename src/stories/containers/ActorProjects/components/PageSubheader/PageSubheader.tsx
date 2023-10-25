import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ProjectFilters from '../ProjectFilters/ProjectFilters';
import type { ProjectFiltersProps } from '../ProjectFilters/ProjectFilters';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const PageSubheader: React.FC<ProjectFiltersProps> = (props) => {
  const { isLight } = useThemeContext();

  return (
    <Header>
      <Title isLight={isLight}>Projects</Title>

      <ProjectFilters {...props} />
    </Header>
  );
};

export default PageSubheader;

const Header = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 24,
  marginBottom: 32,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 0,
  },
});

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  margin: 0,
  color: isLight ? '#231536' : 'red',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
  },
}));
