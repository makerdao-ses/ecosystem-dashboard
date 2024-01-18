import { useMediaQuery } from '@mui/material';
import { prefixToRemove, removePrefix } from '@ses/containers/Finances/utils/utils';
import { useBudgetContext } from '@ses/core/context/BudgetContext';

import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { builderWaterFallSeries } from './utils';
import type { LegendItemsWaterFall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';

export const useReservesWaterFallChart = () => {
  const router = useRouter();
  const { allBudgets } = useBudgetContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };
  const defaultTitle = 'MakerDAO Finances';
  const levelPath = 'atlas/' + router.query.firstPath?.toString();

  const levelBudget = allBudgets?.find((budget) => budget.codePath === levelPath);
  const getTitleLevelBudget = removePrefix(levelBudget?.name || '', prefixToRemove);

  // Here will be 13, the first one is only for start and the last one is calculate to by duplicate
  // The firs element will be point to start its don't bellow to the serie
  const data = [12900, 3245, 4393, 3108, -1954, 1535, 1078, 2286, -1119, -1361, -2203, 2500, 2700];

  const series = builderWaterFallSeries(data, isMobile);
  const titleChart = getTitleLevelBudget === '' ? defaultTitle : getTitleLevelBudget;

  const legendItems: LegendItemsWaterFall[] = [
    {
      title: 'Reserves Balance',
      color: '#83A7FF',
    },
    {
      title: 'Outflow',
      color: '#CB3A0D',
    },
    {
      title: 'InFlow',
      color: '#2DC1B1',
    },
  ];

  return {
    titleChart,
    legendItems,
    selectedGranularity,
    handleGranularityChange,
    series,
  };
};
