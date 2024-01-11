import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import {
  isCoreUnitExpense,
  isEcosystemActorExpense,
  isHeadcountExpense,
  isNonHeadcountExpense,
  mutableCombinationExpenseByAdding,
} from './utils/costBreakdown';
import { parseQuarter } from './utils/quarters';
import type { CostBreakdownFilterValue, ExtendedExpense } from './financesOverviewTypes';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

const noneBorder = [0, 0, 0, 0];
const lowerBorder = [0, 0, 6, 6];
const superiorBorder = [6, 6, 0, 0];
const fullBorder = [6, 6, 6, 6];

const useFinancesOverview = (
  quarterExpenses: ExpenseDto[] = [],
  monthly: Partial<ExpenseDto>[],
  byBudgetBreakdownExpenses: ExtendedExpense[],
  byCategoryBreakdownExpenses: ExpenseDto[]
) => {
  const sortedQuarters = useMemo(
    () =>
      quarterExpenses.sort((a, b) => {
        const [aYear, aQuarter] = parseQuarter(a.period);
        const [bYear, bQuarter] = parseQuarter(b.period);

        return aYear !== bYear ? aYear - bYear : aQuarter - bQuarter;
      }),
    [quarterExpenses]
  );
  const [selectedYear, setSelectedYear] = useState<number>(() => DateTime.local().year);

  const { isLight } = useThemeContext();
  const isDownDesktop1280 = useMediaQuery(lightTheme.breakpoints.down('desktop_1280'));
  const years = Array.from({ length: new Date().getFullYear() - 2020 }, (_, i) => 2021 + i);

  const handleChangeSelectYear = (year: number) => {
    setSelectedYear(year);
  };

  const totalExpenses = useCallback(() => {
    const valuesYearSelect = monthly.filter(
      (charValue) => DateTime.fromISO(charValue?.period || '').year === selectedYear
    );

    const actuals = valuesYearSelect.map((item) => item?.actuals) || [];
    const total = actuals?.reduce((current, next) => (current || 0) + (next || 0), 0);

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

  // cost breakdown
  const [selectedFilter, setSelectedFilter] = useState<CostBreakdownFilterValue>('By budget');

  const {
    byBudgetExpenses,
    costBreakdownTotal,
    remainingBudgetCU,
    maxValueByBudget,
    remainingBudgetDelegates,
    remainingEcosystemActors,
  } = useMemo(() => {
    let costBreakdownTotal = 0;
    const byBudgetExpenses: ExtendedExpense[] = [];
    const remainingBudgetCU = {
      shortCode: 'CU',
      name: 'Remaining Core Units',
      actuals: 0,
      budgetCap: 0,
      budget: 'makerdao/core-units',
      discontinued: 0,
      period: selectedYear.toString(),
      prediction: 0,
    } as ExtendedExpense;
    const remainingBudgetDelegates = {
      shortCode: 'DEL',
      name: 'Recognized Delegates',
      actuals: 0,
      budgetCap: 0,
      budget: 'makerdao/delegates',
      discontinued: 0,
      period: selectedYear.toString(),
      prediction: 0,
    } as ExtendedExpense;
    const remainingEcosystemActors = {
      shortCode: 'EA',
      name: 'Ecosystem Actors',
      actuals: 0,
      budgetCap: 0,
      budget: 'makerdao/ecosystem-actors',
      discontinued: 0,
      period: selectedYear.toString(),
      prediction: 0,
    } as ExtendedExpense;

    byBudgetBreakdownExpenses
      .filter((expense) => expense.period === selectedYear.toString())
      .sort((a, b) => b.actuals - a.actuals)
      .forEach((expense, index) => {
        costBreakdownTotal += expense.actuals;
        if (index < 10) {
          byBudgetExpenses.push(expense);
        } else if (isCoreUnitExpense(expense)) {
          mutableCombinationExpenseByAdding(remainingBudgetCU, expense);
        } else if (isEcosystemActorExpense(expense)) {
          mutableCombinationExpenseByAdding(remainingEcosystemActors, expense);
        } else {
          mutableCombinationExpenseByAdding(remainingBudgetDelegates, expense);
        }
      });

    const maxValueByBudget = Math.max(
      ...[...byBudgetExpenses, remainingBudgetCU, remainingBudgetDelegates, remainingEcosystemActors].map((item) =>
        Math.max(item.actuals, item.prediction)
      )
    );

    return {
      byBudgetExpenses,
      remainingBudgetCU,
      remainingEcosystemActors,
      remainingBudgetDelegates,
      maxValueByBudget,
      costBreakdownTotal,
    };
  }, [byBudgetBreakdownExpenses, selectedYear]);

  const { byCategoryExpenses, remainingCategories, maxValueByCategory } = useMemo(() => {
    const byCategoryExpenses = {
      headcount: [] as ExpenseDto[],
      nonHeadcount: [] as ExpenseDto[],
    };
    const remainingCategories = {
      category: '',
      actuals: 0,
      budgetCap: 0,
      budget: 'makerdao/delegates',
      discontinued: 0,
      period: selectedYear.toString(),
      prediction: 0,
    } as ExpenseDto;

    byCategoryBreakdownExpenses
      .filter((expense) => expense.period === selectedYear.toString())
      .sort((a, b) => b.actuals - a.actuals)
      .forEach((expense) => {
        if (isHeadcountExpense(expense)) {
          byCategoryExpenses.headcount.push(expense);
        } else if (isNonHeadcountExpense(expense) && byCategoryExpenses.nonHeadcount.length < 7) {
          byCategoryExpenses.nonHeadcount.push(expense);
        } else {
          mutableCombinationExpenseByAdding(remainingCategories, expense);
        }
      });

    const maxValueByCategory = Math.max(
      ...[...byCategoryExpenses.headcount, ...byCategoryExpenses.nonHeadcount, remainingCategories].map((item) =>
        Math.max(item.actuals, item.prediction)
      )
    );

    return {
      byCategoryExpenses,
      remainingCategories,
      maxValueByCategory,
    };
  }, [byCategoryBreakdownExpenses, selectedYear]);

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
    isDownDesktop1280,
    selectedFilter,
    setSelectedFilter,
    byBudgetExpenses,
    remainingBudgetCU,
    remainingBudgetDelegates,
    maxValueByBudget,
    byCategoryExpenses,
    remainingCategories,
    maxValueByCategory,
    costBreakdownTotal,
    remainingEcosystemActors,
  };
};

export default useFinancesOverview;
