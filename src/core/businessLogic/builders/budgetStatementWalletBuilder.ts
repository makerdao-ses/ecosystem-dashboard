import type {
  BudgetStatementLineItem,
  BudgetStatementTransferRequest,
  BudgetStatementWallet,
} from '@ses/core/models/interfaces/budgetStatementWallet';

export class BudgetStatementWalletBuilder {
  private readonly _wallet: BudgetStatementWallet;

  constructor() {
    this._wallet = {
      name: '',
      address: '',
      budgetStatementId: '',
      currentBalance: 0,
      budgetStatementLineItem: [] as BudgetStatementLineItem[],
      budgetStatementTransferRequest: [] as BudgetStatementTransferRequest[],
    } as BudgetStatementWallet;
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
    lineItem: BudgetStatementLineItem | BudgetStatementLineItem[]
  ): BudgetStatementWalletBuilder {
    if (Array.isArray(lineItem)) {
      this._wallet.budgetStatementLineItem.push(...lineItem);
    } else {
      this._wallet.budgetStatementLineItem.push(lineItem);
    }
    return this;
  }

  addBudgetStatementTransferRequest(
    transferRequest: BudgetStatementTransferRequest | BudgetStatementTransferRequest[]
  ): BudgetStatementWalletBuilder {
    if (Array.isArray(transferRequest)) {
      this._wallet.budgetStatementTransferRequest?.push(...transferRequest);
    } else {
      this._wallet.budgetStatementTransferRequest?.push(transferRequest);
    }
    return this;
  }

  withName(name: string): BudgetStatementWalletBuilder {
    this._wallet.name = name;
    return this;
  }

  withBudgetStatementId(budgetStatementId: string): BudgetStatementWalletBuilder {
    this._wallet.budgetStatementId = budgetStatementId;
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
