import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  removePrefix,
} from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useState } from 'react';
import type { FilterDoughnut } from '@ses/containers/Finances/utils/types';
import type { Budget } from '@ses/core/models/interfaces/budget';
const prefixToRemove = 'End-game';

export const useCardChartOverview = (budgets: Budget[]) => {
  const { isLight } = useThemeContext();
  const cardsNavigation: Budget[] = budgets.filter((budget) => budget.parentId === null);
  const numColors = budgets.length;
  const colorsLight = generateColorPalette(existingColors.length, numColors - existingColors.length, existingColors);

  const colorsDark = generateColorPalette(180, numColors, existingColorsDark);

  const actuals = 9120;
  const budgetCap = 9120;
  const prediction = 4436;
  const filters: FilterDoughnut[] = ['Actual', 'Forecast', 'Net Expenses On-chain', 'Net Expenses Off-chain', 'Budget'];
  const [filterSelected, setFilterSelected] = useState<FilterDoughnut>('Budget');

  const handleSelectFilter = (item: FilterDoughnut) => {
    setFilterSelected(item);
  };

  const doughnutSeriesData = cardsNavigation.map((item, index) => ({
    name: removePrefix(item.name, prefixToRemove),
    value: 4345,
    percent: 30,
    actuals: 45,
    budgetCap: 34,
    color: isLight ? colorsLight[index] : colorsDark[index],
  }));

  return {
    actuals,
    budgetCap,
    prediction,
    filterSelected,
    setFilterSelected,
    handleSelectFilter,
    filters,
    doughnutSeriesData,
  };
};
