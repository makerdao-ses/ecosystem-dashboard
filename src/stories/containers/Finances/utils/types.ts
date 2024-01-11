import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chartDTO';
import type { BudgetMetric } from '@ses/core/models/interfaces/analytic';
import type { Team } from '@ses/core/models/interfaces/team';
import type { DateTime } from 'luxon';

export type FilterDoughnut = 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain' | 'Budget';

export interface NavigationCard {
  image: string;
  title: string;
  description?: string;
  href: string;
  totalDai?: number;
  valueDai?: number;
  color: string;
  code?: string;
}

export interface DoughnutSeries {
  name: string;
  value: number;
  percent: number;
  actuals: number;
  budgetCap: number;
  color: string;
  code?: string;
  isVisible?: boolean;
  originalColor?: string;
  originalValue?: number;
}

export interface BarChartSeries {
  name: string;
  seriesName: string;
  color: string;
  value: number;
}

export type PeriodicSelectionFilter = 'Monthly' | 'Quarterly' | 'Annually' | 'Semi-annual';

export interface DelegateExpenseTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
  hidden?: boolean;
  sortReverse?: boolean;
}

// Update Date for Expense when Api is ready
export interface MomentDataItem extends Team {
  reportMonth: DateTime;
  totalActuals: number;
  lastModified: DateTime;
}
export type Metric = 'Budget' | 'Actuals' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain';
export interface MetricValues {
  Budget: number;
  Actuals: number;
  Forecast: number;
  PaymentsOnChain: number;
  PaymentsOffChainIncluded: number;
}

export interface ValueSeriesBreakdownChart {
  value: number;
  itemStyle: {
    borderRadius: [number, number, number, number];
  };
}

export interface SeriesBreakdownChart {
  name: string;
  data: ValueSeriesBreakdownChart[];
}

export interface BudgetMetricWithName extends BudgetMetric {
  name: string;
  code?: string;
}

export interface BreakdownChartSeriesData {
  name: string;
  data: ValuesDataWithBorder[];
  dataOriginal: ValuesDataWithBorder[];
  type: 'bar';
  stack: 'x';
  barWidth: number;
  showBackground: boolean;
  itemStyle: {
    color: string;
    colorOriginal: string;
  };
  isVisible: boolean;
}

export interface LineChartSeriesData {
  name: string;
  data: number[];
  type: 'line';
  itemStyle: {
    color: string;
  };
  isVisible: boolean;
}

export interface ItemRow {
  name: string;
  isMain?: boolean;
  columns: MetricValues[];
}

export interface TableFinances {
  tableName: string;
  rows: ItemRow[];
  others?: boolean;
}

export interface RowItemMetrics {
  [key: string]: MetricValues[];
}
