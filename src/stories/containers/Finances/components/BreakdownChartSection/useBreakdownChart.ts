import useMediaQuery from '@mui/material/useMediaQuery';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';
import {
  atlasBudget,
  existingColors,
  existingColorsDark,
  generateColorPalette,
  legacyBudget,
  processingData,
  scopeBudget,
} from '../../utils/utils';
import type { SeriesBreakDownChart, ValueSeriesBreakdownChart } from '../../utils/types';

const useBreakdownChart = () => {
  const { isLight } = useThemeContext();
  const [isShowSeries, setIsShowSeries] = useState({
    'Endgame Atlas': true,
    'Endgame Scopes': true,
    'MakerDAO Legacy': true,
  });
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const isTablet = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesktop1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const [selectedBreakdownMetric, setSelectedBreakdownMetric] = useState<string>('Budget');
  const [selectedBreakdownGranularity, setSelectedBreakdownGranularity] = useState<string>('Monthly');

  const handleBreakdownMetricChange = (value: string) => setSelectedBreakdownMetric(value);
  const handleBreakdownGranularityChange = (value: string) => setSelectedBreakdownGranularity(value);
  const barBorderRadius = isMobile ? 4 : 6;
  const barWidth = isMobile ? 16 : isTablet ? 40 : isDesktop1024 ? 40 : 56;
  const itemStyleBottom = {
    borderRadius: [0, 0, barBorderRadius, barBorderRadius],
  };
  const itemStyleTop = {
    borderRadius: [barBorderRadius, barBorderRadius, 0, 0],
  };
  const itemStyleFull = {
    borderRadius: [barBorderRadius, barBorderRadius, barBorderRadius, barBorderRadius],
  };
  const itemStyledNoBorders = {
    borderRadius: [0, 0, 0, 0],
  };
  const valuesAtlasBudget = processingData(isShowSeries['Endgame Atlas'] ? atlasBudget : []);
  const valuesScopeBudget = processingData(isShowSeries['Endgame Scopes'] ? scopeBudget : []);
  const valuesLegacyBudget = processingData(isShowSeries['MakerDAO Legacy'] ? legacyBudget : []);

  const newAtlasBudgetWithBorders = valuesAtlasBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesScopeBudget[index].value === 0 && valuesLegacyBudget[index].value === 0 ? itemStyleFull : itemStyleBottom,
  })) as ValueSeriesBreakdownChart[];

  const newScopeBudgetWithBorders = valuesScopeBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesAtlasBudget[index].value === 0 && valuesLegacyBudget[index].value === 0
        ? itemStyleFull
        : valuesAtlasBudget[index].value === 0 && valuesLegacyBudget[index].value !== 0
        ? itemStyleBottom
        : valuesAtlasBudget[index].value !== 0 && valuesLegacyBudget[index].value === 0
        ? itemStyleTop
        : valuesAtlasBudget[index].value !== 0 && valuesLegacyBudget[index].value !== 0
        ? itemStyledNoBorders
        : itemStyleTop,
  })) as ValueSeriesBreakdownChart[];

  const newLegacyBudgetWithBorders = valuesLegacyBudget.map((item, index: number) => ({
    value: item.value,
    itemStyle:
      valuesAtlasBudget[index].value === 0 && valuesScopeBudget[index].value === 0 ? itemStyleFull : itemStyleTop,
  })) as ValueSeriesBreakdownChart[];
  const isDisabled = selectedBreakdownMetric === 'Budget' && selectedBreakdownGranularity === 'Monthly';
  const handleResetFilterBreakDownChart = () => {
    setSelectedBreakdownMetric('Budget');
    setSelectedBreakdownGranularity('Monthly');
  };
  // This should construct from the API
  const seriesBreakDownChart = [
    {
      name: 'Endgame Atlas',
      data: newAtlasBudgetWithBorders,
      type: 'bar',
      stack: 'x',
      barWidth,
      showBackground: false,
      visible: true,
    },
    {
      name: 'Endgame Scopes',
      data: newScopeBudgetWithBorders,
      type: 'bar',
      stack: 'x',
      barWidth,
      showBackground: false,
      visible: true,
    },
    {
      name: 'MakerDAO Legacy',
      visible: true,
      data: newLegacyBudgetWithBorders,
      type: 'bar',
      stack: 'x',
      showBackground: false,
      barWidth,
    },
  ] as SeriesBreakDownChart[];

  const numColors = seriesBreakDownChart.length;
  const colorsLight = generateColorPalette(existingColors.length, numColors - existingColors.length, existingColors);
  const colorsDark = generateColorPalette(180, numColors, existingColorsDark);
  const seriesBreakDownChartWithColors = seriesBreakDownChart.map((series, index) => ({
    ...series,
    itemStyle: {
      color: isLight ? colorsLight[index] : colorsDark[index],
    },
  }));
  const legendBreakDownChart = seriesBreakDownChart.map((series, index) => ({
    name: series.name,
    color: isLight ? colorsLight[index] : colorsDark[index],
    data: series.data,
  }));

  return {
    selectedBreakdownMetric,
    selectedBreakdownGranularity,
    handleBreakdownMetricChange,
    handleBreakdownGranularityChange,
    newAtlasBudgetWithBorders,
    newScopeBudgetWithBorders,
    newLegacyBudgetWithBorders,
    isShowSeries,
    setIsShowSeries,
    isDisabled,
    handleResetFilterBreakDownChart,
    seriesBreakDownChartWithColors,
    legendBreakDownChart,
  };
};

export default useBreakdownChart;
