import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const PageHeader: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <Header>
      <Title isLight={isLight}>Phase 1 Progress</Title>
      <Subtitle isLight={isLight}>
        Unleashing Potential: MakerDAO’s result-driven road map for unlocking tangible results.
      </Subtitle>
    </Header>
  );
};

export default PageHeader;

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 16,
  },
});

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 32,
  },
}));

const Subtitle = styled.p<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  margin: 0,
  fontSize: 16,
  lineHeight: '22px',
}));
