import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { parseQuarter } from './utils/quarters';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';

const useFinancesOverview = (quarterExpenses: ExpenseDto[] = []) => {
  const sortedQuarters = useMemo(
    () =>
      quarterExpenses.sort((a, b) => {
        const [aYear, aQuarter] = parseQuarter(a.period);
        const [bYear, bQuarter] = parseQuarter(b.period);

        return aYear !== bYear ? aYear - bYear : aQuarter - bQuarter;
      }),
    [quarterExpenses]
  );

  const [selectedYear, setSelectedYear] = useState<number>(() => DateTime.local().minus({ year: 1 }).year);
  const { isLight } = useThemeContext();
  const years = [2021, 2022, 2023];

  const handleChangeSelectYear = (year: number) => {
    setSelectedYear(year);
  };
  return {
    isLight,
    sortedQuarters,
    selectedYear,
    years,
    handleChangeSelectYear,
  };
};

export default useFinancesOverview;
