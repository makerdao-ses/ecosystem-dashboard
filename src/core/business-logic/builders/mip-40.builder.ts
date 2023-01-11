import type {
  Mip40BudgetLineItemDto,
  Mip40BudgetPeriodDto,
  Mip40Dto,
  Mip40WalletDto,
} from '../../models/dto/core-unit.dto';

export class Mip40Builder {
  private readonly _mip40: Mip40Dto;

  constructor() {
    this._mip40 = {
      mkrOnly: false,
      mip40BudgetPeriod: [] as Mip40BudgetPeriodDto[],
      mip40Wallet: [] as Mip40WalletDto[],
    } as Mip40Dto;
  }

  addPeriodWithLineItems(budgetPeriodStart: string, budgetPeriodEnd: string, budgetCaps: number[]): Mip40Builder {
    this._mip40.mip40BudgetPeriod.push({
      budgetPeriodStart,
      budgetPeriodEnd,
    } as Mip40BudgetPeriodDto);
    this._mip40.mip40Wallet.push({
      mip40BudgetLineItem: budgetCaps.map(
        (x) =>
          ({
            budgetCap: x,
          } as Mip40BudgetLineItemDto)
      ),
    } as Mip40WalletDto);
    return this;
  }

  addBudgetPeriod(budgetPeriod: Mip40BudgetPeriodDto) {
    this._mip40.mip40BudgetPeriod.push(budgetPeriod);
    return this;
  }

  build(): Mip40Dto {
    return this._mip40;
  }
}
