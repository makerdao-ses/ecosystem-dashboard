import {
  Mip40BudgetLineItem,
  Mip40BudgetPeriodDao,
  Mip40Dao,
  Mip40WalletDao
} from '../../../stories/containers/cu-table/cu-table.api';

export class Mip40Builder {
  private readonly _mip40: Mip40Dao;

  constructor() {
    this._mip40 = {
      mip40BudgetPeriod: [] as Mip40BudgetPeriodDao[],
      mip40Wallet: [] as Mip40WalletDao[],
    } as Mip40Dao;
  }

  addPeriodWithLineItems(budgetPeriodStart: string, budgetPeriodEnd: string, budgetCaps: number[]): Mip40Builder {
    this._mip40.mip40BudgetPeriod.push({
      budgetPeriodStart,
      budgetPeriodEnd,
    } as Mip40BudgetPeriodDao);
    this._mip40.mip40Wallet.push({
      mip40BudgetLineItem: budgetCaps.map(x => ({
        budgetCap: x,
      }) as Mip40BudgetLineItem)
    } as Mip40WalletDao);
    return this;
  }

  addBudgetPeriod(budgetPeriod: Mip40BudgetPeriodDao) {
    this._mip40.mip40BudgetPeriod.push(budgetPeriod);
    return this;
  }

  build(): Mip40Dao {
    return this._mip40;
  }
}
