import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DelegateChart from './components/DelegateChart';
import FilterDelegate from './components/FilterDelegate';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  expenses: number[];
  startDate: DateTime;
  endDate: DateTime;
}

const DelegateExpenseTrend: React.FC<Props> = ({ expenses, endDate, startDate }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Title isLight={isLight}>Delegate Expense Trend</Title>
      <Description isLight={isLight}>Delegate Compensation / Month</Description>
      <FilterContainer>
        <FilterDelegate />
      </FilterContainer>
      <ExpensesChartColumn>
        <DelegateChart expenses={expenses} endDate={endDate} startDate={startDate} />
      </ExpensesChartColumn>
    </Container>
  );
};

export default DelegateExpenseTrend;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

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
  marginBottom: 24,
}));

const ExpensesChartColumn = styled.div({
  width: 343,
  margin: '0 auto',
  [lightTheme.breakpoints.up('table_834')]: {
    width: 690,
    margin: '0 auto',
  },
});

const FilterContainer = styled.div({
  // TODO: This should be remove the fix values when filter component is implement:
  height: 34,
  marginBottom: 6,
});
