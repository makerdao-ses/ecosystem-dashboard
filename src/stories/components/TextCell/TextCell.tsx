import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { CSSProperties } from 'react';

export interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
  responsivePadding?: string;
  bold?: boolean;
  isHeader?: boolean;
  className?: string;
}

export const TextCell = ({ responsivePadding = '10px 16px', ...props }: TableCellProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      className={props.className}
      bold={!!props.bold}
      isLight={isLight}
      fontFamily={props.fontFamily}
      style={props.style}
      negative={props.negative}
      responsivePadding={responsivePadding}
      isHeader={props.isHeader}
    >
      {props.children}
    </Container>
  );
};

const Container = styled.div<{
  bold: boolean;
  negative?: boolean;
  fontFamily?: string;
  responsivePadding?: string;
  isLight: boolean;
  isHeader?: boolean;
}>(({ negative = false, fontFamily = 'Inter, sans-serif', isLight, bold, isHeader }) => ({
  fontFamily,
  fontWeight: isHeader ? (bold ? 700 : 500) : 400,
  lineHeight: isHeader ? (bold ? '19px' : '18px') : '15px',
  display: 'flex',
  alignItems: 'center',
  padding: isHeader ? 16 : 0,
  textAlign: isHeader ? 'left' : 'right',
  fontSize: isHeader ? '16px' : '14px',
  paddingLeft: 16,
  color:
    isLight && negative ? '#F75524' : isLight && !negative ? '#231536' : !isLight && negative ? '#F75524' : '#D2D4EF',
  '> b': {
    fontWeight: 700,
  },
  '@media (min-width: 834px)': {
    lineHeight: '19px',
    fontSize: '16px',
    textAlign: 'left',
    fontWeight: isHeader ? (bold ? 700 : 400) : 400,
  },
}));
