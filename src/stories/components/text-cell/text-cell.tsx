import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
  responsivePadding?: string;
  bold?: boolean;
  isHeader?: boolean;
}

export const TextCell = ({ responsivePadding = '10px 16px', ...props }: TableCellProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container
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
  fontWeight: bold ? 700 : 400,
  lineHeight: '19px',
  display: 'flex',
  alignItems: 'center',
  padding: isHeader ? 16 : 0,
  textAlign: isHeader ? 'left' : 'right',
  fontSize: '14px',
  paddingLeft: 16,
  color:
    isLight && negative ? '#F75524' : isLight && !negative ? '#231536' : !isLight && negative ? '#F75524' : '#D2D4EF',
  '> b': {
    fontWeight: 700,
  },
  '@media (min-width: 834px)': {
    padding: '16px',
    lineHeight: '19px',
    fontSize: '16px',
    textAlign: 'left',
  },
}));
