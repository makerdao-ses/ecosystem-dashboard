import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { formatNumber } from '../../../core/utils/string.utils';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface NumberCellProps {
  style?: CSSProperties;
  fontFamily?: string;
  value: number;
  bold?: boolean;
}

export const NumberCell = (props: NumberCellProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container fontFamily={props.fontFamily} isLight={isLight} style={{
    fontWeight: props.bold ? 700 : 400,
    ...props.style
  }} negative={props.value < 0}>{formatNumber(props.value)}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string, isLight:boolean}>(({ negative = false, fontFamily = 'SF Pro Display, sans-serif', isLight }) => ({
  fontFamily,
  fontSize: 16,
  padding: '16px',
  color: isLight && negative ? '#F75524' : isLight && !negative ? '#231536' : !isLight && negative ? '#F75524' : '#D2D4EF',
}));
