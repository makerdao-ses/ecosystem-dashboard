import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import useBreakdownChart from '../Finances/components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from '../Finances/components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from '../Finances/components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  prefixToRemove,
  removePrefix,
} from '../Finances/utils/utils';
import type { Metric, MetricsWithAmount } from '../Finances/utils/types';

import type { Budget } from '@ses/core/models/interfaces/budget';

export const useEndgameBudgetContainerSecondLevel = (budgets: Budget[], initialYear: string) => {
  const router = useRouter();
  const levelPath = 'atlas/' + router.query.firstPath?.toString();

  // Hooks for Doughnut Series
  const { filters, filterSelected, handleSelectFilter } = useCardChartOverview(budgets);

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart();

  // Hooks Logic of Table Second Level
  const {
    activeMetrics,
    allowSelectAll,
    defaultMetricsWithAllSelected,
    maxItems,
    minItems,
    selectMetrics,
    handleResetMetrics,
    popupContainerHeight,
    periodFilter,
    handlePeriodChange,
    periodicSelectionFilter,
    handleSelectChangeMetrics,
  } = useBreakdownTable();

  const { headersExpenseReport, reportExpenseItems, handleLoadMore, showSome, onSortClick } =
    useDelegateExpenseTrendFinances();

  const levelBudget = budgets.find((budget) => budget.codePath === levelPath);
  const title = removePrefix(levelBudget?.name || '', prefixToRemove) || '';
  const { isLight } = useThemeContext();
  const [year, setYear] = useState(initialYear);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const icon = levelBudget?.image || '';
  // const icon = itemTitle?.image || '';
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
  const cardsNavigation: Budget[] = budgets.filter((budget) => budget.parentId === levelBudget?.id);

  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigation.length > 6);

  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };

  const numColors = budgets.length;
  const colorsLight = generateColorPalette(existingColors.length, numColors - existingColors.length, existingColors);
  const colorsDark = generateColorPalette(180, numColors, existingColorsDark);
  const doughnutSeriesData = cardsNavigation.map((item, index) => ({
    name: removePrefix(item.name, prefixToRemove),
    value: 4345,
    percent: 30,
    actuals: 45,
    budgetCap: 34,
    color: isLight ? colorsLight[index] : colorsDark[index],
  }));
  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;
  const breadcrumbs = [title];
  const cardsNavigationInformation = cardsNavigation.map((item, index) => ({
    // This should be a image came from the API
    image: item.image || '',
    title: removePrefix(item.name, prefixToRemove),
    description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
    href: `${item.codePath.replace('atlas/', '')}`,
    totalDai: 132345,
    valueDai: 12345,
    color: isLight ? colorsLight[index] : colorsDark[index],
  }));
  const cardsToShow = loadMoreCards ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;
  const trailingAddressDesk = [
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}`,
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
      url: `${siteRoutes.newFinancesOverview}`,
    },
  ];
  const mapMetricValuesTotal = useMemo(() => {
    const mapMetricValues: Record<Metric, number> = {
      Budget: 11044445,
      Actual: 11044445,
      Forecast: 11044445,
      'Net Expenses On-chain': 11044445,
      'Net Expenses Off-chain': 11044445,
    };
    return mapMetricValues;
  }, []);

  const getAllMetricsValuesTotal = useCallback(() => {
    const metricValues: MetricsWithAmount[] = [];
    if (periodFilter === 'Quarterly') {
      activeMetrics.forEach((metric: string) => {
        const amount = mapMetricValuesTotal[metric as Metric] || 0;
        if (amount !== undefined) {
          metricValues.push({
            name: metric as Metric,
            amount,
          });
        }
      });
    }
    if (periodFilter === 'Annually' || periodFilter === 'Monthly' || periodFilter === 'Semi-annual') {
      activeMetrics.forEach((metric: string) => {
        metricValues.push({
          name: metric as Metric,
          amount: 11044445,
        });
      });
    }

    return metricValues;
  }, [activeMetrics, mapMetricValuesTotal, periodFilter]);

  return {
    breadcrumbs,
    trailingAddressDesk,
    handleChangeYearsEndgameAtlasBudget,
    year,
    trailingAddress,
    isMobile,
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
    getAllMetricsValuesTotal,
    activeMetrics,
    allowSelectAll,
    defaultMetricsWithAllSelected,
    maxItems,
    minItems,
    selectMetrics,
    handleResetMetrics,
    popupContainerHeight,
    periodFilter,
    handlePeriodChange,
    periodicSelectionFilter,
    handleSelectChangeMetrics,
    headersExpenseReport,
    reportExpenseItems,
    handleLoadMore,
    showSome,
    onSortClick,
    handleLoadMoreCards,
    loadMoreCards,
    cardsToShow,
  };
};
