import type { BudgetAnalytic, BudgetMetric } from '@ses/core/models/interfaces/analytic';

export class BudgetAnalyticBuilder {
  private readonly _budgetAnalytic: BudgetAnalytic;

  constructor() {
    this._budgetAnalytic = {
      codePath: '',
      metric: {
        actuals: {
          value: 0,
          unit: 'DAI',
        },
        budget: {
          value: 0,
          unit: 'DAI',
        },
        forecast: {
          value: 0,
          unit: 'DAI',
        },
        paymentsOnChain: {
          value: 0,
          unit: 'DAI',
        },
        paymentsOffChainIncluded: {
          value: 0,
          unit: 'DAI',
        },
      },
    };
  }

  withCodePath(codePath: string): BudgetAnalyticBuilder {
    this._budgetAnalytic.codePath = codePath;
    return this;
  }

  withMetric(metric: BudgetMetric): BudgetAnalyticBuilder {
    this._budgetAnalytic.metric = metric;
    return this;
  }

  build(): BudgetAnalytic {
    return this._budgetAnalytic;
  }
}
