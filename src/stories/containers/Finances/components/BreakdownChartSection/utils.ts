import { existingColors, existingColorsDark, generateColorPalette, getCorrectMetric } from '../../utils/utils';
import { removePatternAfterSlash } from '../SectionPages/BreakdownTable/utils';
import type { BreakdownChartSeriesData } from '../../utils/types';
import type { AnalyticMetric, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const parseAnalyticsToSeriesBreakDownChart = (
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  budgets: Budget[],
  isLight: boolean,
  barWidth: number,
  metric: AnalyticMetric,
  allBudgets: Budget[]
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
      const searchCorrectBudget = budgets.length > 0 ? budgets : allBudgets;
      const nameBudget =
        searchCorrectBudget.find((budget) => budget.codePath === removePatternAfterSlash(budgetKey))?.name ??
        (budgetKey.endsWith('/*') ? 'Others' : undefined);

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
    let firstPositiveIndex = -1;
    let lastPositiveIndex = -1;
    let firstNegativeIndex = -1;
    let lastNegativeIndex = -1;
    let positiveCount = 0;
    let negativeCount = 0;

    // Identify first and last indices for positive and negative values
    series.forEach((s, seriesIndex) => {
      const value = s.data[dataIndex].value ?? 0;
      if (value > 0) {
        if (firstPositiveIndex === -1) firstPositiveIndex = seriesIndex;
        lastPositiveIndex = seriesIndex;
        positiveCount++;
      } else if (value < 0) {
        if (firstNegativeIndex === -1) firstNegativeIndex = seriesIndex;
        lastNegativeIndex = seriesIndex;
        negativeCount++;
      }
    });

    // Apply border styles based on position and value.
    series.forEach((s, seriesIndex) => {
      const isPositive = (s.data[dataIndex].value ?? 0) > 0;
      const isNegative = (s.data[dataIndex].value ?? 0) < 0;

      if (positiveCount + negativeCount === 1) {
        // Apply all borders if only one value
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius];
      } else if (isPositive && seriesIndex === firstPositiveIndex) {
        // Firts postive value bottom borders
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius];
      } else if (isPositive && seriesIndex === lastPositiveIndex) {
        // Last postive value top borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0];
      } else if (isNegative && seriesIndex === firstNegativeIndex) {
        // First value negative, top edges (inverted due to negative nature)
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0];
      } else if (isNegative && seriesIndex === lastNegativeIndex) {
        // Last negative value, bottom edges (inverted)
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius];
      } else {
        // No borders for intermediate values
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, 0, 0];
      }
    });
  }

  return series;
};

export const getSelectMetricText = (metric: AnalyticMetric | undefined) => {
  if (!metric) return 'Budget';
  switch (metric) {
    case 'ProtocolNetOutflow':
      return 'Net Protocol Outflow';
    case 'PaymentsOnChain':
      return 'Net Expenses On-chain';
    default:
      return metric;
  }
};
