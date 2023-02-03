import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useState } from 'react';

const useFinancesOverview = () => {
  const actualYear = DateTime.local().minus({ year: 1 }).year;
  const [year, setYear] = useState<number>(actualYear);
  const { isLight } = useThemeContext();
  const years = [2021, 2022, 2023];

  const handleChangeSelectYear = (year: number) => {
    setYear(year);
  };
  return {
    isLight,
    year,
    setYear,
    years,
    handleChangeSelectYear,
  };
};

export default useFinancesOverview;
