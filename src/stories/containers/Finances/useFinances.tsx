import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import EndgameAtlasBudgets from './components/EndgameAtlasBudgets';
import EndgameScopeBudgets from './components/EndgameScopeBudgets';
import MakerDAOLegacyBudgets from './components/MakerDAOLegacyBudgets';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import type { NavigationCard } from './utils/types';
export const useFinances = () => {
  const { isLight } = useThemeContext();
  const router = useRouter();

  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  const cardsNavigationInformation: NavigationCard[] = [
    {
      svgImage: (
        <EndgameAtlasBudgets
          width={isMobile ? 32 : 64}
          height={isMobile ? 32 : 64}
          fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
        />
      ),
      title: 'Endgame Atlas Budgets',
      description: 'Finances of the core governance constructs described in the Maker Atlas.',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: isLight ? '#F99374' : '#F77249',
    },
    {
      svgImage: (
        <EndgameScopeBudgets
          width={isMobile ? 32 : 64}
          height={isMobile ? 32 : 64}
          fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
        />
      ),
      title: 'Endgame Scope Budgets',
      description: 'Detailed budgets of the practical DAO activities within Endgame.',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: '#447AFB',
    },
    {
      svgImage: (
        <MakerDAOLegacyBudgets
          width={isMobile ? 32 : 64}
          height={isMobile ? 32 : 64}
          fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
        />
      ),
      title: 'MakerDAO Legacy Budgets',
      description: 'Historical records of MakerDAO expenses, prior to Endgame',
      href: '#',
      totalDai: 132345,
      valueDai: 12345,
      color: isLight ? '#2DC1B1' : '#1AAB9B',
    },
  ];

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart();

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useDelegateExpenseTrendFinances();

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview();

  // All the logic required by the CardChartOverview section
  const breakdownTable = useBreakdownTable();

  return {
    ...cardOverViewSectionData,
    router,
    isLight,
    cardsNavigationInformation,
    ...breakdownChartSectionData,
    ...expenseTrendFinances,
    ...breakdownTable,
  };
};
