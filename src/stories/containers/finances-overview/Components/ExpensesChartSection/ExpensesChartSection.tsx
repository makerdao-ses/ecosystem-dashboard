import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import ExpensesChart from '../ExpensesChart/ExpensesChart';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chart.dto';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';

interface Props {
  totalExpenses: string;
  monthly: Partial<ExpenseDto>[];
  newActual: ValuesDataWithBorder[];
  newDiscontinued: ValuesDataWithBorder[];
  newPrediction: ValuesDataWithBorder[];
}

const ExpensesChartSection: React.FC<Props> = ({
  totalExpenses,
  monthly,
  newActual,
  newDiscontinued,
  newPrediction,
}: Props) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <DetailContainer>
        <div>
          <Label isLight={isLight}>{`${totalExpenses} dai`}</Label>
          <Line isLight={isLight} />
        </div>

        <TotalDescription isLight={isLight}>Total Expenses</TotalDescription>
      </DetailContainer>

      <ExpensesChart
        monthly={monthly}
        newActual={newActual}
        newDiscontinued={newDiscontinued}
        newPrediction={newPrediction}
      />
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});
const DetailContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 16,
});

const Label = styled.label<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  letterSpacing: ' 0.4px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#EDEFFF',
}));

const TotalDescription = styled.label<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#EDEFFF',
  marginTop: 4,
}));

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: 'fix-content',
  border: isLight ? '1px solid #B6EDE7' : '1px solid #06554C',
  marginTop: 4,
}));
export default ExpensesChartSection;
