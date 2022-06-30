import { BudgetStatementLineItemDto, BudgetStatementWalletDto } from '../../models/dto/core-unit.dto';

export class BudgetStatementWalletBuilder {
  private readonly _wallet: BudgetStatementWalletDto;

  constructor() {
    this._wallet = {
      name: '',
      budgetStatementLineItem: [] as BudgetStatementLineItemDto[],
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
