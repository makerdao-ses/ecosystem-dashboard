import type { BudgetAnalytic, BudgetMetric } from '@ses/core/models/interfaces/analytic';

export class BudgetAnalyticBuilder {
  private readonly _budgetAnalytic: BudgetAnalytic;

  constructor() {
    this._budgetAnalytic = {};
  }

  withMetric(key: string, metric: BudgetMetric): BudgetAnalyticBuilder {
    this._budgetAnalytic[key] = metric;
    return this;
  }

  build(): BudgetAnalytic {
    return this._budgetAnalytic;
  }
}
