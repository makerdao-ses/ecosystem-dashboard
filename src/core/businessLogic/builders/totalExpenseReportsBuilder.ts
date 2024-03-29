import type { ExtendedExpense } from '@ses/containers/FinancesOverview/financesOverviewTypes';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export class TotalExpenseReportsBuilder {
  private readonly _expense: ExpenseDto;

  constructor() {
    this._expense = {
      category: '*',
      actuals: 0,
      budgetCap: 0,
      discontinued: 0,
      prediction: 0,
      budget: '/makerdao/core-units',
      period: '',
    } as ExpenseDto;
  }

  withCategory(category: string): TotalExpenseReportsBuilder {
    this._expense.category = category;
    return this;
  }

  withActuals(actuals: number): TotalExpenseReportsBuilder {
    this._expense.actuals = actuals;
    return this;
  }

  withBudgetCap(budgetCap: number): TotalExpenseReportsBuilder {
    this._expense.budgetCap = budgetCap;
    return this;
  }

  withDiscontinued(discontinued: number): TotalExpenseReportsBuilder {
    this._expense.discontinued = discontinued;
    return this;
  }

  withPrediction(prediction: number): TotalExpenseReportsBuilder {
    this._expense.prediction = prediction;
    return this;
  }

  withBudget(budget: string): TotalExpenseReportsBuilder {
    this._expense.budget = budget;
    return this;
  }

  withPeriod(period: string): TotalExpenseReportsBuilder {
    this._expense.period = period;
    return this;
  }

  withQuarterPeriod(year: number, quarter: number): TotalExpenseReportsBuilder {
    this._expense.period = `${year}-Q${quarter}`;
    return this;
  }

  withMonthlyPeriod(year: number, month: number): TotalExpenseReportsBuilder {
    this._expense.period = `${year}-${month < 10 ? `0${month}` : month}`;
    return this;
  }

  withAnnualPeriod(year: number): TotalExpenseReportsBuilder {
    this._expense.period = `${year}`;
    return this;
  }

  extend(shortCode: string, name: string): TotalExpenseReportsBuilder {
    const ref = this._expense as ExtendedExpense;
    ref.shortCode = shortCode;
    ref.name = name;
    return this;
  }

  build(): ExpenseDto {
    return this._expense;
  }
}
