import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
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

  const series: LineChartSeriesData[] = useMemo(() => {
    const disabled = {
      Budget: inactiveSeries.includes('Budget'),
      Forecast: inactiveSeries.includes('Forecast'),
      Actuals: inactiveSeries.includes('Actuals'),
      'Net Expenses On-chain': inactiveSeries.includes('Net Expenses On-chain'),
      'Net Expenses Off-chain': inactiveSeries.includes('Net Expenses Off-chain'),
    };

    return [
      {
        name: 'Budget',
        data: disabled.Budget ? [] : data?.budget,
        type: 'line',
        itemStyle: {
          color: disabled.Budget ? '#ccc' : isLight ? '#F99374' : '#F77249',
        },
        isVisible: !disabled.Budget,
      },
      {
        name: 'Forecast',
        data: disabled.Forecast ? [] : data?.forecast,
        type: 'line',
        itemStyle: {
          color: disabled.Forecast ? '#ccc' : isLight ? '#447AFB' : '#447AFB',
        },
        isVisible: !disabled.Forecast,
      },
      {
        name: 'Actuals',
        data: disabled.Actuals ? [] : data?.actuals,
        type: 'line',
        itemStyle: {
          color: disabled.Actuals ? '#ccc' : isLight ? '#2DC1B1' : '#1AAB9B',
        },
        isVisible: !disabled.Actuals,
      },
      {
        name: 'Net Expenses On-chain',
        data: disabled['Net Expenses On-chain'] ? [] : data?.onChain,
        type: 'line',
        itemStyle: {
          color: disabled['Net Expenses On-chain'] ? '#ccc' : isLight ? '#FBCC5F' : '#FDC134',
        },
        isVisible: !disabled['Net Expenses On-chain'],
      },
      {
        name: 'Net Expenses Off-chain',
        data: disabled['Net Expenses Off-chain'] ? [] : data?.offChain,
        type: 'line',
        itemStyle: {
          color: disabled['Net Expenses Off-chain'] ? '#ccc' : isLight ? '#7C6B95' : '#6C40AA',
        },
        isVisible: !disabled['Net Expenses Off-chain'],
      },
    ];
  }, [data?.actuals, data?.budget, data?.forecast, data?.offChain, data?.onChain, inactiveSeries, isLight]);

  return {
    selectedGranularity,
    handleGranularityChange,
    isLoading,
    series,
    handleToggleSeries,
  };
};
