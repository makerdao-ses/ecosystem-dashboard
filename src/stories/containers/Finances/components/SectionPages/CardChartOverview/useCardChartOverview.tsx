import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  removePrefix,
} from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useState } from 'react';
import type { FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
const prefixToRemove = 'End-game';

export const useCardChartOverview = (budgets: Budget[], budgetsAnalytics?: BudgetAnalytic[]) => {
  const { isLight } = useThemeContext();
  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);

  const metric = {
    actuals: 0,
    forecast: 0,
    budget: 0,
  };

  // remove the if when budgetsAnalytics exists in all pages/levels
  if (budgetsAnalytics !== undefined) {
    for (const ba of budgetsAnalytics) {
      metric.actuals += ba.metric.actuals.value;
      metric.forecast += ba.metric.forecast.value;
      metric.budget += ba.metric.budget.value;
    }
  }

  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];
  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };

  const doughnutSeriesData = budgets.map((item, index) => ({
    name: removePrefix(item.name, prefixToRemove),
    value: 4345,
    percent: 30,
    actuals: 45,
    budgetCap: 34,
    color: isLight ? colorsLight[index] : colorsDark[index],
  }));

  return {
    actuals: metric.actuals,
    prediction: metric.forecast,
    budgetCap: metric.budget,
    filterSelected,
    setFilterSelected,
    handleSelectFilter,
    filters,
    doughnutSeriesData,
  };
};
