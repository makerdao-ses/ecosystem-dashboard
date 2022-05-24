import { BudgetStatementFteDao } from '../../../stories/containers/cu-table/cu-table.api';

export class BudgetStatementFteBuilder {
  private readonly _budgetStatementFte: BudgetStatementFteDao;

  constructor() {
    this._budgetStatementFte = {
      ftes: 0,
      month: '',
    } as BudgetStatementFteDao;
  }

  withMonth(month: string): BudgetStatementFteBuilder {
    this._budgetStatementFte.month = month;
    return this;
  }

  withFtes(ftes: number): BudgetStatementFteBuilder {
    this._budgetStatementFte.ftes = ftes;
    return this;
  }

  build(): BudgetStatementFteDao {
    return this._budgetStatementFte;
  }
}
