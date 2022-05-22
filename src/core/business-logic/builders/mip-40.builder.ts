import { Mip40BudgetPeriodDao, Mip40Dao } from '../../../stories/containers/cu-table/cu-table.api';

export class Mip40Builder {
  private readonly _mip40: Mip40Dao;

  constructor() {
    this._mip40 = {
      mip40BudgetPeriod: [] as Mip40BudgetPeriodDao[]
    } as Mip40Dao;
  }

  addBudgetPeriod(budgetPeriod: Mip40BudgetPeriodDao) {
    this._mip40.mip40BudgetPeriod.push(budgetPeriod);
    return this;
  }
}
