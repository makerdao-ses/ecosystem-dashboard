import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { formatNumber } from '../../../core/utils/string.utils';

interface NumberCellProps {
  style?: CSSProperties;
  fontFamily?: string;
  value: number;
  bold?: boolean;
}

export const NumberCell = (props: NumberCellProps) => {
  return <Container fontFamily={props.fontFamily} style={{
    fontWeight: props.bold ? 700 : 400,
    ...props.style
  }} negative={props.value < 0}>{formatNumber(props.value)}</Container>;
};

const Container = styled.div<{ negative?: boolean, fontFamily?: string}>(({ negative = false, fontFamily = 'SF Pro Display, sans-serif' }) => ({
  fontFamily,
  fontSize: 16,
  padding: '16px',
  color: negative ? '#F75524' : '#231536'
}));
