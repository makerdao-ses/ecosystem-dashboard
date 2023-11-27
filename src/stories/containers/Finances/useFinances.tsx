import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { useMakerDAOExpenseMetrics } from './components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import { getBudgetsAnalytics, prefixToRemove, removePrefix } from './utils/utils';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useFinances = (budgets: Budget[], initialYear: string) => {
  const [year, setYear] = useState(initialYear);
  const handleChangeYears = (value: string) => {
    setYear(value);
    router.push(`${siteRoutes.newFinancesOverview}?year=${value}`, undefined, { shallow: true });
  };

  const { data: budgetsAnalytics } = useSWRImmutable('analytics/annual', () =>
    getBudgetsAnalytics('annual', year, 'atlas', 2)
  );
  const { mutate } = useSWRConfig();

  const { isLight } = useThemeContext();
  const colors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
  const colorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];
  const router = useRouter();

  const cardsNavigationInformation = budgets.map((item, index) => {
    const budgetMetric = budgetsAnalytics?.find((ba) => ba.codePath === item.codePath);

    return {
      image: item.image || '',
      title: removePrefix(item.name, prefixToRemove),
      description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
      href: `${siteRoutes.newFinancesOverview}/${item.codePath.replace('atlas/', '')}`,
      totalDai: budgetMetric?.metric.budget.value,
      valueDai: budgetMetric?.metric.actuals.value,
      color: isLight ? colors[index] : colorsDark[index],
    };
  });
  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);

  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };
  const cardsToShow = loadMoreCards ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

  // All the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart();

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useDelegateExpenseTrendFinances();

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview(budgets, budgetsAnalytics);

  // All the logic required by the BreakdownTable section
  const breakdownTable = useBreakdownTable();

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics();

  useEffect(() => {
    mutate('analytics/annual');
  }, [mutate, year]);

  return {
    year,
    handleChangeYears,
    ...cardOverViewSectionData,
    router,
    isLight,
    cardsToShow,
    ...breakdownChartSectionData,
    ...expenseTrendFinances,
    ...breakdownTable,
    ...makerDAOExpensesMetrics,
    loadMoreCards,
    handleLoadMoreCards,
  };
};
