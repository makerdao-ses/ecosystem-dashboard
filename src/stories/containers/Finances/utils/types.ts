import type { SortEnum } from '@ses/core/enums/sortEnum';

export type FilterDoughnut = 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain' | 'Budget';

export interface NavigationCard {
  svgImage: JSX.Element;
  title: string;
  description?: React.ReactNode;
  href: string;
  totalDai?: number;
  valueDai?: number;
  color: string;
}

export interface DoughnutSeries {
  name: string;
  value: number;
  percent: number;
  actuals: number;
  budgetCap: number;
  color: string;
}

export type PeriodicSelectionFilter = 'Monthly' | 'Quarterly' | 'Annually';

export interface DelegateExpenseTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
  hidden?: boolean;
  sortReverse?: boolean;
}
