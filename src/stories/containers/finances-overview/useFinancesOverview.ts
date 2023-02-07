import { useThemeContext } from '@ses/core/context/ThemeContext';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { parseQuarter } from './utils/quarters';
import type { SeriesDataApi } from '@ses/core/models/dto/chart.dto';
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

  const mockData = [
    {
      period: '2023-01',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 13512500.0,
    },
    {
      period: '2023-02',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-03',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 12465122.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-04',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 1230000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-05',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 34234343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-06',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 23234343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-07',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 4451000.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-08',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 23212343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-09',
      budget: '/makerdao/core-units',
      prediction: 13512500.0,
      actuals: 3234343.0,
      discontinued: 15132650.0,
    },
    {
      period: '2023-10',
      budget: '/makerdao/core-units',
      prediction: 0.0,
      actuals: 1934343.0,
      discontinued: 3932650.0,
    },
    {
      period: '2023-11',
      budget: '/makerdao/core-units',
      prediction: 0,
      actuals: 3334343.0,
      discontinued: 433432,
    },
    {
      period: '2023-12',
      budget: '/makerdao/core-units',
      prediction: 41345123.0,
      actuals: 34545456,
      discontinued: 0,
    },
  ];

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

  const valuesForChart = processDataPerMonth(mockData, DateTime.fromISO('2023-01'));
  const noneBorder = [0, 0, 0, 0];
  const lowerBorder = [0, 0, 6, 6];
  const superiorBorder = [6, 6, 0, 0];
  const fullBorder = [16, 16, 46, 46];

  const newActual = valuesForChart.actuals.map((item, index: number) => ({
    name: 'Active Budget',
    value: item,
    itemStyle: {
      borderRadius:
        valuesForChart.discontinued[index] === 0 && valuesForChart.prediction[index] === 0 ? fullBorder : lowerBorder,
    },
  }));

  const newDiscontinued = valuesForChart.discontinued.map((item, index: number) => ({
    name: 'Discontinued',
    value: item,
    itemStyle: {
      borderRadius:
        valuesForChart.actuals[index] === 0 && valuesForChart.prediction[index] === 0
          ? fullBorder
          : valuesForChart.actuals[index] !== 0 && valuesForChart.prediction[index] !== 0
          ? noneBorder
          : valuesForChart.actuals[index] !== 0 && valuesForChart.prediction[index] === 0
          ? superiorBorder
          : lowerBorder,
    },
  }));

  const newPrediction = valuesForChart.prediction.map((item, index: number) => ({
    name: 'Expense forecasts',
    value: item,
    itemStyle: {
      borderRadius:
        valuesForChart.actuals[index] === 0 && valuesForChart.prediction[index] === 0 ? fullBorder : superiorBorder,
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
  };
};

export default useFinancesOverview;
