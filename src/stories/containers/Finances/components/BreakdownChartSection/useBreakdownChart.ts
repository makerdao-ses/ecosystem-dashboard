import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useMemo, useRef, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { getBudgetsAnalytics } from '../../utils/utils';
import { parseAnalyticsToSeriesBreakDownChart, setBorderRadiusForSeries } from './utils';
import type {
  AnalyticGranularity,
  AnalyticMetric,
  BreakdownBudgetAnalytic,
} from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { EChartsOption } from 'echarts-for-react';

const useBreakdownChart = (budgets: Budget[], year: string, codePath: string) => {
  const { isLight } = useThemeContext();
  const [selectedBreakdownMetric, setSelectedBreakdownMetric] = useState<string>('Budget');
  const refBreakDownChart = useRef<EChartsOption | null>(null);
  const [selectedBreakdownGranularity, setSelectedBreakdownGranularity] = useState<AnalyticGranularity>('monthly');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));
  const barWidth = isMobile
    ? selectedBreakdownGranularity === 'quarterly'
      ? 32
      : selectedBreakdownGranularity === 'annual'
      ? 96
      : 16
    : isTablet
    ? 40
    : isDesktop1024 || isDesktop1280
    ? selectedBreakdownGranularity === 'annual'
      ? 168
      : selectedBreakdownGranularity === 'quarterly'
      ? 64
      : 40
    : 56;

  const handleBreakdownMetricChange = (value: string) => {
    setSelectedBreakdownMetric(value);
  };

  const handleBreakdownGranularityChange = (value: AnalyticGranularity) => {
    setSelectedBreakdownGranularity(value);
  };
  const barBorderRadius = isMobile ? 4 : 6;

  const isDisabled = selectedBreakdownMetric === 'Budget' && selectedBreakdownGranularity === 'monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedBreakdownMetric('Budget');
    setSelectedBreakdownGranularity('monthly');
  };

  const { data: budgetsAnalytics, isLoading } = useSWRImmutable(
    [selectedBreakdownGranularity, year, codePath, codePath.split('/').length + 1, budgets],
    async () =>
      getBudgetsAnalytics(
        selectedBreakdownGranularity,
        year,
        codePath,
        codePath.split('/').length + 1,
        budgets
      ) as Promise<BreakdownBudgetAnalytic>
  );

  const seriesWithoutBorder = useMemo(
    () =>
      parseAnalyticsToSeriesBreakDownChart(
        budgetsAnalytics,
        budgets,
        isLight,
        barWidth,
        selectedBreakdownMetric as AnalyticMetric
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
    const parsedSeries = allSeries.map((item) => {
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

    return setBorderRadiusForSeries(parsedSeries, barBorderRadius);
  }, [allSeries, barBorderRadius, inactiveSeries]);

  return {
    isLoading,
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
  };
};

export default useBreakdownChart;
