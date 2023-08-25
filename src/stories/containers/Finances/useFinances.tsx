import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';

import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import EndgameAtlasBudgets from './components/EndgameAtlasBudgets';
import EndgameScopeBudgets from './components/EndgameScopeBudgets';

import MakerDAOLegacyBudgets from './components/MakerDAOLegacyBudgets';
import { type NavigationCard, type PeriodicSelectionFilter } from './utils/types';
import { getHeaderForFilters } from './utils/utils';
import type { FilterMetrics } from './utils/types';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';

const metricsFilter = ['Budget', 'Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain'];
const defaultFilters = [...metricsFilter.slice(0, 2)];

export const useFinances = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const routes = ['Finances'];
  const years = ['2022', '2023'];

  const [activeElements, setActiveElements] = useState<string[]>(defaultFilters);

  const periodicSelectionFilter: PeriodicSelectionFilter[] = ['Monthly', 'Quarterly', 'Annually'];
  const filters: FilterMetrics[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];

  const [filterSelected, setFilterSelected] = useState<FilterMetrics>('Budget');
  const [periodFilter, setPeriodFilter] = useState<PeriodicSelectionFilter>('Quarterly');
  const router = useRouter();

  const [year, setYears] = useState(years[0]);
  const [isOpenYear, setIsOpenYear] = useState<boolean>(false);
  const [isOpenPeriod, setIsOpenPeriod] = useState<boolean>(false);
  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;
  const totalCardsNavigation = ['Endgame Atlas Budgets', 'Endgame Scope Budgets'];

  const handleSelectFilter = (item: FilterMetrics) => {
    setFilterSelected(item);
  };
  const handleResetFilters = () => {
    setActiveElements(defaultFilters);
    setPeriodFilter('Quarterly');
  };
  const handleSelectChangeMetrics = (value: string[]) => {
    setActiveElements(value);
  };
  const handleChangeYears = (event: SelectChangeEvent<unknown>) => {
    setYears(event.target.value as string);
  };
  const handlePeriodChange = (event: SelectChangeEvent<unknown>) => {
    setPeriodFilter(event.target.value as PeriodicSelectionFilter);
  };
  const handleOpenYear = () => {
    setIsOpenYear(true);
  };
  const handleCloseYear = () => {
    setIsOpenYear(false);
  };
  const handleOpenPeriod = () => {
    setIsOpenPeriod(true);
  };
  const handleClosePeriod = () => {
    setIsOpenPeriod(false);
  };
  const selectMetrics = useMemo(
    () =>
      sortBy(metricsFilter, (item) => item).map((filter) => ({
        id: filter,
        content: filter,
      })) as MultiSelectItem[],
    []
  );
  const trailingAddress = routes.map((adr) => ({
    label: adr,
    url: router.asPath,
  }));

  const doughnutSeriesData: DoughnutSeries[] = [
    {
      name: 'Endgame Atlas Budgets',
      value: 4345,
      percent: 30,
      actuals: 45,
      budgetCap: 34,
      color: '#F99374',
    },
    {
      name: 'Endgame Scope Budgets',
      value: 34627,
      percent: 40,
      actuals: 45,
      budgetCap: 34,
      color: '#447AFB',
    },
    {
      name: 'MakerDAO Legacy Budgets',
      value: 3445,
      percent: 30,
      actuals: 45,
      budgetCap: 34,
      color: '#2DC1B1',
    },
  ];

  const cardsNavigationInformation: NavigationCard[] = [
    {
      svgImage: <EndgameAtlasBudgets width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} />,
      title: 'Endgame Atlas Budgets',
      description: 'Finances of the core governance constructs described in the Maker Atlas.',
      href: '#',
      totalDai: 12345,
      color: '#F99374',
    },
    {
      svgImage: <EndgameScopeBudgets width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} />,
      title: 'Endgame Scope Budgets',
      description: 'Detailed budgets of the practical DAO activities within Endgame.',
      href: '#',
      totalDai: 12345,
      color: '#447AFB',
    },
    {
      svgImage: <MakerDAOLegacyBudgets width={isMobile ? 32 : 64} height={isMobile ? 32 : 64} />,
      title: 'MakerDAO Legacy Budgets',
      description: 'Historical records of MakerDAO expenses, prior to Endgame',
      href: '#',
      totalDai: 12345,
      color: '#2DC1B1',
    },
  ];

  const result = getHeaderForFilters(periodFilter, year);

  return {
    years,
    year,
    isOpenYear,
    handleChangeYears,
    handleOpenYear,
    handleCloseYear,
    router,
    trailingAddress,
    filterSelected,
    filters,
    handleSelectFilter,
    actuals,
    budgetCap,
    prediction,
    isLight,
    doughnutSeriesData,
    cardsNavigationInformation,
    periodicSelectionFilter,
    handlePeriodChange,
    handleClosePeriod,
    handleOpenPeriod,
    periodFilter,
    isOpenPeriod,
    activeElements,
    handleSelectChangeMetrics,
    selectMetrics,
    handleResetFilters,
    totalCardsNavigation,
    result,
  };
};
