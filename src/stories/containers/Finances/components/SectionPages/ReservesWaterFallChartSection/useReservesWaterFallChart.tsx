import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { formatBudgetName } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import {
  builderWaterFallSeries,
  calculateAccumulatedArray,
  generateLineSeries,
  getAnalyticForWaterFall,
  processDataForWaterFall,
  sumValuesFromMapKeys,
} from './utils';

import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterFall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useReservesWaterFallChart = (codePath: string, budgets: Budget[], allBudgets: Budget[], year: string) => {
  const selectAll = useMemo(() => budgets.map((budget) => budget.codePath), [budgets]);

  const [activeElements, setActiveElements] = useState<string[]>(selectAll);
  const { isLight } = useThemeContext();
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));

  const levelOfDetail = codePath.split('/').length + 1;

  useEffect(() => {
    setActiveElements(selectAll);
  }, [selectAll]);

  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements(selectAll);
    setSelectedGranularity('monthly');
  };

  // fetch actual data from the API
  const { data: analytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, levelOfDetail],
    async () => fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const handleGranularityChange = (value: AnalyticGranularity) => {
    setActiveElements(activeElements);
    setSelectedGranularity(value);
  };
  const defaultTitle = 'MakerDAO Finances';

  const levelBudget = allBudgets?.find((budget) => budget.codePath === codePath);
  const getTitleLevelBudget = formatBudgetName(levelBudget?.name || '');

  const { summaryValues, totalToStart } = useMemo(
    () => getAnalyticForWaterFall(budgets, selectedGranularity, analytics),
    [analytics, budgets, selectedGranularity]
  );

  const valuesToShow = sumValuesFromMapKeys(summaryValues, activeElements, selectedGranularity);

  const dataReady = processDataForWaterFall(valuesToShow, totalToStart);

  const series = builderWaterFallSeries(dataReady, isMobile, isTable, isLight);

  const valuesLine = useMemo(() => calculateAccumulatedArray(dataReady), [dataReady]);
  const linesChart = useMemo(() => generateLineSeries(valuesLine, isLight), [isLight, valuesLine]);

  series.push(...linesChart);

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
        id: budget.codePath,
        content: formatBudgetName(budget.name),
        params: {
          url: budget.image,
        },
      })) as MultiSelectItem[],
    [budgets]
  );

  const popupContainerHeight =
    budgets.length === 1 ? 100 : budgets.length === 2 ? 130 : budgets.length === 3 ? 150 : 180;

  const isDisabled = activeElements.length === selectAll.length && selectedGranularity === 'monthly';
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
    isLoading,
    isDisabled,
  };
};
