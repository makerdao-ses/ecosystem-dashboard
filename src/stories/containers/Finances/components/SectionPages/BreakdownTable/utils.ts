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

export const filterMetricValues = (
  metric: MetricValues,
  activeMetrics: (keyof MetricValues)[]
): Partial<MetricValues> => {
  const filteredMetrics: MetricValues = {} as MetricValues;
  if (metric && filteredMetrics) {
    for (const key of activeMetrics) {
      filteredMetrics[key] = metric[key];
    }
  }
  return filteredMetrics;
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

export const removePatternAfterSlash = (input: string) => input.replace(/\/\*.*$/, '');

export const getCorrectValuesTableFilter = (metric: string, isMobile: boolean) => {
  if (!isMobile) return metric;

  switch (metric) {
    case 'Net Protocol Outflow':
      return 'Prtcol Outfl';
    case 'Net Expenses On-chain':
      return 'Net On-chain';
    default:
      return metric;
  }
};
