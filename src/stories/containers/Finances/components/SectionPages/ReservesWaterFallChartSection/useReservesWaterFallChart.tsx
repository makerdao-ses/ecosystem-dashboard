import { useMediaQuery } from '@mui/material';
import { nameChanged } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useMemo, useState } from 'react';
import { builderWaterFallSeries, processDataWaterFall } from './utils';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterFall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useReservesWaterFallChart = (levelPath: string | null, budgets: Budget[], allBudgets: Budget[]) => {
  const selectAll = budgets.map((budget) => budget.id);
  const [activeElements, setActiveElements] = useState<string[]>(selectAll);
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const { isLight } = useThemeContext();
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
  const data = [6362922, 4067832, 5917607, 5503865, 6223761, 6163892, 491565, 491565, 566959, 720343, 604022, 623935];

  // Total to start de waterfall chart
  const total = 10451688;
  const newData = processDataWaterFall(data, total);

  const series = builderWaterFallSeries(newData, isMobile, isTable, isLight);

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

  const items = useMemo(
    () =>
      sortBy(budgets, (subBudget) => subBudget.name).map((budget) => ({
        id: budget.id,
        content: nameChanged(budget.name),
        params: {
          url: budget.image,
        },
      })) as MultiSelectItem[],
    [budgets]
  );

  const popupContainerHeight = 180;

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
  };
};
