import { useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
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
  const code = currentBudget?.code ?? '';
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
      budgets
        .map((item, index) => {
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
            valueDai: budgetMetric[0].paymentsOnChain.value,
            totalDai: allMetrics.paymentsOnChain,
            budgetCapValue: budgetMetric[0].budget.value,
            code: item.code,
            color: isLight ? colorsLight[index] : colorsDark[index],
            percent: percentageRespectTo(budgetMetric[0].paymentsOnChain.value, budgetMetric[0].budget.value),
          };
        })
        .sort((a, b) => b.percent - a.percent),
    [allMetrics.paymentsOnChain, budgets, budgetsAnalytics, colorsDark, colorsLight, isLight, year]
  );

  // if there too many cards we need to use a swiper on desktop but paginated on mobile
  const [canLoadMoreCards, setCanLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);
  const [showMoreCards, setShowMoreCards] = useState<boolean>(false);
  useEffect(() => {
    // update when the levels/budgets change
    setCanLoadMoreCards(cardsNavigationInformation.length > 6);
    setShowMoreCards(false);
  }, [cardsNavigationInformation.length]);

  const toggleShowMoreCards = () => {
    if (!canLoadMoreCards) return;

    setShowMoreCards(!showMoreCards);
  };

  // pagination only happens on mobile devices
  const cardsToShow = !showMoreCards && isMobile ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

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
    isMobile,
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
    canLoadMoreCards,
    showMoreCards,
    toggleShowMoreCards,
    makerDAOExpensesMetrics,
    expenseReportSection: expenseTrendFinances,
    reserveChart,
    code,
  };
};
