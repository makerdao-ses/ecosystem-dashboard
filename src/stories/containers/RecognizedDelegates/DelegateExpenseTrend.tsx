import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DelegateChart from './components/DelegateChart';
import FilterDelegate from './components/FilterDelegate';

interface Props {
  expenses: number[];
  months: string[];
}

const DelegateExpenseTrend: React.FC<Props> = ({ expenses, months }) => (
  <Container>
    <Title>Delegate Expense Trend</Title>
    <Description>Delegate Compensation / Month</Description>
    <FilterContainer>
      <FilterDelegate />
    </FilterContainer>
    <ExpensesChartColumn>
      <DelegateChart expenses={expenses} months={months} />
    </ExpensesChartColumn>
  </Container>
);

export default DelegateExpenseTrend;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',

  letterSpacing: '0.75px',
  color: '#231536',
  marginTop: 0,
  marginBottom: 0,
});

const Description = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#231536',
  marginTop: 5,
  marginBottom: 24,
});

const ExpensesChartColumn = styled.div({
  width: 343,
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    margin: '32px auto 0',
    width: 666,
    paddingRight: 59,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    margin: '52px auto 0',
    width: 479,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 504,
  },
});

const FilterContainer = styled.div({
  marginBottom: 32,
});
