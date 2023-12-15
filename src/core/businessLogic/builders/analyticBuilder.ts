import type { BreakdownBudgetAnalytic, BudgetMetric } from '@ses/core/models/interfaces/analytic';

export class BreakdownBudgetAnalyticBuilder {
  private readonly _breakdownBudgetAnalytic: BreakdownBudgetAnalytic;

  constructor() {
    this._breakdownBudgetAnalytic = {};
  }

  withCategory(key: string, metrics: BudgetMetric[]): BreakdownBudgetAnalyticBuilder {
    this._breakdownBudgetAnalytic[key] = metrics;
    return this;
  }

  build(): BreakdownBudgetAnalytic {
    return this._breakdownBudgetAnalytic;
  }
}
