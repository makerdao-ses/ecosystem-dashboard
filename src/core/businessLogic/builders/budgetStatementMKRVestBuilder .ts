import type { BudgetStatementMKRVestDto } from '@ses/core/models/dto/coreUnitDTO';

export class BudgetStatementMKRVestBuilder {
  private readonly _budgetStatementMKRVest: BudgetStatementMKRVestDto;

  constructor() {
    this._budgetStatementMKRVest = {
      mkrAmount: 0,
      mkrAmountOld: 0,
      vestingDate: '',
      comments: '',
    };
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

  build(): BudgetStatementMKRVestDto {
    return this._budgetStatementMKRVest;
  }
}
