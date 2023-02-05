import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import ExpensesChart from '../ExpensesChart/ExpensesChart';

interface Props {
  total: number;
}

const ExpensesChartSection: React.FC<Props> = ({ total }: Props) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <Label isLight={isLight}>{`${total} dai`}</Label>
      <div>Total Expenses</div>
      <ExpensesChart />
    </Container>
  );
};

const Container = styled.div({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  flex: 1,
});

const Label = styled.label<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fonWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',

  letterSpacing: ' 0.4px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#EDEFFF',
}));

export default ExpensesChartSection;
