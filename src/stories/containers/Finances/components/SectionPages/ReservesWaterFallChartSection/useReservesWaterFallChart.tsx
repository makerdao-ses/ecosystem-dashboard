import { useMediaQuery } from '@mui/material';
import { nameChanged } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useMemo, useState } from 'react';
import { builderWaterFallSeries, processDataForWaterFall } from './utils';
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
  // const data = [4000000, 4067832, 3917607, 2503865, 1223761, 9163892, 391565, 591565, 591565, 420343, 404022, 323935]
  // const total = 8000000
  // const data = [100, 95, 50, 5, 10, 20, 30, 50, 100, 130, 150, 160];
  // const total = 200;
  const data = [
    4000000, 4500000, 4300000, 4800000, 4600000, 5000000, 4700000, 5200000, 4900000, 5400000, 5100000, 5600000,
  ];
  const total = 8000000;

  const dataReady = processDataForWaterFall(data, total);

  const series = builderWaterFallSeries(dataReady, isMobile, isTable, isLight);

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
