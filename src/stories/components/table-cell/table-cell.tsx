import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
  responsivePadding?: string;
}

export const TableCell = (props: TableCellProps) => {
  return <Container fontFamily={props.fontFamily} style={props.style} negative={props.negative} responsivePadding={props.responsivePadding}>{props.children}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string, responsivePadding?: string}>(({ negative = false, fontFamily = 'FT Base, sans-serif', responsivePadding }) => ({
  fontFamily,
  fontWeight: 400,
  fontSize: 16,
  padding: responsivePadding || '16px',
  color: negative ? '#F75524' : '#231536',
  '> b': {
    fontWeight: 700,
  },
  '@media (min-width: 825px)': {
    padding: '16px',
  }
}));
