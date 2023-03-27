import { BudgetStatus } from '../../models/dto/coreUnitDTO';
import { CommentBuilder } from './commentBuilder';
import { UserBuilder } from './userBuilder';
import type {
  BudgetStatementDto,
  BudgetStatementFteDto,
  BudgetStatementWalletDto,
  CommentsBudgetStatementDto,
  BudgetStatementMKRVestDto,
} from '../../models/dto/coreUnitDTO';

export class BudgetStatementBuilder {
  private readonly _budgetStatement: BudgetStatementDto;

  constructor() {
    this._budgetStatement = {
      id: '',
      month: '',
      budgetStatementFTEs: [] as BudgetStatementFteDto[],
      budgetStatementWallet: [] as BudgetStatementWalletDto[],
      budgetStatementMKRVest: [] as BudgetStatementMKRVestDto[],
      comments: [] as CommentsBudgetStatementDto[],
      status: BudgetStatus.Draft,
      publicationUrl: '',
    } as BudgetStatementDto;
  }

  withId(id: string): BudgetStatementBuilder {
    this._budgetStatement.id = id;
    return this;
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

  addBudgetStatementMKRVest(
    budgetStatementMKRVest: BudgetStatementMKRVestDto | BudgetStatementMKRVestDto[]
  ): BudgetStatementBuilder {
    if (Array.isArray(budgetStatementMKRVest)) {
      this._budgetStatement.budgetStatementMKRVest?.push(...budgetStatementMKRVest);
    } else {
      this._budgetStatement.budgetStatementMKRVest?.push(budgetStatementMKRVest);
    }
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
