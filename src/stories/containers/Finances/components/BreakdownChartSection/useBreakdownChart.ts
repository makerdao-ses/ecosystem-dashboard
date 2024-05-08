import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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

const useBreakdownChart = (budgets: Budget[], year: string, codePath: string, allBudgets: Budget[]) => {
  const { isLight } = useThemeContext();
  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Budget');
  const refBreakDownChart = useRef<EChartsOption | null>(null);
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesktop1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));
  const barWidth = isMobile
    ? selectedGranularity === 'quarterly'
      ? 32
      : selectedGranularity === 'annual'
      ? 96
      : 16
    : isTablet
    ? 40
    : isDesktop1024 || isDesktop1280
    ? selectedGranularity === 'annual'
      ? 168
      : selectedGranularity === 'quarterly'
      ? 64
      : 40
    : 56;

  const handleMetricChange = (value: AnalyticMetric) => {
    setSelectedMetric(value);
  };

  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };
  const barBorderRadius = isMobile ? 2 : 4;

  const isDisabled = selectedMetric === 'Budget' && selectedGranularity === 'monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedMetric('Budget');
    setSelectedGranularity('monthly');
  };

  const { data: budgetsAnalytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, codePath.split('/').length + 1, budgets],
    async () =>
      getBudgetsAnalytics(
        selectedGranularity,
        year,
        codePath,
        codePath.split('/').length + 1,
        budgets
      ) as Promise<BreakdownBudgetAnalytic>
  );

  const allSeries = useMemo(() => {
    const seriesWithoutBorder = parseAnalyticsToSeriesBreakDownChart(
      budgetsAnalytics,
      budgets,
      isLight,
      barWidth,
      selectedMetric,
      allBudgets
    );

    const series = setBorderRadiusForSeries(seriesWithoutBorder, barBorderRadius);
    // sort the series by the sum of the values in descending order
    return series.sort((a, b) => {
      const sumA = a.data.reduce((acc, cur) => acc + (cur.value ?? 0), 0);
      const sumB = b.data.reduce((acc, cur) => acc + (cur.value ?? 0), 0);
      return sumB - sumA;
    });
  }, [allBudgets, barBorderRadius, barWidth, budgets, budgetsAnalytics, isLight, selectedMetric]);

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
    selectedMetric,
    selectedGranularity,
    handleMetricChange,
    handleGranularityChange,
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
