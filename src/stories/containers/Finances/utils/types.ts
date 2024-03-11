import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { ValuesDataWithBorder } from '@ses/core/models/dto/chartDTO';
import type { BudgetMetric } from '@ses/core/models/interfaces/analytic';
import type { Team } from '@ses/core/models/interfaces/team';
import type { EChartsOption } from 'echarts-for-react';
import type { DateTime } from 'luxon';

export interface NavigationCard {
  image: string;
  title: string;
  description?: string;
  href: string;
  totalDai?: number;
  valueDai?: number;
  color: string;
  code?: string;
  codePath?: string;
  percent: number;
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

export interface MetricValues {
  Budget: number;
  Forecast: number;
  ProtocolNetOutflow: number;
  PaymentsOnChain: number;
  Actuals: number;
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
  isSummaryRow?: boolean;
  codePath?: string;
  columns: MetricValues[];
}

export interface TableFinances {
  tableName: string;
  rows: ItemRow[];
}

export interface RowItemMetrics {
  [key: string]: MetricValues[];
}

export interface LegendItemsWaterfall {
  title: string;
  color: string;
}

export interface WaterfallChartSeriesData {
  name: string;
  data: (number | string)[];
  barWidth?: number;
  barMinHeight?: number;
  stack?: string;
  type: string;
  color?: string;

  label?: {
    fontFamily?: string;
    formatter?: (params: EChartsOption) => string;
    show?: boolean;
    color?: string | ((params: EChartsOption) => string);
    position?: string;
    fontSize?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rich?: any;
  };
  itemStyle?: {
    borderRadius?: number;
    color?: ((params: EChartsOption) => string) | string;
  };
  zIndex?: number;
  isVisible?: boolean;
}

export interface LineWaterfall {
  name?: string;
  lineStyle?: {
    width?: number;
    zIndex?: number;
    z: number;
    join?: string;
    borderType?: string;
    type?: string;
    color?: string;
    cap?: string;
  };
  type?: string;
  symbol?: string;
  z?: number;
  step?: string;
  data?: (number | string)[];
}

export interface WaterfallLineData {
  value: number;
  color: string;
}
