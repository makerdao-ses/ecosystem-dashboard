import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  removePrefix,
} from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { percentageRespectTo } from '@ses/core/utils/math';
import { useState } from 'react';
import type { BudgetMetricWithName, DoughnutSeries, FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
const prefixToRemove = 'End-game';

export const useCardChartOverview = (budgets: Budget[], budgetsAnalytics: BudgetAnalytic | undefined) => {
  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];
  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');
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
    paymentsOnChain: 0,
    paymentsOffChainIncluded: 0,
  };

  const budgetMetrics: Record<string, BudgetMetricWithName> = {};

  if (budgetsAnalytics !== undefined) {
    for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
      const budgetMetric = budgetsAnalytics[budgetMetricKey];

      const correspondingBudget = budgets.find((budget) => {
        // Remove this when the codePath match
        const momentBudget = budget.codePath === 'atlas/immutable' ? 'atlas/atlas' : budget.codePath;

        return momentBudget === budgetMetricKey;
      });

      // use the name of budget or add label
      const budgetName = correspondingBudget
        ? removePrefix(correspondingBudget.name, prefixToRemove)
        : 'There is not name';
      metric.actuals += budgetMetric.actuals.value;
      metric.forecast += budgetMetric.forecast.value;
      metric.budget += budgetMetric.budget.value;
      metric.paymentsOnChain += budgetMetric.paymentsOnChain.value;
      budgetMetrics[budgetMetricKey] = {
        name: budgetName,
        actuals: budgetMetric.actuals,
        forecast: budgetMetric.forecast,
        budget: budgetMetric.budget,
        paymentsOnChain: budgetMetric.paymentsOnChain,
        paymentsOffChainIncluded: budgetMetric.paymentsOffChainIncluded,
      };
    }
  }

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };
  const doughnutSeriesData: DoughnutSeries[] = Object.keys(budgetMetrics)
    .map((item, index) => {
      let value;
      switch (filterSelected) {
        case 'Actual':
          value = budgetMetrics[item].actuals.value;
          break;
        case 'Forecast':
          value = budgetMetrics[item].forecast.value;
          break;
        case 'Net Expenses On-chain':
          value = budgetMetrics[item].paymentsOnChain.value;
          break;
        case 'Net Expenses Off-chain':
          value = budgetMetrics[item].paymentsOffChainIncluded.value;
          break;
        case 'Budget':
        default:
          value = budgetMetrics[item].budget.value;
          break;
      }

      return {
        name: budgetMetrics[item].name || 'No name',
        value,
        actuals: budgetMetrics[item].actuals.value,
        budgetCap: budgetMetrics[item].budget.value,
        percent: Math.round(percentageRespectTo(value, metric.budget)),
        color: value !== 0 ? (isLight ? colorsLight[index] : colorsDark[index]) : 'rgb(204, 204, 204)',
      };
    })
    .filter((values) => values.name !== 'Other' && values.name !== 'Example budget code');

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
