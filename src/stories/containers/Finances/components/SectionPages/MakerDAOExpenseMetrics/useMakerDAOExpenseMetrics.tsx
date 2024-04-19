import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { buildExpenseMetricsLineChartSeries } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
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
  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelOfDetail = codePath.split('/').length + 1;

  // fetch actual data from the API
  const { data: analytics, error } = useSWRImmutable([selectedGranularity, year, codePath, levelOfDetail], async () =>
    fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const isLoading = !analytics && !error;

  const data = useMemo(() => {
    const data = {
      budget: [] as number[],
      forecast: [] as number[],
      actuals: [] as number[],
      onChain: [] as number[],
      protocolNetOutflow: [] as number[],
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
      rows.filter((element) => element.metric === metric).reduce((acc, current) => acc + current.value, 0);

    // some metrics can be added if they're from future dates
    const currentDate = DateTime.utc();
    const isCurrentYear = currentDate.year === parseInt(year, 10);
    const canAddItem = (index: number) => {
      if (!isCurrentYear) return true;

      if (selectedGranularity === 'monthly') return index < currentDate.month;
      if (selectedGranularity === 'quarterly') return index < currentDate.quarter;

      return true;
    };

    analytics.series.forEach((item, index) => {
      data.budget.push(reduceMetric(item.rows, 'Budget'));
      data.forecast.push(reduceMetric(item.rows, 'Forecast'));

      if (canAddItem(index)) {
        data.actuals.push(reduceMetric(item.rows, 'Actuals'));
        data.onChain.push(reduceMetric(item.rows, 'PaymentsOnChain'));
        data.protocolNetOutflow.push(reduceMetric(item.rows, 'ProtocolNetOutflow'));
      }
    });

    return data;
  }, [analytics, selectedGranularity, year]);

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
    () => buildExpenseMetricsLineChartSeries(data, inactiveSeries, isLight, selectedGranularity),
    [data, inactiveSeries, isLight, selectedGranularity]
  );

  return {
    selectedGranularity,
    handleGranularityChange,
    isLoading,
    series,
    handleToggleSeries,
  };
};
