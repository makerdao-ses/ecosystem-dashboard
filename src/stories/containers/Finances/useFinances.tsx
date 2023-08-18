import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useState } from 'react';
import EndgameAtlasBudgets from './components/EndgameAtlasBudgets';
import EndgameScopeBudgets from './components/EndgameScopeBudgets';
import MakerDAOLegacyBudgets from './components/MakerDAOLegacyBudgets';
import type { FilterDoughnut, NavigationCard } from './utils/types';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { DoughnutSeries } from '@ses/core/models/interfaces/doughnutSeries';

export const useFinances = () => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];

  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');
  const router = useRouter();
  const routes = ['Finances'];
  const years = ['2022', '2023'];
  const [value, setValue] = useState(years[0]);
  const [isOpen, setIsOpen] = useState(false);
  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as unknown as string);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
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
  return {
    years,
    value,
    isOpen,
    handleChange,
    handleClose,
    handleOpen,
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
  };
};
