export interface Analytic {
  series: {
    period: 'total' | 'annual' | 'semiAnnual' | 'quarterly' | 'monthly' | 'weekly' | 'daily' | 'hourly';
    start: string;
    end: string;
    rows: {
      dimensions: {
        name: 'budget';
        path: string;
      }[];
      metric: 'Actuals' | 'Budget' | 'Forecast' | 'PaymentsOnChain' | 'PaymentsOffChainIncluded';
      unit: 'DAI';
      value: number;
      sum: number;
    }[];
  }[];
}

export interface AnalyticFilter {
  filter: {
    granularity: 'total' | 'annual' | 'semiAnnual' | 'quarterly' | 'monthly' | 'weekly' | 'daily' | 'hourly';
    start: string;
    end: string;
    metrics: ('Actuals' | 'Budget' | 'Forecast' | 'PaymentsOnChain' | 'PaymentsOffChainIncluded')[];
    currency: 'DAI';
    dimensions: {
      name: 'budget';
      select: string;
      lod: number;
    }[];
  };
}

export interface ValueAndUnit {
  value: number;
  unit: string;
}

export interface BudgetMetric {
  actuals: ValueAndUnit;
  budget: ValueAndUnit;
  forecast: ValueAndUnit;
  paymentsOnChain: ValueAndUnit;
  paymentsOffChainIncluded: ValueAndUnit;
}

export interface BudgetAnalytic {
  codePath: string;
  metric: BudgetMetric;
}
