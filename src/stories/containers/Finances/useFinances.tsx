import { siteRoutes } from '@ses/config/routes';
import { useBudgetContext } from '@ses/core/context/BudgetContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { getTotalAllMetricsBudget } from './components/SectionPages/CardChartOverview/utils';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { useMakerDAOExpenseMetrics } from './components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import {
  getBudgetsAnalytics,
  newBudgetMetric,
  removePrefix,
  prefixToRemove,
  generateColorPalette,
  existingColors,
  existingColorsDark,
} from './utils/utils';
import type { BudgetAnalytic, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useFinances = (budgets: Budget[], initialYear: string) => {
  const router = useRouter();
  const { allBudgets } = useBudgetContext();
  const { mutate } = useSWRConfig();
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const allMetrics = getTotalAllMetricsBudget(budgetsAnalytics);

  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);

  const cardsNavigationInformation = budgets
    .map((item, index) => {
      const budgetMetric =
        budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
          ? budgetsAnalytics[item.codePath]
          : newBudgetMetric();

      return {
        image: item.image || '',
        title: removePrefix(item.name, prefixToRemove),
        description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
        href: `${siteRoutes.newFinancesOverview}/${item.codePath.replace('atlas/', '')}`,
        valueDai: budgetMetric.budget.value,
        totalDai: allMetrics.budget,
        color: isLight ? colorsLight[index] : colorsDark[index],
      };
    })
    .filter((item) => item.title !== 'Example budget code' && item.title !== 'Other');
  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);

  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };
  const cardsToShow = loadMoreCards ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

  // All the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(
    budgets,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    budgetsAnalytics
  );

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useDelegateExpenseTrendFinances();

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview(budgets, budgetsAnalytics);

  // All the logic required by the BreakdownTable section
  const breakdownTable = useBreakdownTable(year, budgets, allBudgets);

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics(year);

  // invalidate cache and refetch all sections when year changes
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
    cardsToShow,
    ...breakdownChartSectionData,
    breakdownTable,
    loadMoreCards,
    handleLoadMoreCards,
    makerDAOExpensesMetrics,
    expenseReportSection: expenseTrendFinances,
  };
};
