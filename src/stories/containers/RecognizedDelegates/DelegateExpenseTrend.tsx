import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import DelegateChart from './components/DelegateChart';
import FilterDelegate from './components/FilterDelegate/FilterDelegate';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  expenses: number[];
  startDate: DateTime;
  endDate: DateTime;
  items: MultiSelectItem[];
  activeItems: string[];
  handleSelectChange: (value: string[]) => void;
  handleResetFilter: () => void;
}

const DelegateExpenseTrend: React.FC<Props> = ({
  expenses,
  endDate,
  startDate,
  activeItems,
  items,
  handleSelectChange,
  handleResetFilter,
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <WrapperTextMobile>
        <Title isLight={isLight}>Delegate Expense Trend</Title>
        <Description isLight={isLight}>Delegate Compensation / Month</Description>
      </WrapperTextMobile>
      <FilterContainer>
        <FilterDelegate
          activeItems={activeItems}
          items={items}
          handleSelectChange={handleSelectChange}
          handleResetFilter={handleResetFilter}
        />
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

const WrapperTextMobile = styled.div({
  display: 'flex',
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
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
  height: 34,
  marginBottom: 6,
  [lightTheme.breakpoints.up('table_834')]: {
    height: 48,
    marginBottom: 12,
  },
});
