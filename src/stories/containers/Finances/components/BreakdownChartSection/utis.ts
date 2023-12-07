import { existingColors, existingColorsDark, generateColorPalette, getCorrectMetric } from '../../utils/utils';
import type { BreakdownChartSeriesData, Metric } from '../../utils/types';
import type { BreakdownBudgetAnalytic, BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const parseAnalyticsToSeriesBreakDownChart = (
  budgetsAnalytics: BreakdownBudgetAnalytic | BudgetAnalytic | undefined,
  budgets: Budget[],
  isLight: boolean,
  barWidth: number,
  metric: Metric
) => {
  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);

  const series: BreakdownChartSeriesData[] = [];

  if (budgetsAnalytics) {
    const budgetKeys = Object.keys(budgetsAnalytics);

    budgetKeys.forEach((budgetKey, index) => {
      const nameBudget = budgets.find((budget) => budget.codePath === budgetKey)?.name;
      const budgetData = budgetsAnalytics[budgetKey];
      if (Array.isArray(budgetData)) {
        const dataForSeries = budgetData.map((budgetMetric) => getCorrectMetric(budgetMetric, metric));
        series[index] = {
          name: nameBudget || 'Not name',
          dataOriginal: dataForSeries,
          data: dataForSeries,
          type: 'bar',
          stack: 'x',
          barWidth,
          showBackground: false,
          itemStyle: {
            color: isLight ? colorsLight[index] : colorsDark[index],
            colorOriginal: isLight ? colorsLight[index] : colorsDark[index],
          },
          isVisible: true,
        };
      } else {
        const dataForSeries = getCorrectMetric(budgetData, metric);
        series[index] = {
          name: nameBudget || 'Not name',
          dataOriginal: [dataForSeries],
          data: [dataForSeries],
          type: 'bar',
          stack: 'x',
          barWidth,
          showBackground: false,
          itemStyle: {
            color: isLight ? colorsLight[index] : colorsDark[index],
            colorOriginal: isLight ? colorsLight[index] : colorsDark[index],
          },
          isVisible: true,
        };
      }
    });
  }
  return series;
};
