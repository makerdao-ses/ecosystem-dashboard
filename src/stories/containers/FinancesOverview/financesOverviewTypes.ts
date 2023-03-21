import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export type CostBreakdownFilterValue = 'By budget' | 'By Category';

export interface ExtendedExpense extends ExpenseDto {
  shortCode?: string;
  name: string;
}
