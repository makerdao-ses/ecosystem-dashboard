export type AnalyticGranularity =
  | 'total'
  | 'annual'
  | 'semiAnnual'
  | 'quarterly'
  | 'monthly'
  | 'weekly'
  | 'daily'
  | 'hourly';

export type AnalyticMetric =
  | 'Actuals'
  | 'Budget'
  | 'Forecast'
  | 'PaymentsOnChain'
  | 'PaymentsOffChainIncluded'
  | 'ProtocolNetOutflow';

export interface AnalyticSeriesRow {
  dimensions: {
    name: 'budget';
    path: string;
  }[];
  metric: AnalyticMetric;
  unit: 'DAI';
  value: number;
  sum: number;
}

export interface AnalyticSeries {
  period: AnalyticGranularity;
  start: string;
  end: string;
  rows: AnalyticSeriesRow[];
}
export interface Analytic {
  series: AnalyticSeries[];
}

export interface AnalyticFilter {
  filter: {
    granularity: AnalyticGranularity;
    start: string;
    end: string;
    metrics: AnalyticMetric[];
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
  protocolNetOutflow: ValueAndUnit;
}

export interface BreakdownBudgetAnalytic {
  [key: string]: BudgetMetric[];
}
