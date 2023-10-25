import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  title: string;
  icon: JSX.Element;
}

const IconTitle: React.FC<Props> = ({ icon, title }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Icon>{icon}</Icon>
      <Title isLight={isLight}>{title}</Title>
    </Container>
  );
};

export default IconTitle;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    gap: 'revert',
  },
});
const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 20,
  [lightTheme.breakpoints.up('tablet_768')]: {
    color: isLight ? '#231536' : 'red',
    fontSize: 32,
    lineHeight: 'normal',
    marginTop: 8,
    letterSpacing: '0.4px',
    marginBottom: 64,
  },
}));
const Icon = styled.div({});
