import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from '../Finances/components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from '../Finances/components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from '../Finances/components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
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
import type { BreakdownBudgetAnalytic, BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export const useEndgameBudgetContainerThirdLevel = (budgets: Budget[], initialYear: string, allBudgets: Budget[]) => {
  const router = useRouter();
  const levelPath = 'atlas/' + router.query.firstPath?.toString() + '/' + router.query.secondPath?.toString();
  const { isLight } = useThemeContext();
  const { mutate } = useSWRConfig();

  const { data: budgetsAnalytics } = useSWRImmutable(
    ['analytics/annual', levelPath],
    async () =>
      getBudgetsAnalytics('annual', year, levelPath, getLevelOfBudget(levelPath), budgets) as Promise<BudgetAnalytic>
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
  // Take the first path to pass breadCrumb navigation
  const firstPath = 'atlas' + '/' + router.query.firstPath?.toString();

  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery(lightTheme.breakpoints.between('desktop_1280', 'desktop_1440'));
  const isDesk1440 = useMediaQuery(lightTheme.breakpoints.between('desktop_1440', 'desktop_1920'));
  const isDesk1920 = useMediaQuery(lightTheme.breakpoints.up('desktop_1920'));

  // All Logic for the Expense Report
  const { headersExpenseReport, reportExpenseItems, handleLoadMore, showSome, onSortClick } =
    useDelegateExpenseTrendFinances();

  // Logic for OverViewChart
  const {
    filters: filtersThirdLevel,
    filterSelected: selectedThirdLevel,
    handleSelectFilter: handleSelectFilterThirdLevel,
    doughnutSeriesData,
    actuals,
    budgetCap,
    prediction,
  } = useCardChartOverview(budgets, budgetsAnalytics);

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(
    budgets,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    budgetsAnalytics
  );

  const titleFirstPathBudget = allBudgets.find((budget) => budget.codePath === levelPath);
  const levelBudgetPath = allBudgets.find((budget) => budget.codePath === firstPath);

  const icon = titleFirstPathBudget?.image || '';

  const title = removePrefix(titleFirstPathBudget?.name || '', prefixToRemove) || '';
  const [year, setYear] = useState(initialYear);

  const handleChangeYearsEndgameAtlasBudget = (value: string) => {
    setYear(value);
    router.push(
      {
        pathname: `${siteRoutes.newFinancesOverview}/[firstPath]/[...secondPath]`,
        query: {
          firstPath: router.query.firstPath,
          secondPath: router.query.secondPath,
          year: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const numColors = budgets.length;
  const colorsLight = generateColorPalette(existingColors.length, numColors - existingColors.length, existingColors);
  const colorsDark = generateColorPalette(180, numColors, existingColorsDark);
  const breadcrumbs = [title];

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
      code: item.code,
      color: isLight ? colorsLight[index] : colorsDark[index],
    };
  });

  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);

  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };
  const cardsToShow = isMobile && loadMoreCards ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

  const trailingAddressDesk = [
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}`,
    },
    {
      label: removePrefix(levelBudgetPath?.name || '', prefixToRemove),
      url: `${siteRoutes.newFinancesOverview}/${levelBudgetPath?.codePath.replace('atlas/', '')}`,
    },
    ...breadcrumbs.map((adr) => ({
      label: adr,
      url: removePrefix(router.asPath, prefixToRemove),
    })),
  ];

  const trailingAddress = [
    ...breadcrumbs.map((adr) => ({
      label: adr,
      url: router.asPath,
      style: { color: isLight ? '#25273D' : '#D2D4EF' },
    })),
    {
      label: removePrefix(levelBudgetPath?.name || '', prefixToRemove),
      url: `${siteRoutes.newFinancesOverview}/${levelBudgetPath?.codePath.replace('atlas/', '')}`,
    },
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}`,
    },
  ];
  const calculateItemsPerPage = () => {
    if (isDesk1920) {
      return 8;
    } else if (isDesk1440) {
      return 6;
    } else if (isDesk1280) {
      return 5;
    } else if (isDesk1024) {
      return 4;
    } else if (isTable) {
      return 3;
    } else if (isMobile) {
      return 2;
    } else {
      return 6;
    }
  };

  // All Logic for the table
  const {
    periodFilter,
    defaultMetricsWithAllSelected,
    activeMetrics,
    handlePeriodChange,
    handleResetMetrics,
    handleSelectChangeMetrics,
    selectMetrics,

    getAllMetricsValuesTotal,
    maxItems,
    minItems,
    allowSelectAll,
    periodicSelectionFilter,
    popupContainerHeight,
  } = useBreakdownTable();

  useEffect(() => {
    mutate(['analytics/annual', levelPath]);
    mutate(['analytics/quarterly', levelPath]);
    mutate(['analytics/monthly', levelPath]);
  }, [levelPath, mutate, year]);

  return {
    router,
    trailingAddressDesk,
    trailingAddress,
    year,
    handleChangeYearsEndgameAtlasBudget,
    title,
    icon,
    headersExpenseReport,
    reportExpenseItems,
    handleLoadMore,
    showSome,
    onSortClick,
    actuals,
    budgetCap,
    prediction,
    cardsNavigationInformation,
    doughnutSeriesData,
    ...breakdownChartSectionData,
    filtersThirdLevel,
    selectedThirdLevel,
    handleSelectFilterThirdLevel,
    calculateItemsPerPage,
    handleLoadMoreCards,
    loadMoreCards,
    cardsToShow,
    isLight,
    periodFilter,
    defaultMetricsWithAllSelected,
    activeMetrics,
    handlePeriodChange,
    handleResetMetrics,
    handleSelectChangeMetrics,
    selectMetrics,
    getAllMetricsValuesTotal,
    maxItems,
    minItems,
    allowSelectAll,
    popupContainerHeight,
    periodicSelectionFilter,
  };
};
