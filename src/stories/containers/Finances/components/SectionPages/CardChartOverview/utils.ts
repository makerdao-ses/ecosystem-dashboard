import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';

export const getTotalAllMetricsBudget = (budgetsAnalytics: BreakdownBudgetAnalytic | undefined) => {
  const metric = {
    actuals: 0,
    forecast: 0,
    budget: 0,
    paymentsOnChain: 0,
    paymentsOffChainIncluded: 0,
  };

  if (budgetsAnalytics !== undefined) {
    for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
      const budgetMetric = budgetsAnalytics[budgetMetricKey];
      metric.actuals += budgetMetric[0].actuals.value || 0;
      metric.forecast += budgetMetric[0].forecast.value || 0;
      metric.budget += budgetMetric[0].budget.value || 0;
      metric.paymentsOnChain += budgetMetric[0].paymentsOnChain.value || 0;
    }
  }
  return metric;
};

export const getShortCode = (code: string) => (code.length > 8 ? code.substring(0, 8) + '...' : code);

export const getCorrectMetricValuesOverViewChart = (metric: string) => {
  if (metric === 'Forecast' || metric === 'Actuals' || metric === 'Budget') return metric.toLocaleLowerCase();
  switch (metric) {
    case 'Net Expenses On-chain':
      return 'paymentsOnChain';
    case 'Net Expenses Off-chain':
      return 'paymentsOffChainIncluded';
    default:
      return 'budget';
  }
};
