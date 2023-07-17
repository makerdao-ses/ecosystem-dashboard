import type { BudgetStatementMKRVest } from '@ses/core/models/interfaces/budgetStatement';

export class BudgetStatementMKRVestBuilder {
  private readonly _budgetStatementMKRVest: BudgetStatementMKRVest;

  constructor() {
    this._budgetStatementMKRVest = {
      id: '0',
      mkrAmount: 0,
      mkrAmountOld: 0,
      vestingDate: '',
      comments: '',
    };
  }

  withId(id: string): BudgetStatementMKRVestBuilder {
    this._budgetStatementMKRVest.id = id;
    return this;
  }

  withMKRAmount(mkrAmount: number): BudgetStatementMKRVestBuilder {
    this._budgetStatementMKRVest.mkrAmount = mkrAmount;
    return this;
  }

  withMKRAmountOld(mkrAmountOld: number): BudgetStatementMKRVestBuilder {
    this._budgetStatementMKRVest.mkrAmountOld = mkrAmountOld;
    return this;
  }

  withVestingDate(vestingDate: string): BudgetStatementMKRVestBuilder {
    this._budgetStatementMKRVest.vestingDate = vestingDate;
    return this;
  }

  withComments(comments: string): BudgetStatementMKRVestBuilder {
    this._budgetStatementMKRVest.comments = comments;
    return this;
  }

  build(): BudgetStatementMKRVest {
    return this._budgetStatementMKRVest;
  }
}
