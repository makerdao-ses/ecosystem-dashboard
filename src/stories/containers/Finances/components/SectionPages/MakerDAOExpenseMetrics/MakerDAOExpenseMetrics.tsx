import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MakerDAOChartMetrics from './MakerDAOChartMetrics/MakerDAOChartMetrics';
import TitleFilterComponent from './TitleFilterComponent';

interface Props {
  periodicSelectionFilter: string[];
  handleChange: (value: string) => void;
  selectedValue: string;
  newActuals: { value: number }[];
  newBudget: { value: number }[];
  newForecast: { value: number }[];
  newNetExpensesOffChain: { value: number }[];
  newNetExpensesOnChain: { value: number }[];
  year: string;
}

const MakerDAOExpenseMetricsFinances: React.FC<Props> = ({
  handleChange,
  selectedValue,
  periodicSelectionFilter,
  newActuals,
  newBudget,
  newForecast,
  newNetExpensesOffChain,
  newNetExpensesOnChain,

  year,
}) => (
  <Container>
    <TitleFilterComponent
      handleChange={handleChange}
      selectedValue={selectedValue}
      periodicSelectionFilter={periodicSelectionFilter}
    />
    <div>
      <MakerDAOChartMetrics
        year={year}
        newActuals={newActuals}
        newBudget={newBudget}
        newForecast={newForecast}
        newNetExpensesOffChain={newNetExpensesOffChain}
        newNetExpensesOnChain={newNetExpensesOnChain}
      />
    </div>
  </Container>
);

export default MakerDAOExpenseMetricsFinances;
const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 40,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginTop: 64,
  },
});
