import { useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { percentageRespectTo } from '@ses/core/utils/math';
import { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { getTotalAllMetricsBudget } from './components/SectionPages/CardChartOverview/utils';
import { useExpenseReports } from './components/SectionPages/ExpenseReports/useExpenseReports';
import { useMakerDAOExpenseMetrics } from './components/SectionPages/MakerDAOExpenseMetrics/useMakerDAOExpenseMetrics';
import { useReservesWaterfallChart } from './components/SectionPages/ReservesWaterfallChartSection/useReservesWaterfallChart';
import {
  getBudgetsAnalytics,
  newBudgetMetric,
  generateColorPalette,
  existingColors,
  existingColorsDark,
  formatBudgetName,
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
  const [year, setYear] = useState(initialYear);

  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelNumber = codePath.split('/').length;
  const levelOfDetail = levelNumber + 1;
  const currentBudget = allBudgets.find((budget) => budget.codePath === codePath);
  const description = currentBudget?.description;
  const icon = currentBudget?.image;
  const title = formatBudgetName((currentBudget?.name || codePath) ?? '');
  const handleChangeYears = (value: string) => {
    setYear(value);
    router.push(
      `${siteRoutes.finances(codePath.split('/').slice(1, levelNumber).join('/'))}?year=${value}`,
      undefined,
      { shallow: true }
    );
  };

  const { data: budgetsAnalytics } = useSWRImmutable(
    ['annual', year, codePath, levelOfDetail, budgets],
    async () =>
      getBudgetsAnalytics('annual', year, codePath, levelOfDetail, budgets) as Promise<BreakdownBudgetAnalytic>
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
          label: formatBudgetName(
            allBudgets.find((budget) => budget.codePath === segmentedCodePath.slice(0, index + 1).join('/'))?.name ??
              codePath
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

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview(budgets, budgetsAnalytics, levelNumber, allBudgets, codePath);

  // All the logic required by the CardNavigation section
  const cardsNavigationInformation = useMemo(
    () =>
      budgets.map((item, index) => {
        const budgetMetric =
          budgetsAnalytics !== undefined && budgetsAnalytics[item.codePath] !== undefined
            ? budgetsAnalytics[item.codePath]
            : [newBudgetMetric()];

        return {
          image: item.image || '/assets/img/default-icon-cards-budget.svg',
          codePath: item.codePath,
          title: formatBudgetName(item.name),
          description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
          href: `${siteRoutes.finances(item.codePath.replace('atlas/', ''))}?year=${year}`,
          valueDai: budgetMetric[0].budget.value,
          totalDai: allMetrics.budget,
          code: item.code,
          color: isLight ? colorsLight[index] : colorsDark[index],
          percent: Math.round(percentageRespectTo(budgetMetric[0].budget.value, allMetrics.budget)),
        };
      }),
    [allMetrics.budget, budgets, budgetsAnalytics, colorsDark, colorsLight, isLight, year]
  );
  // Check some value affect the total 100%
  const totalPercent = cardsNavigationInformation.reduce((acc, curr) => acc + curr.percent, 0);
  // Verify that sum of percent its 100% and there its not a 0%
  if (totalPercent !== 100 && totalPercent !== 0) {
    const difference = 100 - totalPercent;
    cardsNavigationInformation.forEach((item) => {
      const adjustment = (item.percent / totalPercent) * difference;
      item.percent = Math.round(item.percent + adjustment);
    });

    const checkForPercent = cardsNavigationInformation.reduce((acc, curr) => acc + curr.percent, 0);
    const roundingError = 100 - checkForPercent;
    if (roundingError !== 0) {
      const indexToAdjust = cardsNavigationInformation.findIndex((item) => item.percent > 0);
      // Fix the percent with some index in array of values
      if (indexToAdjust !== -1) {
        cardsNavigationInformation[indexToAdjust].percent += roundingError;
      }
    }
  }

  // if there too many cards we need to use a swiper on desktop but paginated on mobile
  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);
  useEffect(() => {
    // update when the levels/budgets change
    if (cardsNavigationInformation.length > 6) {
      setLoadMoreCards(true);
    }
  }, [cardsNavigationInformation.length]);
  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };

  // pagination only happens on mobile devices
  const cardsToShow = loadMoreCards && isMobile ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

  // All the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart(budgets, year, codePath, allBudgets);

  // All the logic required by the BreakdownTable section
  const breakdownTable = useBreakdownTable(year, budgets, allBudgets);

  // All the logic required by the MakerDAOExpenseMetrics
  const makerDAOExpensesMetrics = useMakerDAOExpenseMetrics(year);

  // All the logic for the Reserve Chart
  const reserveChart = useReservesWaterfallChart(codePath, budgets, allBudgets, year);

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useExpenseReports(codePath);

  return {
    isEnabled,
    year,
    levelNumber,
    icon,
    title,
    description,
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
