import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { formatNumber } from '../../../core/utils/string.utils';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface NumberCellProps {
  style?: CSSProperties;
  fontFamily?: string;
  value: number;
  bold?: boolean;
  responsivePadding?: string;
}

export const NumberCell = ({ responsivePadding = '10px 16px', ...props }: NumberCellProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container responsivePadding={responsivePadding} fontFamily={props.fontFamily} isLight={isLight} style={{
    fontWeight: props.bold ? 700 : 400,
    ...props.style
  }} negative={props.value < 0}>{formatNumber(props.value)}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string, isLight: boolean, responsivePadding: string }>(({ negative = false, fontFamily = 'SF Pro Display, sans-serif', isLight, responsivePadding }) => ({
  fontFamily,
  fontSize: '14px',
  lineHeight: '17px',
  padding: responsivePadding,
  color: isLight && negative ? '#F75524' : isLight && !negative ? '#231536' : !isLight && negative ? '#F75524' : '#D2D4EF',
  '@media (min-width: 834px)': {
    padding: '10px 16px',
  },
  '@media (min-width: 1194px)': {
    fontSize: '16px',
    lineHeight: '19px',
  }
}));
