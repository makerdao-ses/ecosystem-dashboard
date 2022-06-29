import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface TableCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
}

export const TableCell = (props: TableCellProps) => {
  return <Container fontFamily={props.fontFamily} style={props.style} negative={props.negative}>{props.children}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string}>(({ negative = false, fontFamily = 'FT Base, sans-serif' }) => ({
  fontFamily,
  fontWeight: 400,
  fontSize: 16,
  padding: '16px',
  color: negative ? '#F75524' : '#231536',
  '> b': {
    fontWeight: 700,
    fontFamily: 'SF Pro Display, sans-serif'
  }
}));
