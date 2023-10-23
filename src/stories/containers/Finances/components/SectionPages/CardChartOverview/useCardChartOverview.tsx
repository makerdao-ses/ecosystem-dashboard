import { useState } from 'react';
import type { FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';

export const useCardChartOverview = () => {
  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;
  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];
  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };
  const doughnutSeriesData: DoughnutSeries[] = [
    {
      name: 'Endgame Atlas Budgets',
      value: 4345,
      percent: 30,
      actuals: 45,
      budgetCap: 34,
      color: '#F99374',
    },
    {
      name: 'Endgame Scope Budgets',
      value: 34627,
      percent: 40,
      actuals: 45,
      budgetCap: 34,
      color: '#447AFB',
    },
    {
      name: 'MakerDAO Legacy Budgets',
      value: 3445,
      percent: 30,
      actuals: 45,
      budgetCap: 34,
      color: '#2DC1B1',
    },
  ];

  return {
    actuals,
    budgetCap,
    prediction,
    filterSelected,
    setFilterSelected,
    handleSelectFilter,
    filters,
    doughnutSeriesData,
  };
};
