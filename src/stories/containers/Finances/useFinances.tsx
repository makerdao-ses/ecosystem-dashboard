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
import { getBudgetsAnalytics, newBudgetMetric, removePrefix, prefixToRemove, colors, colorsDark } from './utils/utils';
import type { BudgetAnalytic, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useFinances = (budgets: Budget[], initialYear: string) => {
  const [year, setYear] = useState(initialYear);
  const { isLight } = useThemeContext();
  const handleChangeYears = (value: string) => {
    setYear(value);
    router.push(`${siteRoutes.newFinancesOverview}?year=${value}`, undefined, { shallow: true });
  };

  const { data: budgetsAnalytics } = useSWRImmutable(
    'analytics/annual',
    async () => getBudgetsAnalytics('annual', year, 'atlas', 2, budgets) as Promise<BudgetAnalytic>
  );
  const { data: budgetsAnalyticsSemiAnnual } = useSWRImmutable(
    'analytics/semiAnnual',
    async () => getBudgetsAnalytics('semiAnnual', year, 'atlas', 2, budgets) as Promise<BreakdownBudgetAnalytic>
  );
  const { data: budgetsAnalyticsQuarterly } = useSWRImmutable(
    'analytics/quarterly',
    async () => getBudgetsAnalytics('quarterly', year, 'atlas', 2, budgets) as Promise<BreakdownBudgetAnalytic>
  );
  const { data: budgetsAnalyticsMonthly } = useSWRImmutable(
    'analytics/monthly',
    async () => getBudgetsAnalytics('monthly', year, 'atlas', 2, budgets) as Promise<BreakdownBudgetAnalytic>
  );
  console.log(budgetsAnalyticsSemiAnnual); // temporary
  console.log(budgetsAnalyticsQuarterly); // temporary
  console.log(budgetsAnalyticsMonthly); // temporary
  const { mutate } = useSWRConfig();

  const router = useRouter();

  const cardsNavigationInformation = budgets.map((item, index) => {
    const budgetMetric =
      budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
        ? budgetsAnalytics[item.codePath]
        : newBudgetMetric();

    return {
      image: item.image || '',
      title: removePrefix(item.name, prefixToRemove),
      description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
      href: `${siteRoutes.newFinancesOverview}/${item.codePath.replace('atlas/', '')}`,
      valueDai: budgetMetric.actuals.value,
      totalDai: budgetMetric.budget.value,
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
    mutate('analytics/semiAnnual');
    mutate('analytics/quarterly');
    mutate('analytics/monthly');
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
