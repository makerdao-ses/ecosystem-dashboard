import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import EndgameAtlasBudgets from './components/EndgameAtlasBudgets';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { prefixToRemove, removePrefix } from './utils/utils';
import type { BudgetsFinances } from './utils/types';

export const useFinances = (budgets: BudgetsFinances[]) => {
  const cardsNavigation: BudgetsFinances[] = budgets.filter((budget) => budget.parentId === null);
  const { isLight } = useThemeContext();
  const colors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
  const colorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];
  const router = useRouter();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  const cardsNavigationInformation = cardsNavigation.map((item, index) => ({
    // This should be a image came from the API
    svgImage: (
      <EndgameAtlasBudgets
        width={isMobile ? 32 : 64}
        height={isMobile ? 32 : 64}
        fill={isLight ? (isMobile ? '#9FAFB9' : '#546978') : isMobile ? '#9FAFB9' : '#D1DEE6'}
      />
    ),
    title: removePrefix(item.name, prefixToRemove),
    description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
    href: `finances/${item.codePath}`,
    totalDai: 132345,
    valueDai: 12345,
    color: isLight ? colors[index] : colorsDark[index],
  }));

  // all the logic required by the breakdown chart section
  const breakdownChartSectionData = useBreakdownChart();

  // All the logic required by the Expense Reports
  const expenseTrendFinances = useDelegateExpenseTrendFinances();

  // All the logic required by the CardChartOverview section
  const cardOverViewSectionData = useCardChartOverview(budgets);

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
