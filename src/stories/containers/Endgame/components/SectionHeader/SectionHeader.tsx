import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  const { isLight } = useThemeContext();

  return (
    <Header>
      <Title isLight={isLight}>{title}</Title>
      <Subtitle isLight={isLight}>{subtitle}</Subtitle>
    </Header>
  );
};

export default SectionHeader;

const Header = styled.header({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  margin: 0,
  fontSize: 24,
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 32,
  },
}));

const Subtitle = styled.p<WithIsLight>(({ isLight }) => ({
  margin: 0,
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 14,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
