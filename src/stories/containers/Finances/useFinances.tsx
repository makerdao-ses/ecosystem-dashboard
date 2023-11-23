import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { useMakerDAOExpenseMetrics } from './components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import { prefixToRemove, removePrefix } from './utils/utils';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useFinances = (budgets: Budget[], initialYear: string, budgetsAnalytics: BudgetAnalytic[]) => {
  console.log(budgetsAnalytics); // temporary
  const { isLight } = useThemeContext();
  const colors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
  const colorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];
  const router = useRouter();

  const cardsNavigationInformation = budgets.map((item, index) => {
    const budgetMetric = budgetsAnalytics.find((ba) => ba.codePath === item.codePath);

    return {
      image: item.image || '',
      title: removePrefix(item.name, prefixToRemove),
      description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
      href: `/finances/${item.codePath.replace('atlas/', '')}`,
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
  const breakdownTable = useBreakdownTable(initialYear);

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics();

  return {
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
