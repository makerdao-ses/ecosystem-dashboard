import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { buildExpenseMetricsLineChartSeries } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
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

  const router = useRouter();
  const secondLevel = router.query.firstPath?.toString();
  const thirdLevel = router.query.secondPath?.toString();
  const path = `atlas${secondLevel ? `/${secondLevel}${thirdLevel ? `/${thirdLevel}` : ''}` : ''}`;

  // fetch actual data from the API
  const { data: analytics, error } = useSWRImmutable([selectedGranularity, year, path, 2], async () =>
    fetchAnalytics(selectedGranularity, year, path, 2)
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
    if (!analytics || !analytics.series?.length) {
      // return 0 values to avoid having an empty UI
      Object.keys(data).forEach((key) => {
        data[key as keyof typeof data] = Array(
          selectedGranularity === 'monthly' ? 12 : selectedGranularity === 'quarterly' ? 4 : 1
        ).fill(0);
      });
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
  }, [analytics, selectedGranularity]);

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
