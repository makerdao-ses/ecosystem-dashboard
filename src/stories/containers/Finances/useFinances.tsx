import { useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { getTotalAllMetricsBudget } from './components/SectionPages/CardChartOverview/utils';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { useMakerDAOExpenseMetrics } from './components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import { useReservesWaterFallChart } from './components/SectionPages/ReservesWaterFallChartSection/useReservesWaterFallChart';
import {
  getBudgetsAnalytics,
  newBudgetMetric,
  generateColorPalette,
  existingColors,
  existingColorsDark,
  nameChanged,
} from './utils/utils';
import type { Theme } from '@mui/material';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useFinances = (budgets: Budget[], allBudgets: Budget[], initialYear: string) => {
  const [isEnabled] = useFlagsActive();
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const router = useRouter();
  // TODO: this should not be used, instead we should use different keys to use different data/params
  const { mutate } = useSWRConfig();
  const [year, setYear] = useState(initialYear);

  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelNumber = codePath.split('/').length;
  const levelOfDetail = levelNumber + 1;
  const currentBudget = allBudgets.find((budget) => budget.codePath === codePath);
  const icon = currentBudget?.image;
  const title = nameChanged(currentBudget?.name || '');

  const handleChangeYears = (value: string) => {
    setYear(value);
    router.push(
      `${siteRoutes.finances(codePath.split('/').slice(1, levelNumber).join('/'))}?year=${value}`,
      undefined,
      { shallow: true }
    );
  };

  // TODO: we should be using only one query and refetch the data depending on the selected granularity
  const { data: budgetsAnalytics } = useSWRImmutable(
    'analytics/annual',
    async () =>
      getBudgetsAnalytics('annual', year, codePath, levelOfDetail, budgets) as Promise<BreakdownBudgetAnalytic>
  );
  const { data: budgetsAnalyticsQuarterly } = useSWRImmutable(
    'analytics/quarterly',
    async () =>
      getBudgetsAnalytics('quarterly', year, codePath, levelOfDetail, budgets) as Promise<BreakdownBudgetAnalytic>
  );
  const { data: budgetsAnalyticsMonthly } = useSWRImmutable(
    'analytics/monthly',
    async () =>
      getBudgetsAnalytics('monthly', year, codePath, levelOfDetail, budgets) as Promise<BreakdownBudgetAnalytic>
  );

  // generate the breadcrumb routes
  const { trailingAddressMobile, trailingAddressDesktop } = useMemo(() => {
    const segmentedCodePath = codePath.split('/');
    const trailingAddressDesktop: NavigationBreadcrumb[] = [];
    // build the breadcrumb url
    segmentedCodePath.forEach((item, index) => {
      if (item === 'atlas') {
        // it is the first level
        trailingAddressDesktop.push({
          label: 'Finances',
          url: `${siteRoutes.finances()}?year=${year}`,
        });
      } else {
        // it is a deeper level
        trailingAddressDesktop.push({
          label: nameChanged(
            allBudgets.find((budget) => budget.codePath === segmentedCodePath.slice(0, index + 1).join('/'))?.name || ''
          ),
          url: `${siteRoutes.finances(segmentedCodePath.slice(1, index + 1).join('/'))}?year=${year}`,
        });
      }
    });

    const trailingAddressMobile = [...trailingAddressDesktop].reverse();
    trailingAddressMobile[0] = {
      ...trailingAddressMobile[0],
      style: { color: isLight ? '#25273D' : '#D2D4EF' },
    };

    return {
      trailingAddressDesktop,
      trailingAddressMobile,
    };
  }, [allBudgets, codePath, isLight, year]);

  const allMetrics = getTotalAllMetricsBudget(budgetsAnalytics);

  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);

  // All the logic required by the CardNavigation section
  const cardsNavigationInformation = budgets.map((item, index) => {
    const budgetMetric =
      budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
        ? budgetsAnalytics[item.codePath]
        : [newBudgetMetric()];

    return {
      image: item.image || '/assets/img/default-icon-cards-budget.svg',
      codePath: item.codePath,
      title: nameChanged(item.name),
      description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
      href: `${siteRoutes.finances(item.codePath.replace('atlas/', ''))}?year=${year}`,
      valueDai: budgetMetric[0].budget.value,
      totalDai: allMetrics.budget,
      code: item.code,
      color: isLight ? colorsLight[index] : colorsDark[index],
    };
  });

  // if there too many cards we need to use a swiper on desktop but paginated on mobile
  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);
  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };

  // pagination only happens on mobile devices
  const cardsToShow = loadMoreCards && isMobile ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

  // All the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(
    budgets,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    budgetsAnalytics
  );

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useDelegateExpenseTrendFinances('atlas');

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview(budgets, budgetsAnalytics, levelNumber);

  // All the logic required by the BreakdownTable section
  const breakdownTable = useBreakdownTable(year, budgets, allBudgets);

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics(year);

  // All the logic for the Reserve Chart
  // This should be calculate

  const reserveChart = useReservesWaterFallChart(codePath, budgets, allBudgets);

  // invalidate cache and refetch all sections when year changes
  useEffect(() => {
    mutate('analytics/annual');
    mutate('analytics/quarterly');
    mutate('analytics/monthly');
  }, [mutate, year, codePath]);

  return {
    isEnabled,
    year,
    levelNumber,
    icon,
    title,
    trailingAddressMobile,
    trailingAddressDesktop,
    handleChangeYears,
    cardOverViewSectionData,
    router,
    cardsToShow,
    breakdownChartSectionData,
    breakdownTable,
    loadMoreCards,
    handleLoadMoreCards,
    makerDAOExpensesMetrics,
    expenseReportSection: expenseTrendFinances,
    reserveChart,
  };
};
