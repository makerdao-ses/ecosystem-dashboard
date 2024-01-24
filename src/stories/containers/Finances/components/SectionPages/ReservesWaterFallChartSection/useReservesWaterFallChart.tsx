import { useMediaQuery } from '@mui/material';
import { nameChanged } from '@ses/containers/Finances/utils/utils';
import { useBudgetContext } from '@ses/core/context/BudgetContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useMemo, useState } from 'react';
import { builderWaterFallSeries } from './utils';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterFall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

export const useReservesWaterFallChart = (levelPath: string | null) => {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const { isLight } = useThemeContext();
  const { allBudgets } = useBudgetContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };
  const defaultTitle = 'MakerDAO Finances';

  const levelBudget = allBudgets?.find((budget) => budget.codePath === levelPath);
  const getTitleLevelBudget = nameChanged(levelBudget?.name || '');

  // Here will be 13, the first one is only for start and the last one is calculate to by duplicate
  // The firs element will be point to start its don't bellow to the serie
  const data = [1900, 2300, 1195, 2100, -1110, 2100, 1400, 4300, -1400, -3500, -4200, 1250, 2700];

  const series = builderWaterFallSeries(data, isMobile, isTable);

  const titleChart = getTitleLevelBudget === '' ? defaultTitle : getTitleLevelBudget;

  const legendItems: LegendItemsWaterFall[] = [
    {
      title: 'Reserves Balance',
      color: isLight ? '#83A7FF' : '#447AFB',
    },
    {
      title: 'Outflow',
      color: isLight ? '#CB3A0D' : '#A83815',
    },
    {
      title: 'Inflow',
      color: isLight ? '#2DC1B1' : '#1AAB9B',
    },
  ];

  // get all the budget for the current level
  const allSubBudgets = allBudgets?.filter((budget) => budget.parentId === levelPath);
  const items = useMemo(
    () =>
      sortBy(allSubBudgets, (subBudget) => subBudget.name).map((budget) => ({
        id: budget.id,
        content: budget.name,
        params: {
          url: budget.image,
        },
      })) as MultiSelectItem[],
    [allSubBudgets]
  );
  const popupContainerHeight = 220;

  return {
    titleChart,
    legendItems,
    selectedGranularity,
    handleGranularityChange,
    series,
    items,
    popupContainerHeight,
    handleResetFilter,
    activeElements,
    handleSelectChange,
    allSubBudgets,
  };
};
