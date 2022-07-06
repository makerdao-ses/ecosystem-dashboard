import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';

interface NumberCellProps {
  negative?: boolean;
  children?: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
  fontFamily?: string;
}

export const NumberCell = (props: NumberCellProps) => {
  return <Container fontFamily={props.fontFamily} style={props.style} negative={props.negative}>{props.children}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string}>(({ negative = false, fontFamily = 'SF Pro Display, sans-serif' }) => ({
  fontFamily,
  fontWeight: 400,
  fontSize: 16,
  padding: '16px',
  color: negative ? '#F75524' : '#231536',
  '> b': {
    fontWeight: 700,
  }
}));
