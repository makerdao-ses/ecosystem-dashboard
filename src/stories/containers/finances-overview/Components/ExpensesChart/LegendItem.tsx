import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

interface Props {
  color: string;
  text: string;
}

const LegendItem = ({ color, text }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Doter color={color} />
      <Label isLight={isLight}>{text}</Label>
    </Container>
  );
};

export default LegendItem;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
const Doter = styled.div<{ color: string }>(({ color }) => ({
  backgroundColor: color,
  marginRight: 4,
  width: 8,
  height: 8,
  borderRadius: '50%',
  [lightTheme.breakpoints.up('table_834')]: {
    width: 12,
    height: 12,
  },
}));

const Label = styled.label<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 11,
  lineHeight: '13px',
  padding: 0,
  color: isLight ? '#231536' : '#EDEFFF',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
}));
