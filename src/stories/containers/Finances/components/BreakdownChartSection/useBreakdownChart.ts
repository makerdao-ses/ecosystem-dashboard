import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useMemo, useRef, useState } from 'react';

import { parseAnalyticsToSeriesBreakDownChart, setBorderRadiusForSeries } from './utils';
import type { Metric } from '../../utils/types';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { EChartsOption } from 'echarts-for-react';

const useBreakdownChart = (
  budgets: Budget[],
  budgetsAnalyticsMonthly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsQuarterly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsAnnual: BreakdownBudgetAnalytic | undefined
) => {
  const [selectedBreakdownMetric, setSelectedBreakdownMetric] = useState<string>('Budget');
  const { isLight } = useThemeContext();
  const refBreakDownChart = useRef<EChartsOption | null>(null);
  const [selectedBreakdownGranularity, setSelectedBreakdownGranularity] = useState<string>('Monthly');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));
  const barWidth = isMobile
    ? selectedBreakdownGranularity === 'Quarterly'
      ? 32
      : selectedBreakdownGranularity === 'Annually'
      ? 96
      : 16
    : isTablet
    ? 40
    : isDesktop1024 || isDesktop1280
    ? selectedBreakdownGranularity === 'Annually'
      ? 168
      : selectedBreakdownGranularity === 'Quarterly'
      ? 64
      : 40
    : 56;

  const handleBreakdownMetricChange = (value: string) => setSelectedBreakdownMetric(value);
  const handleBreakdownGranularityChange = (value: string) => {
    setSelectedBreakdownGranularity(value);
  };
  const barBorderRadius = isMobile ? 4 : 6;

  const isDisabled = selectedBreakdownMetric === 'Budget' && selectedBreakdownGranularity === 'Monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedBreakdownMetric('Budget');
    setSelectedBreakdownGranularity('Monthly');
  };

  let budgetsAnalytics: BreakdownBudgetAnalytic | undefined;
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

  const seriesWithoutBorder = useMemo(
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

  const allSeries = setBorderRadiusForSeries(seriesWithoutBorder, barBorderRadius);

  // series to be "hidden" in the chart
  const [inactiveSeries, setInactiveSeries] = useState<string[]>([]);
  const handleToggleSeries = (toggleSeries: string) => {
    setInactiveSeries(
      inactiveSeries.includes(toggleSeries)
        ? inactiveSeries.filter((series) => series !== toggleSeries)
        : [...inactiveSeries, toggleSeries]
    );
  };
  const series = useMemo(() => {
    const xx = allSeries.map((item) => {
      if (inactiveSeries.includes(item.name)) {
        return {
          ...item,
          isVisible: false,
          itemStyle: {
            ...item.itemStyle,
            colorOriginal: '#ccc',
          },
          data: item.data.map(() => ({
            value: 0, // set value to 0 to hide the bar
            itemStyle: { borderRadius: [0, 0, 0, 0] },
          })),
        };
      }

      return item;
    });

    return setBorderRadiusForSeries(xx, barBorderRadius);
  }, [allSeries, barBorderRadius, inactiveSeries]);

  return {
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,

    isDisabled,
    handleResetFilterBreakDownChart,
    handleToggleSeries,
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
