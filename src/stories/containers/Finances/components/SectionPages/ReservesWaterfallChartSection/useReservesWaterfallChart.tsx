import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { formatBudgetName } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import {
  builderWaterfallSeries,
  calculateAccumulatedArray,
  generateLineSeries,
  getAnalyticForWaterfall,
  processDataForWaterfall,
  sumValuesFromMapKeys,
} from './utils';

import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterfall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useReservesWaterfallChart = (codePath: string, budgets: Budget[], allBudgets: Budget[], year: string) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const [resetActiveElements, setResetActiveElements] = useState(true);

  const levelOfDetail = codePath.split('/').length + 1;
  // fetch actual data from the API
  const { data: analytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, levelOfDetail],
    async () => fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const { summaryValues, totalToStartEachBudget } = useMemo(
    () => getAnalyticForWaterfall(budgets, selectedGranularity, analytics, allBudgets),
    [budgets, selectedGranularity, analytics, allBudgets]
  );

  const selectAll = useMemo(() => Array.from(summaryValues.keys()), [summaryValues]);

  useEffect(() => {
    if (!isLoading && resetActiveElements) {
      setActiveElements(selectAll);
      setResetActiveElements(false);
    }
  }, [isLoading, resetActiveElements, selectAll]);

  // Reset all default value when codePath Change
  useEffect(() => {
    setResetActiveElements(true);
    setSelectedGranularity('monthly');
  }, [codePath]);

  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements(selectAll);
    setSelectedGranularity('monthly');
  };

  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };

  // This to catch some analytics that don't have budgets
  const combinedElementsFromAnalytics = useMemo(() => {
    const newElements = selectAll
      .filter((selectAllPath) => !allBudgets.some((budget) => budget.codePath === selectAllPath))
      .map((element) => ({
        name: element,
        codePath: element,
        image: '',
      }));

    const combinedArray = [...budgets, ...newElements];
    return combinedArray;
  }, [allBudgets, budgets, selectAll]);

  const defaultTitle = 'MakerDAO Finances';

  const levelBudget = allBudgets?.find((budget) => budget.codePath === codePath);
  const getTitleLevelBudget = formatBudgetName(levelBudget?.name || '');

  const valuesToShow = sumValuesFromMapKeys(summaryValues, activeElements, selectedGranularity);

  const dataReady = processDataForWaterfall(valuesToShow, activeElements, totalToStartEachBudget);

  const series = builderWaterfallSeries(dataReady, isMobile, isTable, isLight);

  const valuesLine = useMemo(() => calculateAccumulatedArray(dataReady), [dataReady]);
  const linesChart = useMemo(() => generateLineSeries(valuesLine, isLight), [isLight, valuesLine]);

  series.push(...linesChart);

  const titleChart = getTitleLevelBudget === '' ? defaultTitle : getTitleLevelBudget;

  const legendItems: LegendItemsWaterfall[] = [
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
      sortBy(combinedElementsFromAnalytics, (subBudget) => subBudget.name).map((budget) => ({
        id: budget.codePath,
        content: formatBudgetName(budget.name),
        count: 0,
        params: {
          url: budget.image,
        },
      })) as MultiSelectItem[],
    [combinedElementsFromAnalytics]
  );
  const itemsCount = Math.min(8, items.length + 1);
  const popupContainerHeight = itemsCount * 40 + (itemsCount - 1) * 4;

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
