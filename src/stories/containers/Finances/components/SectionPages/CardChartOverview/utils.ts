import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';

export const getTotalAllMetricsBudget = (budgetsAnalytics: BudgetAnalytic | undefined) => {
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
      metric.actuals += budgetMetric.actuals.value || 0;
      metric.forecast += budgetMetric.forecast.value || 0;
      metric.budget += budgetMetric.budget.value || 0;
      metric.paymentsOnChain += budgetMetric.paymentsOnChain.value || 0;
    }
  }
  return metric;
};
