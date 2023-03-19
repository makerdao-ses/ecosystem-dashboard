import type { ExtendedExpense } from '../financesOverviewTypes';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export const isCoreUnitExpense = (expense: ExpenseDto): boolean => expense.budget.includes('makerdao/core-unit');

export const mutableCombinationExpenseByAdding = (expenseA: ExtendedExpense, expenseB: ExtendedExpense): void => {
  expenseA.actuals += expenseB.actuals;
  expenseA.budget += expenseB.budget;
  expenseA.budgetCap += expenseB.budgetCap;
  expenseA.discontinued = (expenseA.discontinued ?? 0) + (expenseB.discontinued ?? 0);
  expenseA.prediction += expenseB.prediction;
};
