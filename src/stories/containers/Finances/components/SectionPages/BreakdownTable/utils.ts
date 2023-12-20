import {
  mockDataTableAnnualArray,
  mockDataTableMonthlyArray,
  mockDataTableQuarterlyArray,
  mockDataTableSemiAnnualArray,
} from '@ses/containers/Finances/utils/mockData';
import { monthAbbreviations } from '@ses/containers/Finances/utils/utils';
import type {
  Metric,
  MetricValues,
  MetricsWithAmount,
  PeriodicSelectionFilter,
  TableFinances,
} from '@ses/containers/Finances/utils/types';
import type {
  Analytic,
  AnalyticGranularity,
  BreakdownBudgetAnalytic,
  BudgetAnalytic,
  BudgetMetric,
} from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';

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
export const totalQuarterly = (data: Record<string, MetricsWithAmount[]>) => {
  const moment: Map<string, number> = new Map();
  const resultQuarterly: MetricsWithAmount[] = [];

  Object.entries(data).forEach(([, value]) => {
    const metrics = value;

    metrics.forEach((metric) => {
      const { name, amount } = metric;

      if (!moment.has(name)) {
        moment.set(name, amount);
      } else {
        const currentAmount = moment.get(name);
        moment.set(name, (currentAmount || 0) + amount);
      }
    });
  });

  moment.forEach((amount, name) => {
    resultQuarterly.push({
      name: name as Metric,
      amount,
    });
  });
  return resultQuarterly;
};
const getCorrectMetricHeaderTable = (metric: string) => {
  switch (metric) {
    case 'Budget':
      return 'budget';
    case 'Actual':
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
const getLabelFromKeyBudget = (metric: string) => {
  switch (metric) {
    case 'budget':
      return 'Budget';
    case 'actuals':
      return 'Actual';
    case 'forecast':
      return 'Forecast';
    case 'paymentsOnChain':
      return 'Net Expenses On-chain';
    case 'paymentsOffChainIncluded':
      return 'Net Expenses Off-chain';
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

// Prepare the data for name value in the header
export const prepareDataForHeader = (data: Record<string, BudgetMetric>) => {
  const metricAmount: Record<string, MetricsWithAmount[]> = {};
  Object.keys(data).forEach((item) => {
    const metric = data[item];
    const metrics: MetricsWithAmount[] = [];
    Object.keys(metric).forEach((key) => {
      const newMetric = {
        name: getLabelFromKeyBudget(key),
        amount: metric[key as keyof BudgetMetric].value,
      } as MetricsWithAmount;
      metrics.push(newMetric);
    });
    metricAmount[item] = [...metrics];
  });
  return metricAmount;
};

// Prepare data for monthly filter
export const headerTableMonthlyPeriod = (analytics: BreakdownBudgetAnalytic | undefined) => {
  const monthly: Record<string, BudgetMetric> = {};

  if (analytics) {
    Object.keys(analytics).forEach((key) => {
      const budgetMetric = analytics[key];

      budgetMetric.forEach((budget, index) => {
        const monthAbbreviation = monthAbbreviations[index];

        if (!monthly[monthAbbreviation]) {
          monthly[monthAbbreviation] = { ...budget };
        } else {
          for (const metricKey in budget) {
            if (Object.prototype.hasOwnProperty.call(budget, metricKey)) {
              monthly[monthAbbreviation][metricKey as keyof BudgetMetric].value +=
                budget[metricKey as keyof BudgetMetric].value;
              monthly[monthAbbreviation][metricKey as keyof BudgetMetric].unit =
                budget[metricKey as keyof BudgetMetric].unit;
            }
          }
        }
      });
    });
  }

  return monthly;
};

// Prepare data for Annually
export const headerTableMonthlyAnnually = (analytics: BudgetAnalytic | undefined, year: string) => {
  const annually: Record<string, BudgetMetric> = {
    [year]: {
      actuals: {
        unit: 'DAI',
        value: 0,
      },
      budget: {
        unit: 'DAI',
        value: 0,
      },
      forecast: {
        unit: 'DAI',
        value: 0,
      },
      paymentsOffChainIncluded: {
        unit: 'DAI',
        value: 0,
      },
      paymentsOnChain: {
        unit: 'DAI',
        value: 0,
      },
    },
  };

  if (analytics) {
    Object.keys(analytics).forEach((key) => {
      const budgetMetric = analytics[key];

      if (budgetMetric) {
        annually[year] = {
          actuals: {
            value: annually[year].actuals.value + (budgetMetric.actuals?.value || 0),
            unit: annually[year].actuals.unit,
          },
          budget: {
            value: annually[year].budget.value + (budgetMetric.budget?.value || 0),
            unit: annually[year].actuals.unit,
          },
          forecast: {
            value: annually[year].forecast.value + (budgetMetric.forecast?.value || 0),
            unit: annually[year].actuals.unit,
          },
          paymentsOnChain: {
            value: annually[year].paymentsOnChain.value + (budgetMetric.paymentsOnChain?.value || 0),
            unit: annually[year].actuals.unit,
          },
          paymentsOffChainIncluded: {
            value: annually[year].paymentsOffChainIncluded.value + (budgetMetric.paymentsOffChainIncluded?.value || 0),
            unit: annually[year].actuals.unit,
          },
        };
      }
    });
  }
  return annually;
};

// Prepare data for SemiAnnual
export const headerTableSemiannual = (analytics: BreakdownBudgetAnalytic | undefined, year: string) => {
  const semiAnnual: Record<string, BudgetMetric> = {};
  const lastPartYear = year.slice(-2);

  if (analytics) {
    Object.keys(analytics).forEach((key) => {
      const budgetMetric = analytics[key];

      budgetMetric.forEach((budget, index) => {
        const monthKey = `H${index + 1}’${lastPartYear}`;

        if (!semiAnnual[monthKey]) {
          semiAnnual[monthKey] = { ...budget };
        } else {
          semiAnnual[monthKey] = {
            ...semiAnnual[monthKey],
            actuals: {
              value: semiAnnual[monthKey].actuals.value + budget.actuals.value,
              unit: budget.actuals.unit,
            },
            budget: {
              value: semiAnnual[monthKey].budget.value + budget.budget.value,
              unit: budget.budget.unit,
            },
            forecast: {
              value: semiAnnual[monthKey].forecast.value + budget.forecast.value,
              unit: budget.forecast.unit,
            },
            paymentsOnChain: {
              value: semiAnnual[monthKey].paymentsOnChain.value + budget.paymentsOnChain.value,
              unit: budget.paymentsOnChain.unit,
            },
            paymentsOffChainIncluded: {
              value: semiAnnual[monthKey].paymentsOffChainIncluded.value + budget.paymentsOffChainIncluded.value,
              unit: budget.paymentsOffChainIncluded.unit,
            },
          };
        }
      });
    });
  }
  return semiAnnual;
};

export const getHeaderValuesByPeriod = (
  periodFilter: PeriodicSelectionFilter,
  year: string,
  budgetsAnalyticsQuarterly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalyticsMonthly: BreakdownBudgetAnalytic | undefined,
  budgetsAnalytics: BudgetAnalytic | undefined,
  budgetsAnalyticsSemiAnnual: BreakdownBudgetAnalytic | undefined,
  activeMetrics: string[]
) => {
  let headerValues = {};
  if (periodFilter === 'Quarterly') {
    const headerQuarterly = headerTableQuarterlyPeriod(budgetsAnalyticsQuarterly, year);
    const headerFilterQuarterly = filterPropertiesHeader(headerQuarterly, activeMetrics);
    headerValues = prepareDataForHeader(headerFilterQuarterly);
  }
  if (periodFilter === 'Monthly') {
    const headerMonthly = headerTableMonthlyPeriod(budgetsAnalyticsMonthly);
    const headerFilterMonthly = filterPropertiesHeader(headerMonthly, activeMetrics);
    headerValues = prepareDataForHeader(headerFilterMonthly);
  }
  if (periodFilter === 'Annually') {
    const headerAnnually = headerTableMonthlyAnnually(budgetsAnalytics, year);
    const headerFilterMonthly = filterPropertiesHeader(headerAnnually, activeMetrics);
    headerValues = prepareDataForHeader(headerFilterMonthly);
  }
  if (periodFilter === 'Semi-annual') {
    const headerSemiAnnually = headerTableSemiannual(budgetsAnalyticsSemiAnnual, year);
    const headerFilterSemiAnnual = filterPropertiesHeader(headerSemiAnnually, activeMetrics);
    headerValues = prepareDataForHeader(headerFilterSemiAnnual);
  }

  return headerValues;
};

export const getSummaryFromHeaderValues = (headerValues: Record<string, MetricsWithAmount[]>) =>
  totalQuarterly(headerValues);

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

export const parseAnalyticsForTable = (analytic: Analytic | undefined, budgets: Budget[]): TableFinances[] => {
  console.log('analytic', analytic, budgets);
  return [];
};
