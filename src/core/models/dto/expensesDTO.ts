export interface ExpenseDto {
  category: string;
  actuals: number;
  budget: string;
  budgetCap: number;
  discontinued: number | null;
  period: string;
  prediction: number;
}

export enum ExpenseGranularity {
  monthly = 'monthly',
  quarterly = 'quarterly',
  annual = 'annual',
  total = 'total',
}
