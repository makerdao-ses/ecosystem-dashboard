import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { formatBudgetName } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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

  // title of the waterfall chart section
  const titleChart = useMemo(() => {
    const levelBudget = allBudgets?.find((budget) => budget.codePath === codePath);
    const titleLevelBudget = formatBudgetName(levelBudget?.name || '');
    return titleLevelBudget === '' ? 'MakerDAO Finances' : titleLevelBudget;
  }, [allBudgets, codePath]);

  // Reset all default value when codePath Change
  // we are in a different level and the chart should be reset
  useEffect(() => {
    setResetActiveElements(true);
    setSelectedGranularity('monthly');
  }, [codePath]);

  // fetch actual data from the API
  const { data: analytics, isLoading } = useSWRImmutable(
    [selectedGranularity, year, codePath, levelOfDetail],
    async () => fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );

  const {
    summaryValues, // actual values for each budget
    totalToStartEachBudget, // start value for each budget
  } = useMemo(
    () => getAnalyticForWaterfall(budgets, selectedGranularity, analytics, allBudgets),
    [budgets, selectedGranularity, analytics, allBudgets]
  );

  // all items available to select
  const selectAll = useMemo(() => Array.from(summaryValues.keys()), [summaryValues]);

  useEffect(() => {
    if (!isLoading && resetActiveElements) {
      setActiveElements(selectAll);
      setResetActiveElements(false);
    }
  }, [isLoading, resetActiveElements, selectAll]);

  const handleSelectChange = (activeBudgets: string[]) => {
    setActiveElements(activeBudgets);
  };

  // reset the filters to the default values
  const handleResetFilter = () => {
    setActiveElements(selectAll);
    setSelectedGranularity('monthly');
  };

  const handleGranularityChange = (selectedGranularity: AnalyticGranularity) => {
    setSelectedGranularity(selectedGranularity);
  };

  // series of the chart (waterfall and lines)
  const series = useMemo(() => {
    const valuesToShow = sumValuesFromMapKeys(summaryValues, activeElements, selectedGranularity);
    const dataReady = processDataForWaterfall(valuesToShow, activeElements, totalToStartEachBudget);
    const series = builderWaterfallSeries(dataReady, isMobile, isTable, isLight);
    const valuesLine = calculateAccumulatedArray(dataReady);
    const linesChart = generateLineSeries(valuesLine, isLight, isMobile);

    series.push(...linesChart);
    return series;
  }, [activeElements, isLight, isMobile, isTable, selectedGranularity, summaryValues, totalToStartEachBudget]);

  const items = useMemo(() => {
    // This to catch some analytics that don't have budgets
    const newElements = selectAll
      .filter((selectAllPath) => !allBudgets.some((budget) => budget.codePath === selectAllPath))
      .map((element) => ({
        name: element,
        codePath: element,
        image: '',
      }));
    const combinedElementsFromAnalytics = [...budgets, ...newElements];

    return sortBy(combinedElementsFromAnalytics, (subBudget) => subBudget.name).map((budget) => ({
      id: budget.codePath,
      content: formatBudgetName(budget.name),
      count: 0,
      params: {
        url: budget.image,
      },
    })) as MultiSelectItem[];
  }, [allBudgets, budgets, selectAll]);
  // by default 8 items are visible and the others need to be scrolled (7 + 1 for the "Select all" item)
  const itemsCount = Math.min(8, items.length + 1);
  const popupContainerHeight = itemsCount * 40 + (itemsCount - 1) * 4;

  // we always show the same legends for this chart
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
  // if the default filters are selected then the "Reset filters" button should be disabled
  const areDefaultFiltersSelected = activeElements.length === selectAll.length && selectedGranularity === 'monthly';
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
    areDefaultFiltersSelected,
  };
};
