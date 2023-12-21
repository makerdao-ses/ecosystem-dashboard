import {
  mockDataTableAnnualArray,
  mockDataTableMonthlyArray,
  mockDataTableQuarterlyArray,
  mockDataTableSemiAnnualArray,
} from '@ses/containers/Finances/utils/mockData';
import type { MetricValues, PeriodicSelectionFilter } from '@ses/containers/Finances/utils/types';
import type { AnalyticGranularity, BreakdownBudgetAnalytic, BudgetMetric } from '@ses/core/models/interfaces/analytic';

export const headerTableQuarterlyPeriod = (analytics: BreakdownBudgetAnalytic | undefined, year: string) => {
  const quarterly: Record<string, BudgetMetric> = {};
  if (analytics) {
    Object.keys(analytics).forEach((key) => {
      const budgetMetric = analytics[key];

      budgetMetric.forEach((budget, index) => {
        if (!quarterly[`Q${index + 1} ${year}`]) {
          quarterly[`Q${index + 1} ${year}`] = { ...budget };
        } else {
          quarterly[`Q${index + 1} ${year}`] = {
            ...quarterly[`Q${index + 1} ${year}`],
            actuals: {
              value: quarterly[`Q${index + 1} ${year}`].actuals.value + budget.actuals.value,
              unit: budget.actuals.unit,
            },
            budget: {
              value: quarterly[`Q${index + 1} ${year}`].budget.value + budget.budget.value,
              unit: budget.budget.unit,
            },
            forecast: {
              value: quarterly[`Q${index + 1} ${year}`].forecast.value + budget.forecast.value,
              unit: budget.forecast.unit,
            },
            paymentsOnChain: {
              value: quarterly[`Q${index + 1} ${year}`].paymentsOnChain.value + budget.paymentsOnChain.value,
              unit: budget.paymentsOnChain.unit,
            },
            paymentsOffChainIncluded: {
              value:
                quarterly[`Q${index + 1} ${year}`].paymentsOffChainIncluded.value +
                budget.paymentsOffChainIncluded.value,
              unit: budget.paymentsOffChainIncluded.unit,
            },
          };
        }
      });
    });
  }
  return quarterly;
};
const getCorrectMetricHeaderTable = (metric: string) => {
  switch (metric) {
    case 'Budget':
      return 'budget';
    case 'Actuals':
      return 'actuals';
    case 'Forecast':
      return 'forecast';
    case 'Net Expenses On-chain':
      return 'paymentsOnChain';
    case 'Net Expenses Off-chain':
      return 'paymentsOffChainIncluded';
    default:
      return 'budget';
  }
};

// Filter metrics in the header
export const filterPropertiesHeader = (
  data: Record<string, BudgetMetric>,
  propertiesToKeep: string[]
): Record<string, BudgetMetric> => {
  const filteredData: Record<string, BudgetMetric> = {};
  const newMetrics = propertiesToKeep.map((element) => getCorrectMetricHeaderTable(element));

  Object.keys(data).forEach((key) => {
    const budget = data[key];
    const filteredBudget = {} as BudgetMetric;

    newMetrics.forEach((property) => {
      if (property in budget) {
        filteredBudget[property] = budget[property];
      }
    });

    filteredData[key] = filteredBudget;
  });
  return filteredData;
};

export const filterMetricValues = (metric: MetricValues, keys: (keyof MetricValues)[]): MetricValues => {
  const filteredMetrics: MetricValues = {} as MetricValues;
  for (const key of keys) {
    filteredMetrics[key] = metric[key];
  }
  return filteredMetrics;
};

// TODO:This is the function to map the analytics of the table
export const getDataTableFromPeriod = (period: PeriodicSelectionFilter) => {
  switch (period) {
    case 'Quarterly':
      return mockDataTableQuarterlyArray;
    case 'Annually':
      return mockDataTableAnnualArray;
    case 'Monthly':
      return mockDataTableMonthlyArray;
    case 'Semi-annual':
      return mockDataTableSemiAnnualArray;
    default:
      return mockDataTableQuarterlyArray;
  }
};

export const convertFilterToGranularity = (period: PeriodicSelectionFilter): AnalyticGranularity => {
  switch (period) {
    case 'Annually':
      return 'annual';
    case 'Quarterly':
      return 'quarterly';
    case 'Monthly':
      return 'monthly';
    case 'Semi-annual':
      return 'semiAnnual';
    default:
      return 'quarterly';
  }
};
