export interface BudgetStatementLineItem {
  id?: string;
  budgetStatementWalletId?: string;
  month?: string;
  position?: number;
  group?: string;
  budgetCategory?: string;
  forecast?: number;
  actual: number;
  comments?: string;
  canonicalBudgetCategory?: string;
  headcountExpense?: boolean;
  budgetCap?: number;
  payment?: number;
  budgetId?: string;
  currency?: string;
}

export interface BudgetStatementPayment {
  id: string;
  budgetStatementWalletId: string;
  transactionDate: string;
  transactionId: string;
  budgetStatementLineItemId: string;
  comments: string;
}

export interface Source {
  code: string;
  url: string;
  title: string;
}

export interface Target {
  amount: number;
  calculation: string;
  description: string;
  source: Source;
}

export interface BudgetStatementTransferRequest {
  id: string;
  budgetStatementWalletId: string;
  budgetStatementPaymentId: string;
  requestAmount: number;
  walletBalance: number;
  walletBalanceTimeStamp: string;
  target: Target;
}

export interface BudgetStatementWallet {
  id: string;
  budgetStatementId: string;
  name: string;
  address: string;
  currentBalance: number;
  topupTransfer: number;
  comments: string;
  budgetStatementLineItem: BudgetStatementLineItem[];
  budgetStatementPayment: BudgetStatementPayment[];
  budgetStatementTransferRequest: BudgetStatementTransferRequest[];
}
