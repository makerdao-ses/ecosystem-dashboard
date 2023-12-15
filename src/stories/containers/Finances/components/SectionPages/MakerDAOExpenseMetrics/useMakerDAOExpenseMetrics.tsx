import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import type { AnalyticGranularity, AnalyticMetric, AnalyticSeriesRow } from '@ses/core/models/interfaces/analytic';

export const useMakerDAOExpenseMetrics = (year: string) => {
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };

  const { data: analytics, error } = useSWRImmutable(['analytics', year, selectedGranularity], async () =>
    fetchAnalytics(selectedGranularity, year, 'atlas', 2)
  );

  const data = useMemo(() => {
    const data = {
      budget: [] as { value: number }[],
      forecast: [] as { value: number }[],
      actuals: [] as { value: number }[],
      onChain: [] as { value: number }[],
      offChain: [] as { value: number }[],
    };
    if (!analytics || !analytics.series) {
      return data;
    }

    const reduceMetric = (rows: AnalyticSeriesRow[], metric: AnalyticMetric) =>
      rows.filter((element) => element.metric === metric).reduce((acc, current) => acc + Math.abs(current.value), 0);

    analytics.series.forEach((item) => {
      data.budget.push({
        value: reduceMetric(item.rows, 'Budget'),
      });
      data.forecast.push({
        value: reduceMetric(item.rows, 'Forecast'),
      });
      data.actuals.push({
        value: reduceMetric(item.rows, 'Actuals'),
      });
      data.onChain.push({
        value: reduceMetric(item.rows, 'PaymentsOnChain'),
      });
      data.offChain.push({
        value: reduceMetric(item.rows, 'PaymentsOffChainIncluded'),
      });
    });

    return data;
  }, [analytics]);

  console.log(data);

  const newBudget = data?.budget;
  const newForecast = data?.forecast;
  const newActuals = data?.actuals;
  const newNetExpensesOnChain = data?.onChain;
  const newNetExpensesOffChain = data?.offChain;

  const isLoading = !analytics && !error;

  return {
    selectedGranularity,
    handleGranularityChange,
    isLoading,
    newActuals,
    newBudget,
    newForecast,
    newNetExpensesOffChain,
    newNetExpensesOnChain,
  };
};
