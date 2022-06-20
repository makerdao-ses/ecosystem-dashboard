import {
  BudgetStatementDao,
  BudgetStatementFteDao,
  BudgetStatementWalletDao
} from '../../../stories/containers/cu-table/cu-table.api';

export class BudgetStatementBuilder {
  private readonly _budgetStatement: BudgetStatementDao;

  constructor() {
    this._budgetStatement = {
      month: '',
      budgetStatementFTEs: [] as BudgetStatementFteDao[],
      budgetStatementWallet: [] as BudgetStatementWalletDao[],
      budgetStatus: '',
    } as BudgetStatementDao;
  }

  withMonth(month: string): BudgetStatementBuilder {
    this._budgetStatement.month = month;
    return this;
  }

  withBudgetStatus(budgetStatus: string): BudgetStatementBuilder {
    this._budgetStatement.budgetStatus = budgetStatus;
    return this;
  }

  addBudgetStatementFTE(budgetStatementFTE: BudgetStatementFteDao): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementFTEs.push(budgetStatementFTE);
    return this;
  }

  addBudgetStatementWallet(budgetStatementWallet: BudgetStatementWalletDao): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementWallet.push(budgetStatementWallet);
    return this;
  }

  build(): BudgetStatementDao {
    return this._budgetStatement;
  }
}
