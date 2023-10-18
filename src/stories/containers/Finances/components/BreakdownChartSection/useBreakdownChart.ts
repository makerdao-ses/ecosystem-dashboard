import { useState } from 'react';

const useBreakdownChart = () => {
  const [selectedBreakdownMetric, setSelectedBreakdownMetric] = useState<string>('Budget');
  const [selectedBreakdownGranularity, setSelectedBreakdownGranularity] = useState<string>('Monthly');

  const handleBreakdownMetricChange = (value: string) => setSelectedBreakdownMetric(value);
  const handleBreakdownGranularityChange = (value: string) => setSelectedBreakdownGranularity(value);

  return {
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
  };
};

export default useBreakdownChart;
