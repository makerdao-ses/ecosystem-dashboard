import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { formatNumber } from '../../../core/utils/string';
import type { CSSProperties } from 'react';

interface NumberCellProps {
  style?: CSSProperties;
  fontFamily?: string;
  value: number;
  bold?: boolean;
  className?: string;
  isIncome?: boolean;
}

export const NumberCell = (props: NumberCellProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      className={props.className}
      fontFamily={props.fontFamily}
      isLight={isLight}
      style={{
        fontWeight: props.bold ? 700 : 400,
        ...props.style,
      }}
      negative={props.value < 0}
      isIncome={props.isIncome ?? false}
    >
      {formatNumber(props.value)}
    </Container>
  );
};

const Container = styled.div<{ negative?: boolean; fontFamily?: string; isLight: boolean; isIncome: boolean }>(
  ({ negative = false, fontFamily = 'Inter, sans-serif', isLight, isIncome }) => ({
    fontFamily,
    fontSize: '14px',
    lineHeight: '17px',
    padding: '10px 0',
    fontWeight: 400,
    letterSpacing: '0.3px',
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: isLight
      ? negative
        ? isIncome
          ? '#139D8D'
          : '#F75524'
        : '#231536'
      : negative
      ? isIncome
        ? '#1AAB9B'
        : '#F75524'
      : '#D2D4EF',

    '@media (min-width: 834px)': {
      padding: '10px 16px',
    },

    '@media (min-width: 1194px)': {
      fontSize: '16px',
      lineHeight: '19px',
    },
  })
);
