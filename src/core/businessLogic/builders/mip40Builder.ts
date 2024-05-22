import type { Mip40BudgetLineItem, Mip40BudgetPeriod, Mip40Wallet } from '@/core/models/interfaces/cuMip';
import type { Mip40Dto } from '../../models/dto/coreUnitDTO';

export class Mip40Builder {
  private readonly _mip40: Mip40Dto;

  constructor() {
    this._mip40 = {
      mkrOnly: false,
      mip40BudgetPeriod: [] as Mip40BudgetPeriod[],
      mip40Wallet: [] as Mip40Wallet[],
    } as Mip40Dto;
  }

  addPeriodWithLineItems(budgetPeriodStart: string, budgetPeriodEnd: string, budgetCaps: number[]): Mip40Builder {
    this._mip40.mip40BudgetPeriod.push({
      budgetPeriodStart,
      budgetPeriodEnd,
    } as Mip40BudgetPeriod);
    this._mip40.mip40Wallet.push({
      mip40BudgetLineItem: budgetCaps.map(
        (x) =>
          ({
            budgetCap: x,
          } as Mip40BudgetLineItem)
      ),
    } as Mip40Wallet);
    return this;
  }

  addBudgetPeriod(budgetPeriod: Mip40BudgetPeriod) {
    this._mip40.mip40BudgetPeriod.push(budgetPeriod);
    return this;
  }

  build(): Mip40Dto {
    return this._mip40;
  }
}
