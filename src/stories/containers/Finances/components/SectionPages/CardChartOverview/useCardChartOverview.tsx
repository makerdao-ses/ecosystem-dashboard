import { useMediaQuery } from '@mui/material';
import { existingColors, existingColorsDark, generateColorPalette } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';
import type { BudgetMetricWithName, DoughnutSeries, FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useCardChartOverview = (budgets: Budget[], budgetsAnalytics: BreakdownBudgetAnalytic | undefined) => {
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
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
  budgets.forEach((budget) => {
    const budgetKey = budget.codePath;
    const budgetName = budget.name;
    if (budgetMetrics[budget.codePath]) {
      const uniqueKey = `${budgetKey}-${budget.id}`;
      budgetMetrics[uniqueKey] = {
        name: budgetName,
        actuals: {
          unit: 'DAI',
          value: 0,
        },

        forecast: {
          unit: 'DAI',
          value: 0,
        },
        budget: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOnChain: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOffChainIncluded: {
          unit: 'DAI',
          value: 0,
        },
        code: budget.code || 'No-code',
      };
    } else {
      budgetMetrics[budgetKey] = {
        name: budgetName,
        actuals: {
          unit: 'DAI',
          value: 0,
        },

        forecast: {
          unit: 'DAI',
          value: 0,
        },
        budget: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOnChain: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOffChainIncluded: {
          unit: 'DAI',
          value: 0,
        },
        code: budget.code || 'No-code',
      };
    }
  });

  if (budgetsAnalytics !== undefined) {
    for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
      const budgetMetric = budgetsAnalytics[budgetMetricKey];
      const correspondingBudget = budgets.find((budget) => budget.codePath === budgetMetricKey);
      // use the name of budget or add label
      const budgetName = correspondingBudget ? correspondingBudget.name : 'There is not name';
      const budgetCode = correspondingBudget?.code || 'No-code';
      metric.actuals += budgetMetric[0].actuals.value || 0;
      metric.forecast += budgetMetric[0].forecast.value || 0;
      metric.budget += budgetMetric[0].budget.value || 0;
      metric.paymentsOnChain += budgetMetric[0].paymentsOnChain.value || 0;
      budgetMetrics[budgetMetricKey] = {
        name: budgetName,
        actuals: budgetMetric[0].actuals,
        forecast: budgetMetric[0].forecast,
        budget: budgetMetric[0].budget,
        paymentsOnChain: budgetMetric[0].paymentsOnChain,
        paymentsOffChainIncluded: budgetMetric[0].paymentsOffChainIncluded,
        code: budgetCode,
      };
    }
  }

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };
  const doughnutSeriesData: DoughnutSeries[] = Object.keys(budgetMetrics).map((item, index) => {
    let value;
    switch (filterSelected) {
      case 'Actual':
        value = budgetMetrics[item].actuals.value || 0;
        break;
      case 'Forecast':
        value = budgetMetrics[item].forecast.value || 0;
        break;
      case 'Net Expenses On-chain':
        value = budgetMetrics[item].paymentsOnChain.value || 0;
        break;
      case 'Net Expenses Off-chain':
        value = budgetMetrics[item].paymentsOffChainIncluded.value || 0;
        break;
      case 'Budget':
      default:
        value = budgetMetrics[item].budget.value || 0;
        break;
    }

    return {
      name: budgetMetrics[item].name || 'No name',
      code: budgetMetrics[item].code || 'No code',
      value,
      originalValue: value,
      actuals: budgetMetrics[item].actuals.value,
      budgetCap: budgetMetrics[item].budget.value,
      percent: Math.round(percentageRespectTo(value, metric.budget)),
      color: isLight ? colorsLight[index] : colorsDark[index],
      isVisible: true,
      originalColor: isLight ? colorsLight[index] : colorsDark[index],
    };
  });
  const changeAlignment = doughnutSeriesData.length > 4;

  const showSwiper = !!((isTable || isDesk1024) && doughnutSeriesData.length > 4);

  return {
    actuals: metric.actuals,
    prediction: metric.forecast,
    budgetCap: metric.budget,
    filterSelected,
    setFilterSelected,
    handleSelectFilter,
    filters,
    doughnutSeriesData,
    changeAlignment,
    showSwiper,
  };
};
