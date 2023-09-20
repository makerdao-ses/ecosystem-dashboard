import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  handleOnclick?: () => void;
  title?: string;
}
const ViewButton: React.FC<Props> = ({ handleOnclick, title }) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight} onClick={handleOnclick}>
      <Text isLight={isLight}>{title}</Text>
    </Container>
  );
};

export default ViewButton;

const Container = styled.button<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  padding: '8px 24px',
  borderRadius: 22,
  border: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  background: isLight ? '#FFF' : 'transparent',
  height: 34,
  cursor: 'pointer',
  ':hover': {
    border: `1px solid ${isLight ? '#231536' : '#787A9B'}`,
    background: isLight ? 'none' : '#10191F',
  },
}));

const Text = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  color: isLight ? '#31424E' : '#E2D8EE',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '18px',
}));
