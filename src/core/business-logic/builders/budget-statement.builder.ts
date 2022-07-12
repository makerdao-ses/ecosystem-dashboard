import { BudgetStatementDto, BudgetStatementFteDto, BudgetStatementWalletDto } from '../../models/dto/core-unit.dto';
import { BudgetStatusEnum } from '../../enums/budget-status.enum';

export class BudgetStatementBuilder {
  private readonly _budgetStatement: BudgetStatementDto;

  constructor() {
    this._budgetStatement = {
      month: '',
      budgetStatementFTEs: [] as BudgetStatementFteDto[],
      budgetStatementWallet: [] as BudgetStatementWalletDto[],
      budgetStatus: BudgetStatusEnum.Draft,
      publicationUrl: '',
    } as BudgetStatementDto;
  }

  withMonth(month: string): BudgetStatementBuilder {
    this._budgetStatement.month = month;
    return this;
  }

  withBudgetStatus(budgetStatus: string): BudgetStatementBuilder {
    this._budgetStatement.budgetStatus = budgetStatus;
    return this;
  }

  addBudgetStatementFTE(budgetStatementFTE: BudgetStatementFteDto): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementFTEs.push(budgetStatementFTE);
    return this;
  }

  addBudgetStatementWallet(budgetStatementWallet: BudgetStatementWalletDto): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementWallet.push(budgetStatementWallet);
    return this;
  }

  build(): BudgetStatementDto {
    return this._budgetStatement;
  }
}
