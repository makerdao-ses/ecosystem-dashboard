import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
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
});
const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 32,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  marginTop: 8,
  letterSpacing: '0.4px',
}));
const Icon = styled.div({});
