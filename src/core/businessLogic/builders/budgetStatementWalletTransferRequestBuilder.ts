import type { BudgetStatementTransferRequest, Source } from '@ses/core/models/interfaces/budgetStatementWallet';

export class BudgetStatementWalletTransferRequestBuilder {
  private readonly _budgetStatementWalletTransferRequest: BudgetStatementTransferRequest;

  constructor() {
    this._budgetStatementWalletTransferRequest = {
      requestAmount: 0,
      walletBalance: 0,
      target: {
        amount: 0,
        calculation: '',
        description: '',
        source: {
          code: '',
          url: '',
          title: '',
        },
      },
      walletBalanceTimeStamp: '',
    } as BudgetStatementTransferRequest;
  }

  withRequestAmount(requestAmount: number): BudgetStatementWalletTransferRequestBuilder {
    this._budgetStatementWalletTransferRequest.requestAmount = requestAmount;
    return this;
  }

  withWalletBalance(walletBalance: number): BudgetStatementWalletTransferRequestBuilder {
    this._budgetStatementWalletTransferRequest.walletBalance = walletBalance;
    return this;
  }

  withTargetAmount(amount: number): BudgetStatementWalletTransferRequestBuilder {
    this._budgetStatementWalletTransferRequest.target.amount = amount;
    return this;
  }

  withTargetCalculation(calculation: string): BudgetStatementWalletTransferRequestBuilder {
    this._budgetStatementWalletTransferRequest.target.calculation = calculation;
    return this;
  }

  withTargetDescription(description: string): BudgetStatementWalletTransferRequestBuilder {
    this._budgetStatementWalletTransferRequest.target.description = description;
    return this;
  }

  withTargetSource(code: string, url: string, title: string): BudgetStatementWalletTransferRequestBuilder {
    const source: Source = {
      code,
      url,
      title,
    };
    this._budgetStatementWalletTransferRequest.target.source = source;
    return this;
  }

  withWalletBalanceTimeStamp(walletBalanceTimeStamp: string): BudgetStatementWalletTransferRequestBuilder {
    this._budgetStatementWalletTransferRequest.walletBalanceTimeStamp = walletBalanceTimeStamp;
    return this;
  }

  build(): BudgetStatementTransferRequest {
    return this._budgetStatementWalletTransferRequest;
  }
}
