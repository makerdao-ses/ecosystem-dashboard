import { Mip40BudgetPeriodDao, Mip40Dao } from '../../../stories/containers/cu-table/cu-table.api';

export class Mip40Builder {
  private readonly _mip40: Mip40Dao;

  constructor() {
    this._mip40 = {
      mip40BudgetPeriod: [] as Mip40BudgetPeriodDao[]
    } as Mip40Dao;
  }

  addPeriodWithLineItems(budgetPeriodStart: string, budgetPeriodEnd: string, budgetCaps: number[]): Mip40Builder {
    this._mip40.mip40BudgetPeriod.push({
      budgetPeriodStart,
      budgetPeriodEnd,
      mip40BudgetLineItem: budgetCaps.map((budgetCap) => ({
        budgetCap
      }))
    } as Mip40BudgetPeriodDao);
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
