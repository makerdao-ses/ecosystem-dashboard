import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const DelegateExpenseTrend = () => {
  const { isLight } = useThemeContext();
  return (
    <div>
      <Title isLight={isLight}>Delegate Expense Trend</Title>
      <Description isLight={isLight}>Delegate Compensation / Month</Description>
      <div>Filter</div>
      <div>Chart</div>
    </div>
  );
};

export default DelegateExpenseTrend;

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',

  letterSpacing: '0.75px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 0,
  marginBottom: 0,
}));

const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 4,
}));
