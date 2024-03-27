import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  getCorrectMetric,
  transformPathToName,
} from '../../utils/utils';
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
  const series: BreakdownChartSeriesData[] = [];

  if (budgetsAnalytics) {
    const budgetKeys = Object.keys(budgetsAnalytics);

    const colorsLight = generateColorPalette(
      existingColors.length,
      budgetKeys.length - existingColors.length,
      existingColors
    );
    const colorsDark = generateColorPalette(180, budgetKeys.length, existingColorsDark);

    budgetKeys.forEach((budgetKey, index) => {
      const searchCorrectBudget = budgets.length > 0 ? budgets : allBudgets;
      const nameBudget =
        searchCorrectBudget.find((budget) => budget.codePath === removePatternAfterSlash(budgetKey))?.name ??
        (budgetKey.endsWith('/*') ? 'Others' : undefined);

      const budgetData = budgetsAnalytics[budgetKey];
      if (Array.isArray(budgetData)) {
        const dataForSeries = budgetData.map((budgetMetric) => getCorrectMetric(budgetMetric, metric));

        series[index] = {
          name: nameBudget || transformPathToName(budgetKey),
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
          name: nameBudget || transformPathToName(budgetKey),
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
      } else if (isPositive && positiveCount === 1) {
        // Only one positive value, apply all borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius];
      } else if (isPositive && seriesIndex === firstPositiveIndex) {
        // First positive value bottom borders
        s.data[dataIndex].itemStyle.borderRadius = [0, 0, barBorderRadius, barBorderRadius];
      } else if (isPositive && seriesIndex === lastPositiveIndex) {
        // Last positive value top borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, 0, 0];
      } else if (isNegative && negativeCount === 1) {
        // Only one negative value, apply all borders
        s.data[dataIndex].itemStyle.borderRadius = [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius];
      } else if (isNegative && seriesIndex === firstNegativeIndex) {
        // First negative value, top edges (inverted due to negative nature)
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
