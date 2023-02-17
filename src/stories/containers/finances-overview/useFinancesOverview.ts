import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import { parseQuarter } from './utils/quarters';
import type { ExpenseDto } from '@ses/core/models/dto/expenses.dto';

const noneBorder = [0, 0, 0, 0];
const lowerBorder = [0, 0, 6, 6];
const superiorBorder = [6, 6, 0, 0];
const fullBorder = [6, 6, 6, 6];

const useFinancesOverview = (quarterExpenses: ExpenseDto[] = [], monthly: Partial<ExpenseDto>[]) => {
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
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const years = [2021, 2022, 2023];

  const handleChangeSelectYear = (year: number) => {
    setSelectedYear(year);
  };

  const totalExpenses = useCallback(() => {
    const valuesYearSelect = monthly.filter(
      (charValue) => DateTime.fromISO(charValue?.period || '').year === selectedYear
    );

    const prediction = valuesYearSelect.map((item) => item?.prediction) || [];
    const total = prediction?.reduce((current, next) => (current || 0) + (next || 0), 0);

    return Math.trunc(total || 0);
  }, [monthly, selectedYear]);

  const fillArrayWhenNoData = useCallback((series: { period: string; value: number }[]) => {
    const filledArr = new Array<{ period: string; value: number }>(12);

    const filledArray = [...filledArr].map((item, index) => ({
      value: 0,
      period: index.toString(),
    }));

    const monthWithData = series.map((item, index) => ({
      value: item.value,
      period: Number(DateTime.fromISO(item.period || '').month) || index,
    }));
    monthWithData.forEach((itemY, index) => {
      filledArray[itemY.period - 1] = {
        value: itemY.value,
        period: itemY.period.toString() ? itemY.period.toString() : index.toString(),
      };
    });
    return filledArray;
  }, []);
  // implement function to process data from APi for the chart
  const processDataPerMonth = useCallback(() => {
    const valuesYearSelect = monthly.filter(
      (charValue) => DateTime.fromISO(charValue?.period || '').year === selectedYear
    );

    const discontinued = fillArrayWhenNoData(
      valuesYearSelect.map((item) => ({
        value: item.discontinued || 0,
        period: item.period || '',
      }))
    );
    const actuals = fillArrayWhenNoData(
      valuesYearSelect.map((item) => ({
        value: (item.actuals ?? 0) - (item.discontinued ?? 0) < 0 ? 0 : (item.actuals ?? 0) - (item.discontinued ?? 0),

        period: item.period || '',
      }))
    );
    const prediction = fillArrayWhenNoData(
      valuesYearSelect.map((item) => ({
        value: (item.prediction ?? 0) - (item?.actuals ?? 0) < 0 ? 0 : (item.prediction ?? 0) - (item.actuals ?? 0),
        period: item.period || '',
      }))
    );
    return {
      prediction,
      actuals,
      discontinued,
    };
  }, [fillArrayWhenNoData, monthly, selectedYear]);

  const valuesForChart = processDataPerMonth();

  const newActual = valuesForChart.actuals.map((item, index: number) => ({
    value: item.value,
    itemStyle: {
      borderRadius:
        valuesForChart.discontinued[index].value === 0 && valuesForChart.prediction[index].value === 0
          ? fullBorder
          : lowerBorder,
    },
  }));

  const newDiscontinued = valuesForChart.discontinued.map((item, index: number) => ({
    value: item.value,
    itemStyle: {
      borderRadius:
        valuesForChart.actuals[index].value === 0 && valuesForChart.prediction[index].value === 0
          ? fullBorder
          : valuesForChart.actuals[index].value !== 0 && valuesForChart.prediction[index].value !== 0
          ? noneBorder
          : valuesForChart.actuals[index].value !== 0 && valuesForChart.prediction[index].value === 0
          ? superiorBorder
          : lowerBorder,
    },
  }));

  const newPrediction = valuesForChart.prediction.map((item, index: number) => ({
    value: item.value,
    itemStyle: {
      borderRadius:
        valuesForChart.actuals[index].value === 0 && valuesForChart.discontinued[index].value === 0
          ? fullBorder
          : superiorBorder,
    },
  }));

  return {
    isLight,
    sortedQuarters,
    selectedYear,
    years,
    handleChangeSelectYear,
    processDataPerMonth,
    newDiscontinued,
    newPrediction,
    newActual,
    totalExpenses,
    isMobile,
    isTable,
  };
};

export default useFinancesOverview;
