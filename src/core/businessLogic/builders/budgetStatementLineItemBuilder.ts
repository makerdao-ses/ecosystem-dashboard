import type { BudgetStatementLineItemDto } from '../../models/dto/coreUnitDTO';

export class BudgetStatementLineItemBuilder {
  private readonly _lineItem: BudgetStatementLineItemDto;

  constructor() {
    this._lineItem = {
      actual: 0,
      forecast: 0,
      payment: 0,
      budgetCategory: '',
      headcountExpense: false,
      comments: '',
      month: '',
      budgetCap: 0,
      group: '',
      budgetStatementWalletId: '',
    };
  }

  withActual(actual: number): BudgetStatementLineItemBuilder {
    this._lineItem.actual = actual;
    return this;
  }

  withForecast(forecast: number): BudgetStatementLineItemBuilder {
    this._lineItem.forecast = forecast;
    return this;
  }

  withPayment(payment: number): BudgetStatementLineItemBuilder {
    this._lineItem.payment = payment;
    return this;
  }

  withBudgetCategory(budgetCategory: string): BudgetStatementLineItemBuilder {
    this._lineItem.budgetCategory = budgetCategory;
    return this;
  }

  withHeadcountExpense(headcountExpense: boolean): BudgetStatementLineItemBuilder {
    this._lineItem.headcountExpense = headcountExpense;
    return this;
  }

  withComments(comments: string): BudgetStatementLineItemBuilder {
    this._lineItem.comments = comments;
    return this;
  }

  withMonth(month: string): BudgetStatementLineItemBuilder {
    this._lineItem.month = month;
    return this;
  }

  withBudgetCap(budgetCap: number): BudgetStatementLineItemBuilder {
    this._lineItem.budgetCap = budgetCap;
    return this;
  }

  withGroup(group: string): BudgetStatementLineItemBuilder {
    this._lineItem.group = group;
    return this;
  }

  withBudgetStatementWalletId(budgetStatementWalletId: string): BudgetStatementLineItemBuilder {
    this._lineItem.budgetStatementWalletId = budgetStatementWalletId;
    return this;
  }

  build(): BudgetStatementLineItemDto {
    return this._lineItem;
  }
}
