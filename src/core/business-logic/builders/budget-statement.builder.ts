import { BudgetStatus } from '../../models/dto/core-unit.dto';
import { CommentBuilder } from './comment.builder';
import { UserBuilder } from './user.builder';
import type {
  BudgetStatementDto,
  BudgetStatementFteDto,
  BudgetStatementWalletDto,
  CommentsBudgetStatementDto,
} from '../../models/dto/core-unit.dto';

export class BudgetStatementBuilder {
  private readonly _budgetStatement: BudgetStatementDto;

  constructor() {
    this._budgetStatement = {
      month: '',
      budgetStatementFTEs: [] as BudgetStatementFteDto[],
      budgetStatementWallet: [] as BudgetStatementWalletDto[],
      comments: [] as CommentsBudgetStatementDto[],
      status: BudgetStatus.Draft,
      publicationUrl: '',
    } as BudgetStatementDto;
  }

  withMonth(month: string): BudgetStatementBuilder {
    this._budgetStatement.month = month;
    return this;
  }

  withBudgetStatus(status: BudgetStatus): BudgetStatementBuilder {
    this._budgetStatement.status = status;
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

  addComment(comment: CommentsBudgetStatementDto) {
    this._budgetStatement.comments.push(comment);
    return this;
  }

  addBuildStatusChangeComment(status: BudgetStatus): BudgetStatementBuilder {
    this._budgetStatement.status = status;
    const comment = new CommentBuilder()
      .withBudgetStatementId(this._budgetStatement.id)
      .withStatus(status)
      .withAuthor(new UserBuilder().addCoreUnitFacilitatorRole().build());
    return this.addComment(comment.build());
  }

  build(): BudgetStatementDto {
    return this._budgetStatement;
  }
}
