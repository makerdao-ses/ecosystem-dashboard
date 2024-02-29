import { useMediaQuery } from '@mui/material';
import {
  existingColors,
  existingColorsDark,
  generateColorPalette,
  hasSubLevels,
  formatBudgetName,
} from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/light';
import { useMemo, useState } from 'react';
import { getCorrectMetricValuesOverViewChart } from './utils';
import type { BudgetMetricWithName, DoughnutSeries } from '@ses/containers/Finances/utils/types';
import type { AnalyticMetric, BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

export const useCardChartOverview = (
  budgets: Budget[],
  budgetsAnalytics: BreakdownBudgetAnalytic | undefined,
  levelNumber: number,
  allBudgets: Budget[],
  codePath: string
) => {
  const isTable = useMediaQuery(lightTheme.breakpoints.between('tablet_768', 'desktop_1024'));
  const isDesk1024 = useMediaQuery(lightTheme.breakpoints.between('desktop_1024', 'desktop_1280'));
  const isDesk1280 = useMediaQuery(lightTheme.breakpoints.up('desktop_1280'));

  const isHasSubLevels = hasSubLevels(codePath, allBudgets);

  const [selectedMetric, setSelectedMetric] = useState<AnalyticMetric>('Budget');
  const { isLight } = useThemeContext();
  const colorsLight = generateColorPalette(
    existingColors.length,
    budgets.length - existingColors.length,
    existingColors
  );

  const colorsDark = generateColorPalette(180, budgets.length, existingColorsDark);
  const budgetWithNotChildren = useMemo(() => {
    const data = {
      budget: 0,
      forecast: 0,
      actuals: 0,
    };

    if (!budgetsAnalytics) {
      // return 0 values to avoid having an empty UI

      return data;
    }

    const values = Object.values(budgetsAnalytics ?? {});
    values.forEach((item) => {
      item.forEach((element) => {
        data.budget += element.budget.value;
        data.forecast += element.forecast.value;
        data.actuals += element.actuals.value;
      });
    });

    return data;
  }, [budgetsAnalytics]);

  const metric: { [metric: string]: number } = {
    actuals: 0,
    forecast: 0,
    budget: 0,
    paymentsOnChain: 0,
    protocolNetOutflow: 0,
    paymentsOffChainIncluded: 0,
  };

  const budgetMetrics: Record<string, BudgetMetricWithName> = {};
  budgets.forEach((budget) => {
    const budgetKey = budget.codePath;
    const budgetName = formatBudgetName(budget.name);
    if (budgetMetrics[budget.codePath]) {
      const uniqueKey = `${budgetKey}-${budget.id}`;
      budgetMetrics[uniqueKey] = {
        name: budgetName,
        actuals: {
          unit: 'DAI',
          value: 0,
        },

        forecast: {
          unit: 'DAI',
          value: 0,
        },
        budget: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOnChain: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOffChainIncluded: {
          unit: 'DAI',
          value: 0,
        },
        protocolNetOutflow: {
          unit: 'DAI',
          value: 0,
        },
        code: budget.code || 'No-code',
      };
    } else {
      budgetMetrics[budgetKey] = {
        name: budgetName,
        actuals: {
          unit: 'DAI',
          value: 0,
        },

        forecast: {
          unit: 'DAI',
          value: 0,
        },
        budget: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOnChain: {
          unit: 'DAI',
          value: 0,
        },
        paymentsOffChainIncluded: {
          unit: 'DAI',
          value: 0,
        },
        protocolNetOutflow: {
          unit: 'DAI',
          value: 0,
        },
        code: budget.code || 'No-code',
      };
    }
  });
  if (budgetsAnalytics !== undefined) {
    for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
      const budgetMetric = budgetsAnalytics[budgetMetricKey];
      const correspondingBudget = budgets.find((budget) => budget.codePath === budgetMetricKey);
      // use the name of budget or add label
      const budgetName = correspondingBudget ? formatBudgetName(correspondingBudget.name) : 'There is not name';
      const budgetCode = correspondingBudget?.code || 'No-code';
      metric.actuals += budgetMetric[0].actuals.value || 0;
      metric.forecast += budgetMetric[0].forecast.value || 0;
      metric.budget += budgetMetric[0].budget.value || 0;
      metric.paymentsOnChain += budgetMetric[0].paymentsOnChain.value || 0;
      metric.protocolNetOutflow += budgetMetric[0].protocolNetOutflow.value || 0;
      budgetMetrics[budgetMetricKey] = {
        name: budgetName,
        actuals: budgetMetric[0].actuals,
        forecast: budgetMetric[0].forecast,
        budget: budgetMetric[0].budget,
        paymentsOnChain: budgetMetric[0].paymentsOnChain,
        paymentsOffChainIncluded: budgetMetric[0].paymentsOffChainIncluded,
        protocolNetOutflow: budgetMetric[0].protocolNetOutflow,
        code: budgetCode,
      };
    }
  }

  const handleSelectedMetric = (metric: AnalyticMetric) => {
    setSelectedMetric(metric);
  };
  const doughnutSeriesData: DoughnutSeries[] = Object.keys(budgetMetrics).map((item, index) => {
    let value;
    switch (selectedMetric) {
      case 'Actuals':
        value = budgetMetrics[item].actuals.value || 0;
        break;
      case 'Forecast':
        value = budgetMetrics[item].forecast.value || 0;
        break;
      case 'PaymentsOnChain':
        value = budgetMetrics[item].paymentsOnChain.value || 0;
        break;
      case 'ProtocolNetOutflow':
        value = budgetMetrics[item].protocolNetOutflow.value || 0;
        break;
      case 'Budget':
        value = budgetMetrics[item].budget.value || 0;
        break;
      default:
        value = budgetMetrics[item].budget.value || 0;
        break;
    }
    const keyMetricValue = getCorrectMetricValuesOverViewChart(selectedMetric);

    return {
      name: budgetMetrics[item].name || 'No name' + index,
      code: budgetMetrics[item].code || 'No code' + index,
      value,
      originalValue: value,
      actuals: budgetMetrics[item].actuals.value,
      budgetCap: budgetMetrics[item].budget.value,
      percent: Math.round(percentageRespectTo(value, metric[keyMetricValue])),
      color: isLight ? colorsLight[index] : colorsDark[index],
      isVisible: true,
      originalColor: isLight ? colorsLight[index] : colorsDark[index],
    };
  });
  const changeAlignment = doughnutSeriesData.length > 4;

  const showSwiper =
    !!((isTable || isDesk1024) && doughnutSeriesData.length >= 4) || (isDesk1280 && doughnutSeriesData.length >= 10);
  const numberSliderPerLevel = (isTable || isDesk1024) && levelNumber < 3 ? 3 : 5;

  return {
    actuals: isHasSubLevels ? metric.actuals : budgetWithNotChildren.actuals,
    budgetCap: isHasSubLevels ? metric.budget : budgetWithNotChildren.budget,
    selectedMetric,
    handleSelectedMetric,
    doughnutSeriesData,
    changeAlignment,
    showSwiper,
    numberSliderPerLevel,
    isLoading: false,
  };
};
