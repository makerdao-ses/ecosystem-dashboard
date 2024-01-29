import { useMediaQuery } from '@mui/material';
import { nameChanged } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';

import { useEffect, useMemo, useState } from 'react';
import { builderWaterFallSeries } from './utils';

import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterFall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useReservesWaterFallChart = (levelPath: string | null, budgets: Budget[], allBudgets: Budget[]) => {
  const selectAll = useMemo(() => budgets.map((budget) => budget.id), [budgets]);

  const [activeElements, setActiveElements] = useState<string[]>(selectAll);

  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements([]);
  };

  useEffect(() => {
    setActiveElements(selectAll);
  }, [selectAll]);

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
  const data = [1900, 2300, 1195, 2100, -1110, 2100, 1400, 4300, -1400, -3500, -4200, 1250, 2700];

  const series = builderWaterFallSeries(data, isMobile, isTable, isLight);

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

  const popupContainerHeight =
    budgets.length === 1 ? 100 : budgets.length === 2 ? 130 : budgets.length === 3 ? 150 : 180;

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
