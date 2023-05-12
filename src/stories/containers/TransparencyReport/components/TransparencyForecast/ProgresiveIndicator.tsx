import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  forecast: number;
  budgetCap: number;
}

const ProgressiveIndicator: React.FC<Props> = ({ forecast, budgetCap }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Forecast isLight={isLight}>{forecast}</Forecast>
      <BudgetCap isLight={isLight}>{budgetCap}</BudgetCap>
    </Container>
  );
};

export default ProgressiveIndicator;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
});

const Forecast = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'right',

  color: isLight ? '#231536' : 'red',
}));

const BudgetCap = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#708390' : 'red',
}));
