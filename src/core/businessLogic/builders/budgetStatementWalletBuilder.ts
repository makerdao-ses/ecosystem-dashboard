import type { BudgetStatementLineItemDto, BudgetStatementWalletDto } from '../../models/dto/coreUnitDTO';

export class BudgetStatementWalletBuilder {
  private readonly _wallet: BudgetStatementWalletDto;

  constructor() {
    this._wallet = {
      name: '',
      address: '',
      currentBalance: 0,
      budgetStatementLineItem: [] as BudgetStatementLineItemDto[],
    };
  }

  withLineItems(actualArray: number[], month: string) {
    actualArray.forEach((actual) => {
      this._wallet.budgetStatementLineItem.push({
        actual,
        month,
      });
    });
    return this;
  }

  addBudgetStatementLineItem(
    lineItem: BudgetStatementLineItemDto | BudgetStatementLineItemDto[]
  ): BudgetStatementWalletBuilder {
    if (Array.isArray(lineItem)) {
      lineItem.forEach((item) => {
        this._wallet.budgetStatementLineItem.push(item);
      });
    } else {
      this._wallet.budgetStatementLineItem.push(lineItem);
    }
    return this;
  }

  withName(name: string): BudgetStatementWalletBuilder {
    this._wallet.name = name;
    return this;
  }

  withAddress(address: string): BudgetStatementWalletBuilder {
    this._wallet.address = address;
    return this;
  }

  build() {
    return this._wallet;
  }
}
