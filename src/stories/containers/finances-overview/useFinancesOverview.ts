import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useState } from 'react';
import type { SeriesDataApi } from '@ses/core/models/dto/chart.dto';

const useFinancesOverview = () => {
  const [selectedYear, setSelectedYear] = useState<number>(() => DateTime.local().minus({ year: 1 }).year);
  const { isLight } = useThemeContext();
  const years = [2021, 2022, 2023];

  const handleChangeSelectYear = (year: number) => {
    setSelectedYear(year);
  };
  // implement function to process data from APi for the chart
  const processDataPerMonth = (charValues: SeriesDataApi[], year: DateTime) => {
    const valuesYearSelect = charValues.filter((charValue) => DateTime.fromISO(charValue.period).year === year.year);
    const prediction = valuesYearSelect.map((item) => item.prediction);
    const actuals = valuesYearSelect.map((item) => item.actuals);
    const discontinued = valuesYearSelect.map((item) => item.discontinued);
    return {
      prediction,
      actuals,
      discontinued,
    };
  };

  return {
    isLight,
    selectedYear,
    years,
    handleChangeSelectYear,
    processDataPerMonth,
  };
};

export default useFinancesOverview;
