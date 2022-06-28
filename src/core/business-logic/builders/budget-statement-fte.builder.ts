import { BudgetStatementFteDto } from '../../models/dto/core-unit.dto';

export class BudgetStatementFteBuilder {
  private readonly _budgetStatementFte: BudgetStatementFteDto;

  constructor() {
    this._budgetStatementFte = {
      ftes: 0,
      month: '',
    } as BudgetStatementFteDto;
  }

  withMonth(month: string): BudgetStatementFteBuilder {
    this._budgetStatementFte.month = month;
    return this;
  }

  withFtes(ftes: number): BudgetStatementFteBuilder {
    this._budgetStatementFte.ftes = ftes;
    return this;
  }

  build(): BudgetStatementFteDto {
    return this._budgetStatementFte;
  }
}
