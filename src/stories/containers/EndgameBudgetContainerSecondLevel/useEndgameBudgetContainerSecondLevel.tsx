import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useBreakdownChart from '../Finances/components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from '../Finances/components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from '../Finances/components/SectionPages/CardChartOverview/useCardChartOverview';
import { getTotalAllMetricsBudget } from '../Finances/components/SectionPages/CardChartOverview/utils';
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
import type { Metric, MetricsWithAmount } from '../Finances/utils/types';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';

import type { Budget } from '@ses/core/models/interfaces/budget';

export const useEndgameBudgetContainerSecondLevel = (budgets: Budget[], initialYear: string, allBudgets: Budget[]) => {
  const { isLight } = useThemeContext();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const levelPath = 'atlas/' + router.query.firstPath?.toString();

  const { data: budgetsAnalytics } = useSWRImmutable(
    ['analytics/annual', levelPath],
    async () =>
      getBudgetsAnalytics('annual', year, levelPath, getLevelOfBudget(levelPath), budgets) as Promise<BudgetAnalytic>
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
    cutTextForBigNumberLegend,
  } = useCardChartOverview(budgets, budgetsAnalytics);

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

  const levelBudget = allBudgets.find((budget) => budget.codePath === levelPath);
  const title = removePrefix(levelBudget?.name || '', prefixToRemove) || '';

  const [year, setYear] = useState(initialYear);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
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
    cutTextForBigNumberLegend,
  };
};
