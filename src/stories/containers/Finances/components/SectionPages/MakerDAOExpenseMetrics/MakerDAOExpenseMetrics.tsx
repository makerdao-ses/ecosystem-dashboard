import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import MakerDAOChartMetrics from './MakerDAOChartMetrics/MakerDAOChartMetrics';
import TitleFilterComponent from './TitleFilterComponent';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

interface Props {
  handleGranularityChange: (value: AnalyticGranularity) => void;
  selectedGranularity: AnalyticGranularity;
  newActuals: { value: number }[];
  newBudget: { value: number }[];
  newForecast: { value: number }[];
  newNetExpensesOffChain: { value: number }[];
  newNetExpensesOnChain: { value: number }[];
  year: string;
  isLoading: boolean;
}

const MakerDAOExpenseMetricsFinances: React.FC<Props> = ({
  handleGranularityChange,
  selectedGranularity,
  newActuals,
  newBudget,
  newForecast,
  newNetExpensesOffChain,
  newNetExpensesOnChain,
  year,
  isLoading,
}) => (
  <Container>
    <TitleFilterComponent handleChange={handleGranularityChange} selectedValue={selectedGranularity} />
    <ContainerChart>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
            color: 'red',
          }}
        >
          loading...
        </div>
      ) : (
        <MakerDAOChartMetrics
          year={year}
          selectedGranularity={selectedGranularity}
          newActuals={newActuals}
          newBudget={newBudget}
          newForecast={newForecast}
          newNetExpensesOffChain={newNetExpensesOffChain}
          newNetExpensesOnChain={newNetExpensesOnChain}
        />
      )}
    </ContainerChart>
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

const ContainerChart = styled.div({});
