import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useState } from 'react';

const useFinancesOverview = () => {
  const [selectedYear, setSelectedYear] = useState<number>(() => DateTime.local().minus({ year: 1 }).year);
  const { isLight } = useThemeContext();
  const years = [2021, 2022, 2023];

  const handleChangeSelectYear = (year: number) => {
    setSelectedYear(year);
  };
  return {
    isLight,
    selectedYear,
    years,
    handleChangeSelectYear,
  };
};

export default useFinancesOverview;
