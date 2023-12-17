import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { buildExpenseMetricsLineChartSeries } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { LineChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity, AnalyticMetric, AnalyticSeriesRow } from '@ses/core/models/interfaces/analytic';

export const useMakerDAOExpenseMetrics = (year: string) => {
  const { isLight } = useThemeContext();
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };

  // fetch actual data from the API
  const { data: analytics, error } = useSWRImmutable(['analytics', year, selectedGranularity], async () =>
    fetchAnalytics(selectedGranularity, year, 'atlas', 2)
  );

  const isLoading = !analytics && !error;

  const data = useMemo(() => {
    const data = {
      budget: [] as number[],
      forecast: [] as number[],
      actuals: [] as number[],
      onChain: [] as number[],
      offChain: [] as number[],
    };
    if (!analytics || !analytics.series) {
      return data;
    }

    // calculate the sum of all the rows for a metric
    const reduceMetric = (rows: AnalyticSeriesRow[], metric: AnalyticMetric) =>
      rows.filter((element) => element.metric === metric).reduce((acc, current) => acc + Math.abs(current.value), 0);

    analytics.series.forEach((item) => {
      data.budget.push(reduceMetric(item.rows, 'Budget'));
      data.forecast.push(reduceMetric(item.rows, 'Forecast'));
      data.actuals.push(reduceMetric(item.rows, 'Actuals'));
      data.onChain.push(reduceMetric(item.rows, 'PaymentsOnChain'));
      data.offChain.push(reduceMetric(item.rows, 'PaymentsOffChainIncluded'));
    });

    return data;
  }, [analytics]);

  // series to be "hidden" in the line chart
  const [inactiveSeries, setInactiveSeries] = useState<string[]>([]);
  const handleToggleSeries = (toggleSeries: string) => {
    setInactiveSeries(
      inactiveSeries.includes(toggleSeries)
        ? inactiveSeries.filter((series) => series !== toggleSeries)
        : [...inactiveSeries, toggleSeries]
    );
  };

  const series: LineChartSeriesData[] = useMemo(
    () => buildExpenseMetricsLineChartSeries(data, inactiveSeries, isLight),
    [data, inactiveSeries, isLight]
  );

  return {
    selectedGranularity,
    handleGranularityChange,
    isLoading,
    series,
    handleToggleSeries,
  };
};
