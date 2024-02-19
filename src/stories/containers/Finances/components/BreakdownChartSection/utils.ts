import { existingColors, existingColorsDark, generateColorPalette, getCorrectMetric } from '../../utils/utils';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type { AnalyticMetric, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const parseAnalyticsToSeriesBreakDownChart = (
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  budgets: Budget[],
  isLight: boolean,
  barWidth: number,
  metric: AnalyticMetric
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

export const setBorderRadiusForSeries = (
  series: BreakdownChartSeriesData[],
  barBorderRadius: number
): BreakdownChartSeriesData[] => {
  const seriesLength = series[0]?.data.length;

  for (let dataIndex = 0; dataIndex < seriesLength; dataIndex++) {
    let firstNonNullIndex = -1;
    let lastNonNullIndex = -1;
    let nonNullCount = 0;

    series.forEach((s, seriesIndex) => {
      if (s.data[dataIndex].value !== 0 && s.data[dataIndex].value !== null && s.data[dataIndex].value !== undefined) {
        if (firstNonNullIndex === -1) firstNonNullIndex = seriesIndex;
        lastNonNullIndex = seriesIndex;
        nonNullCount++;
      }
    });

    series.forEach((s, seriesIndex) => {
      if (nonNullCount === 1) {
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius];
      } else if (seriesIndex === firstNonNullIndex) {
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius];
      } else if (seriesIndex === lastNonNullIndex) {
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0];
      } else {
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0];
      }
    });
  }

  return series;
};
