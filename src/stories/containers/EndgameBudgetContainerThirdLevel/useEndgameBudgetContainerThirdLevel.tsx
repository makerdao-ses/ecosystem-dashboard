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
import { getTotalAllMetricsBudget } from '../Finances/components/SectionPages/CardChartOverview/utils';
import { useDelegateExpenseTrendFinances } from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { useMakerDAOExpenseMetrics } from '../Finances/components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import { useReservesWaterFallChart } from '../Finances/components/SectionPages/ReservesWaterFallChartSection/useReservesWaterFallChart';
import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  getBudgetsAnalytics,
  getLevelOfBudget,
  nameChanged,
  newBudgetMetric,
} from '../Finances/utils/utils';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { SwiperProps } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export const useEndgameBudgetContainerThirdLevel = (budgets: Budget[], initialYear: string, allBudgets: Budget[]) => {
  const [year, setYear] = useState(initialYear);
  const router = useRouter();
  const levelPath = 'atlas/' + router.query.firstPath?.toString() + '/' + router.query.secondPath?.toString();
  const { isLight } = useThemeContext();
  const { mutate } = useSWRConfig();

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
  // Take the first path to pass breadCrumb navigation
  const firstPath = 'atlas' + '/' + router.query.firstPath?.toString();

  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  // All Logic for the Expense Report
  const expenseReportSection = useDelegateExpenseTrendFinances(levelPath);

  // Logic for OverViewChart
  const {
    filters: filtersThirdLevel,
    filterSelected: selectedThirdLevel,
    handleSelectFilter: handleSelectFilterThirdLevel,
    doughnutSeriesData,
    actuals,
    budgetCap,
    prediction,
    changeAlignment,
    showSwiper,
  } = useCardChartOverview(budgets, budgetsAnalytics);

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(
    budgets,
    budgetsAnalyticsMonthly,
    budgetsAnalyticsQuarterly,
    budgetsAnalytics
  );

  // All Logic for the table
  const breakdownTableThirdLevel = useBreakdownTable(year, budgets, allBudgets);

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics(year);

  const titleFirstPathBudget = allBudgets.find((budget) => budget.codePath === levelPath);
  const levelBudgetPath = allBudgets.find((budget) => budget.codePath === firstPath);

  // All the logic required by the ReservesWaterFallChart
  const reserveChartThirdLevel = useReservesWaterFallChart(levelBudgetPath?.id ?? '');
  const icon = titleFirstPathBudget?.image;

  const title = nameChanged(titleFirstPathBudget?.name || '');

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

  // Show total of all the metric of actual budget
  const allMetrics = getTotalAllMetricsBudget(budgetsAnalytics);

  const cardsNavigationInformation = budgets.map((item, index) => {
    const budgetMetric =
      budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
        ? budgetsAnalytics[item.codePath]
        : [newBudgetMetric()];

    return {
      image: item.image,
      title: item.name || '',
      description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
      href: `${siteRoutes.newFinancesOverview}/${item.codePath.replace('atlas/', '')}`,
      valueDai: budgetMetric[0].budget.value,
      totalDai: allMetrics.budget,
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
      url: `${siteRoutes.newFinancesOverview}?year=${year}`,
    },
    {
      label: nameChanged(levelBudgetPath?.name || ''),
      url: `${siteRoutes.newFinancesOverview}/${levelBudgetPath?.codePath.replace('atlas/', '')}?year=${year}`,
    },
    ...breadcrumbs.map((adr) => ({
      label: nameChanged(adr),
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
      label: levelBudgetPath?.name || '',
      url: `${siteRoutes.newFinancesOverview}/${levelBudgetPath?.codePath.replace('atlas/', '')}?year=${year}`,
    },
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}?year=${year}`,
    },
  ];

  // Options of Swiper
  const swiperOptions = {
    controller: {
      inverse: true,
    },
    pagination: {
      type: 'bullets',
      enabled: true,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
      1280: {
        slidesPerView: 8,
        spaceBetween: 16,
      },
      1440: {
        slidesPerView: 8,
        spaceBetween: 16,
      },
      1920: {
        slidesPerView: 8,
        spaceBetween: 16,
      },
    },
  } as SwiperProps;

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
    actuals,
    budgetCap,
    prediction,
    cardsNavigationInformation,
    doughnutSeriesData,
    breakdownChartSectionData,
    filtersThirdLevel,
    selectedThirdLevel,
    handleSelectFilterThirdLevel,
    handleLoadMoreCards,
    loadMoreCards,
    cardsToShow,
    isLight,
    breakdownTableThirdLevel,
    swiperOptions,
    changeAlignment,
    makerDAOExpensesMetrics,
    expenseReportSection,
    showSwiper,
    reserveChartThirdLevel,
  };
};
