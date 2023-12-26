import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from '../Finances/components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from '../Finances/components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from '../Finances/components/SectionPages/CardChartOverview/useCardChartOverview';
import { getTotalAllMetricsBudget } from '../Finances/components/SectionPages/CardChartOverview/utils';
import { useDelegateExpenseTrendFinances } from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { useMakerDAOExpenseMetrics } from '../Finances/components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  getBudgetsAnalytics,
  getLevelOfBudget,
  newBudgetMetric,
  prefixToRemove,
  removePrefix,
} from '../Finances/utils/utils';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';

import type { Budget } from '@ses/core/models/interfaces/budget';

export const useEndgameBudgetContainerSecondLevel = (budgets: Budget[], initialYear: string, allBudgets: Budget[]) => {
  const { isLight } = useThemeContext();
  const [year, setYear] = useState(initialYear);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const levelPath = 'atlas/' + router.query.firstPath?.toString();

  const { data: budgetsAnalytics } = useSWRImmutable(
    ['analytics/annual', levelPath],
    async () =>
      getBudgetsAnalytics(
        'annual',
        year,
        levelPath,
        getLevelOfBudget(levelPath),
        budgets
      ) as Promise<BreakdownBudgetAnalytic>
  );
  const { data: budgetsAnalyticsQuarterly } = useSWRImmutable(
    ['analytics/quarterly', levelPath],
    async () =>
      getBudgetsAnalytics(
        'quarterly',
        year,
        levelPath,
        getLevelOfBudget(levelPath),
        budgets
      ) as Promise<BreakdownBudgetAnalytic>
  );
  const { data: budgetsAnalyticsMonthly } = useSWRImmutable(
    ['analytics/monthly', levelPath],
    async () =>
      getBudgetsAnalytics(
        'monthly',
        year,
        levelPath,
        getLevelOfBudget(levelPath),
        budgets
      ) as Promise<BreakdownBudgetAnalytic>
  );

  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);

  // Show total of all the metric of actual budget
  const allMetrics = getTotalAllMetricsBudget(budgetsAnalytics);

  const cardsNavigationInformation = budgets.map((item, index) => {
    const budgetMetric =
      budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
        ? budgetsAnalytics[item.codePath]
        : [newBudgetMetric()];

    return {
      image: item.image || '',
      title: removePrefix(item.name, prefixToRemove),
      description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
      href: `${siteRoutes.newFinancesOverview}/${item.codePath.replace('atlas/', '')}?year=${year}`,
      valueDai: budgetMetric[0].budget.value,
      totalDai: allMetrics.budget,
      color: isLight ? colorsLight[index] : colorsDark[index],
    };
  });
  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);

  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };
  const cardsToShow = loadMoreCards ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

  // Hooks for Doughnut Series
  const {
    filters,
    filterSelected,
    handleSelectFilter,
    doughnutSeriesData,
    actuals,
    budgetCap,
    prediction,
    changeAlignment,
  } = useCardChartOverview(budgets, budgetsAnalytics);

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(
    budgets,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    budgetsAnalytics
  );

  // Hooks Logic of Table Second Level
  const breakdownTableSecondLevel = useBreakdownTable(year, budgets, allBudgets);

  const expenseReportSection = useDelegateExpenseTrendFinances();

  const levelBudget = allBudgets.find((budget) => budget.codePath === levelPath);
  const title = removePrefix(levelBudget?.name || '', prefixToRemove) || '';

  const icon = levelBudget?.image || '';
  const handleChangeYearsEndgameAtlasBudget = (value: string) => {
    setYear(value);
    router.push(
      {
        pathname: `${siteRoutes.newFinancesOverview}/[firstPath]`,
        query: {
          firstPath: router.query.firstPath,
          year: value,
        },
      }
      /* undefined,
      { shallow: true } */
    );
  };

  useEffect(() => {
    mutate('analytics/annual');
  }, [mutate, year]);

  const breadcrumbs = [title];

  const trailingAddressDesk = [
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}?year=${year}`,
    },
    ...breadcrumbs.map((adr) => ({
      label: adr,
      url: router.asPath,
    })),
  ];
  const trailingAddress = [
    ...breadcrumbs.map((adr) => ({
      label: adr,
      url: router.asPath,
      style: { color: isLight ? '#25273D' : '#D2D4EF' },
    })),
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}?year=${year}`,
    },
  ];

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics(year);

  useEffect(() => {
    mutate(['analytics/annual', levelPath]);
    mutate(['analytics/quarterly', levelPath]);
    mutate(['analytics/monthly', levelPath]);
  }, [levelPath, mutate, year]);

  return {
    breadcrumbs,
    trailingAddressDesk,
    handleChangeYearsEndgameAtlasBudget,
    year,
    trailingAddress,
    title,
    icon,
    filters,
    filterSelected,
    doughnutSeriesData,
    ...breakdownChartSectionData,
    actuals,
    budgetCap,
    prediction,
    handleSelectFilter,
    cardsNavigationInformation,
    handleLoadMoreCards,
    loadMoreCards,
    cardsToShow,
    changeAlignment,

    makerDAOExpensesMetrics,
    expenseReportSection,
    breakdownTableSecondLevel,
  };
};
