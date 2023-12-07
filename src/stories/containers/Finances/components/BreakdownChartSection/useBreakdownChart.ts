import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useMemo, useRef, useState } from 'react';
import { atlasBudget, legacyBudget, processingData, scopeBudget } from '../../utils/utils';
import { parseAnalyticsToSeriesBreakDownChart } from './utis';
import type { Metric, ValueSeriesBreakdownChart } from '../../utils/types';
import type { BreakdownBudgetAnalytic, BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { EChartsOption } from 'echarts-for-react';

const useBreakdownChart = (
  budgets: Budget[],
  budgetsAnalyticsMonthly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsQuarterly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsAnnual: BudgetAnalytic | undefined
) => {
  const [isShowSeries, setIsShowSeries] = useState({
    'Endgame Atlas': true,
    'Endgame Scopes': true,
    'MakerDAO Legacy': true,
  });

  const [selectedBreakdownMetric, setSelectedBreakdownMetric] = useState<string>('Budget');
  const { isLight } = useThemeContext();
  const refBreakDownChart = useRef<EChartsOption | null>(null);
  const [selectedBreakdownGranularity, setSelectedBreakdownGranularity] = useState<string>('Monthly');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const barWidth = isMobile ? 16 : isTablet ? 40 : isDesktop1024 ? 40 : 56;

  const handleBreakdownMetricChange = (value: string) => setSelectedBreakdownMetric(value);
  const handleBreakdownGranularityChange = (value: string) => {
    setSelectedBreakdownGranularity(value);
  };
  const barBorderRadius = isMobile ? 4 : 6;
  const itemStyleBottom = {
    borderRadius: [0, 0, barBorderRadius, barBorderRadius],
  };
  const itemStyleTop = {
    borderRadius: [barBorderRadius, barBorderRadius, 0, 0],
  };
  const itemStyleFull = {
    borderRadius: [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius],
  };
  const itemStyledNoBorders = {
    borderRadius: [0, 0, 0, 0],
  };
  const valuesAtlasBudget = processingData(isShowSeries['Endgame Atlas'] ? atlasBudget : []);
  const valuesScopeBudget = processingData(isShowSeries['Endgame Scopes'] ? scopeBudget : []);
  const valuesLegacyBudget = processingData(isShowSeries['MakerDAO Legacy'] ? legacyBudget : []);

  const newAtlasBudgetWithBorders = valuesAtlasBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesScopeBudget[index].value === 0 && valuesLegacyBudget[index].value === 0 ? itemStyleFull : itemStyleBottom,
  })) as ValueSeriesBreakdownChart[];

  const newScopeBudgetWithBorders = valuesScopeBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesAtlasBudget[index].value === 0 && valuesLegacyBudget[index].value === 0
        ? itemStyleFull
        : valuesAtlasBudget[index].value === 0 && valuesLegacyBudget[index].value !== 0
        ? itemStyleBottom
        : valuesAtlasBudget[index].value !== 0 && valuesLegacyBudget[index].value === 0
        ? itemStyleTop
        : valuesAtlasBudget[index].value !== 0 && valuesLegacyBudget[index].value !== 0
        ? itemStyledNoBorders
        : itemStyleTop,
  })) as ValueSeriesBreakdownChart[];

  const newLegacyBudgetWithBorders = valuesLegacyBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesAtlasBudget[index].value === 0 && valuesScopeBudget[index].value === 0 ? itemStyleFull : itemStyleTop,
  })) as ValueSeriesBreakdownChart[];
  const isDisabled = selectedBreakdownMetric === 'Budget' && selectedBreakdownGranularity === 'Monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedBreakdownMetric('Budget');
    setSelectedBreakdownGranularity('Monthly');
  };

  let budgetsAnalytics: BreakdownBudgetAnalytic | BudgetAnalytic | undefined;
  switch (selectedBreakdownGranularity) {
    case 'Monthly':
      budgetsAnalytics = budgetsAnalyticsMonthly;
      break;
    case 'Quarterly':
      budgetsAnalytics = budgetsAnalyticsQuarterly;
      break;
    case 'Annually':
      budgetsAnalytics = budgetsAnalyticsAnnual;
      break;
    default:
      budgetsAnalytics = undefined;
  }

  const series = useMemo(
    () =>
      parseAnalyticsToSeriesBreakDownChart(
        budgetsAnalytics,
        budgets,
        isLight,
        barWidth,
        selectedBreakdownMetric as Metric
      ),
    [barWidth, budgets, budgetsAnalytics, isLight, selectedBreakdownMetric]
  );

  return {
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    newAtlasBudgetWithBorders,
    newScopeBudgetWithBorders,
    newLegacyBudgetWithBorders,
    isShowSeries,
    setIsShowSeries,
    isDisabled,
    handleResetFilterBreakDownChart,
    series,
    isMobile,
    isTablet,
    isDesktop1024,
    isLight,
    refBreakDownChart,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
  };
};

export default useBreakdownChart;
