export type FilterDoughnut = 'Actual' | 'Forecast' | 'Net Expenses On-chain' | 'Net Expenses Off-chain' | 'Budget';

export interface NavigationCard {
  svgImage: JSX.Element;
  title: string;
  description?: React.ReactNode;
  href: string;
  totalDai?: number;
  color: string;
}
