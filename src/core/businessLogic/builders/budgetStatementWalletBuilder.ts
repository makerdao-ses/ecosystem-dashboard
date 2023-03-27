import type {
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
  BudgetStatementWalletTransferRequestDto,
} from '../../models/dto/coreUnitDTO';

export class BudgetStatementWalletBuilder {
  private readonly _wallet: BudgetStatementWalletDto;

  constructor() {
    this._wallet = {
      name: '',
      address: '',
      currentBalance: 0,
      budgetStatementLineItem: [] as BudgetStatementLineItemDto[],
      budgetStatementTransferRequest: [] as BudgetStatementWalletTransferRequestDto[],
    } as BudgetStatementWalletDto;
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
      this._wallet.budgetStatementLineItem.push(...lineItem);
    } else {
      this._wallet.budgetStatementLineItem.push(lineItem);
    }
    return this;
  }

  addBudgetStatementTransferRequest(
    transferRequest: BudgetStatementWalletTransferRequestDto | BudgetStatementWalletTransferRequestDto[]
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

  withAddress(address: string): BudgetStatementWalletBuilder {
    this._wallet.address = address;
    return this;
  }

  build() {
    return this._wallet;
  }
}
