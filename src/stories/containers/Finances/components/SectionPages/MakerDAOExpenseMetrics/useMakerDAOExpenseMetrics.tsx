import { atlasBudget, legacyBudget, scopeBudget } from '@ses/containers/Finances/utils/utils';
import { useState } from 'react';
import type { MakerDAOExpenseMetricsLineChart, PeriodicSelectionFilter } from '@ses/containers/Finances/utils/types';

export const useMakerDAOExpenseMetrics = () => {
  const [isShowSeries, setIsShowSeries] = useState<MakerDAOExpenseMetricsLineChart>({
    Atlas: true,
    Forecast: true,
    Actuals: true,
    'Net Expenses On-chain': true,
    'Net Expenses Off-chain': true,
  });
  const [periodFilterMetrics, setPeriodFilterMetrics] = useState<PeriodicSelectionFilter>('Monthly');
  const handlePeriodChangeMetrics = (value: string) => {
    setPeriodFilterMetrics(value as PeriodicSelectionFilter);
  };

  const periodicSelectionFilterMetrics = ['Monthly', 'Quarterly', 'Annually'];
  const newBudget = atlasBudget;
  const newForecast = scopeBudget;
  const newActuals = legacyBudget;
  const newNetExpensesOnChain = atlasBudget;
  const newNetExpensesOffChain = scopeBudget;

  return {
    periodFilterMetrics,
    handlePeriodChangeMetrics,
    periodicSelectionFilterMetrics,
    newActuals,
    newBudget,
    newForecast,
    newNetExpensesOffChain,
    newNetExpensesOnChain,
    isShowSeries,
    setIsShowSeries,
  };
};
