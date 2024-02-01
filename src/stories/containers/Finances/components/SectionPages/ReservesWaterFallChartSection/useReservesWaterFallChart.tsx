import { useMediaQuery } from '@mui/material';
import { fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { nameChanged } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import {
  builderWaterFallSeries,
  getAnalyticForWaterFall,
  processDataForWaterFall,
  sumValuesFromMapKeys,
} from './utils';

import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { LegendItemsWaterFall } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useReservesWaterFallChart = (
  levelPath: string | null,
  budgets: Budget[],
  allBudgets: Budget[],
  year: string
) => {
  const selectAll = useMemo(() => budgets.map((budget) => budget.codePath), [budgets]);
  const { isLight } = useThemeContext();
  const [selectedGranularity, setSelectedGranularity] = useState<AnalyticGranularity>('monthly');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const router = useRouter();
  const urlPath = Array.isArray(router.query.path) ? router.query.path.join('/') : router.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';
  const levelOfDetail = codePath.split('/').length + 1;
  const [activeElements, setActiveElements] = useState<string[]>(selectAll);

  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements([]);
  };

  useEffect(() => {
    setActiveElements(selectAll);
  }, [selectAll]);

  // fetch actual data from the API
  const { data: analytics, error } = useSWRImmutable([selectedGranularity, year, codePath, levelOfDetail], async () =>
    fetchAnalytics(selectedGranularity, year, codePath, levelOfDetail)
  );
  const isLoading = !analytics && !error;
  const handleGranularityChange = (value: AnalyticGranularity) => {
    setSelectedGranularity(value);
  };
  const defaultTitle = 'MakerDAO Finances';

  const levelBudget = allBudgets?.find((budget) => budget.codePath === levelPath);
  const getTitleLevelBudget = nameChanged(levelBudget?.name || '');

  const { summaryValues, totalToStart } = useMemo(
    () => getAnalyticForWaterFall(budgets, selectedGranularity, analytics),
    [analytics, budgets, selectedGranularity]
  );

  const valuesToShow = sumValuesFromMapKeys(summaryValues, activeElements, selectedGranularity);

  const dataReady = processDataForWaterFall(valuesToShow, totalToStart);

  const series = useMemo(
    () => builderWaterFallSeries(dataReady, isMobile, isTable, isLight, selectedGranularity),
    [dataReady, isLight, isMobile, isTable, selectedGranularity]
  );

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
    isLoading,
  };
};
