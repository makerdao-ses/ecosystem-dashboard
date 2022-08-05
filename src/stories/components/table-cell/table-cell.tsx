import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
  responsivePadding?: string;
}

export const TableCell = (props: TableCellProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container isLight={isLight} fontFamily={props.fontFamily} style={props.style} negative={props.negative} responsivePadding={props.responsivePadding}>{props.children}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string, responsivePadding?: string, isLight: boolean }>(({ negative = false, fontFamily = 'FT Base, sans-serif', responsivePadding, isLight }) => ({
  fontFamily,
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '19px',
  padding: responsivePadding || '16px',
  color: isLight && negative ? '#F75524' : isLight && !negative ? '#231536' : !isLight && negative ? '#F75524' : '#D2D4EF',
  '> b': {
    fontWeight: 700,
  },
  '@media (min-width: 825px)': {
    padding: '16px',
    lineHeight: '16px'

  }
}));
