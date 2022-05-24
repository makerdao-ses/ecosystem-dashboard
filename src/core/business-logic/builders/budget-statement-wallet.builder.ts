import { BudgetStatementLineItemDao, BudgetStatementWalletDao } from '../../../stories/containers/cu-table/cu-table.api';

export class BudgetStatementWalletBuilder {
  private readonly _wallet: BudgetStatementWalletDao;

  constructor() {
    this._wallet = {
      budgetStatementLineItem: [] as BudgetStatementLineItemDao[],
    };
  }

  withLineItems(actualArray: number[]) {
    actualArray.forEach(actual => {
      this._wallet.budgetStatementLineItem.push({
        actual
      });
    });
    return this;
  }

  build() {
    return this._wallet;
  }
}
