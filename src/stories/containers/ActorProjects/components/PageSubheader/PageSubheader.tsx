import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import ProjectFilters from '../ProjectFilters/ProjectFilters';
import type { ProjectFiltersProps } from '../ProjectFilters/ProjectFilters';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const PageSubheader: React.FC<ProjectFiltersProps> = (props) => {
  const { isLight } = useThemeContext();
  const { isMobile, isFilterCollapsedOnMobile } = props;

  return (
    <Header>
      {((isMobile && isFilterCollapsedOnMobile) || !isMobile) && <Title isLight={isLight}>Projects</Title>}

      <ProjectFilters {...props} />
    </Header>
  );
};

export default PageSubheader;

const Header = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 24,
  marginBottom: 32,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignSelf: 'stretch',
    gap: 0,
  },
});

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 24,
  },
}));
