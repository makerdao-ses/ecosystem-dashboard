import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useBreakdownChart from '../Finances/components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from '../Finances/components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from '../Finances/components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from '../Finances/components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  getNumbersFromIdPath,
  prefixToRemove,
  removePrefix,
} from '../Finances/utils/utils';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';
import type { Budget } from '@ses/core/models/interfaces/budget';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';

export const useEndgameBudgetContainerThirdLevel = (
  budgets: Budget[],
  initialYear: string,
  coreUnits: CoreUnitDto[]
) => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  // Remove when Api is connected
  console.log('core-units', coreUnits);
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
  } = useCardChartOverview(budgets);

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart();

  const momentValue = (router.query && router.query.code && router.query.code[0]) || '';

  const secondLevelBudget = budgets.find((budget) => budget.code === router.query.codePath);
  const iDLevelCode = budgets.find((budget) => budget.code === momentValue)?.id || '';
  const levelBudget = budgets.find((budget) => budget.code === momentValue);

  const icon = levelBudget?.image || '';

  // get all core unit base in the budget (use this code when api is ready)
  const childBudgetCoreUnits = budgets?.filter((budget) => getNumbersFromIdPath(budget.idPath).includes(iDLevelCode));
  // Remove this while when the API is ready
  while (childBudgetCoreUnits.length < 20) {
    const getValue = childBudgetCoreUnits[0];
    childBudgetCoreUnits.push(getValue);
  }

  const levelBudgetName = budgets?.find((budget) => budget.code === momentValue);

  const title = removePrefix(levelBudgetName?.name || '', prefixToRemove) || '';
  const [year, setYear] = useState(initialYear);

  const handleChangeYearsEndgameAtlasBudget = (value: string) => {
    setYear(value);
    router.push(
      {
        pathname: '/finances/[firstPath]/[...secondPath]',
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
  const doughnutSeriesData = childBudgetCoreUnits.map((item, index) => ({
    name: removePrefix(item?.name || '', prefixToRemove),
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
  const cardsNavigationInformation = childBudgetCoreUnits.map((item: Budget, index) => ({
    image: item?.image || '',
    title: removePrefix(item?.name || '', prefixToRemove),
    description: item?.description || 'Finances of the core governance constructs described in the Maker Atlas.',
    href: `${item?.codePath}`,
    totalDai: 132345,
    valueDai: 12345,
    color: isLight ? colorsLight[index] : colorsDark[index],
    code: 'SES',
  }));
  console.log('childBudgetCoreUnits', childBudgetCoreUnits);
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
      label: removePrefix(secondLevelBudget?.name || '', prefixToRemove),
      url: `${siteRoutes.newFinancesOverview}/${secondLevelBudget?.codePath}`,
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
  } = useBreakdownTable(initialYear);

  return {
    router,
    trailingAddressDesk,
    trailingAddress,
    year,
    handleChangeYearsEndgameAtlasBudget,
    title,
    childBudgetCoreUnits,
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
