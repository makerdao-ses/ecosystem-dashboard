import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useBreakdownChart from './components/BreakdownChartSection/useBreakdownChart';
import { useBreakdownTable } from './components/SectionPages/BreakdownTable/useBreakdownTable';
import { useCardChartOverview } from './components/SectionPages/CardChartOverview/useCardChartOverview';
import { useDelegateExpenseTrendFinances } from './components/SectionPages/DelegateExpenseTrendFinances/useDelegateExpenseTrendFinances';
import { prefixToRemove, removePrefix } from './utils/utils';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useFinances = (budgets: Budget[]) => {
  const cardsNavigation: Budget[] = budgets.filter((budget) => budget.parentId === null);
  const { isLight } = useThemeContext();
  const colors: string[] = ['#F99374', '#447AFB', '#2DC1B1'];
  const colorsDark: string[] = ['#F77249', '#447AFB', '#1AAB9B'];
  const router = useRouter();

  const cardsNavigationInformation = cardsNavigation.map((item, index) => ({
    image: item.image || '',
    title: removePrefix(item.name, prefixToRemove),
    description: item.description || 'Finances of the core governance constructs described in the Maker Atlas.',
    href: `finances/${item.codePath}`,
    totalDai: 132345,
    valueDai: 12345,
    color: isLight ? colors[index] : colorsDark[index],
  }));
  const [loadMoreCards, setLoadMoreCards] = useState<boolean>(cardsNavigationInformation.length > 6);

  const handleLoadMoreCards = () => {
    setLoadMoreCards(!loadMoreCards);
  };
  const cardsToShow = loadMoreCards ? cardsNavigationInformation.slice(0, 6) : cardsNavigationInformation;

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
    cardsToShow,
    ...breakdownChartSectionData,
    ...expenseTrendFinances,
    ...breakdownTable,
    loadMoreCards,
    handleLoadMoreCards,
  };
};
