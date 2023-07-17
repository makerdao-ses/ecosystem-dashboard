import { BudgetStatus } from '../../models/dto/coreUnitDTO';
import { CommentBuilder } from './commentBuilder';
import { UserBuilder } from './userBuilder';
import type {
  BudgetStatement,
  BudgetStatementFTEs,
  BudgetStatementMKRVest,
} from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { BudgetStatementWallet } from '@ses/core/models/interfaces/budgetStatementWallet';

export class BudgetStatementBuilder {
  private readonly _budgetStatement: BudgetStatement;

  constructor() {
    this._budgetStatement = {
      id: '',
      month: '',
      budgetStatementFTEs: [] as BudgetStatementFTEs[],
      budgetStatementWallet: [] as BudgetStatementWallet[],
      budgetStatementMKRVest: [] as BudgetStatementMKRVest[],
      comments: [] as BudgetStatementComment[],
      status: BudgetStatus.Draft,
      publicationUrl: '',
    } as BudgetStatement;
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

  addBudgetStatementFTE(budgetStatementFTE: BudgetStatementFTEs): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementFTEs.push(budgetStatementFTE);
    return this;
  }

  addBudgetStatementWallet(budgetStatementWallet: BudgetStatementWallet): BudgetStatementBuilder {
    this._budgetStatement.budgetStatementWallet.push(budgetStatementWallet);
    return this;
  }

  addBudgetStatementMKRVest(
    budgetStatementMKRVest: BudgetStatementMKRVest | BudgetStatementMKRVest[]
  ): BudgetStatementBuilder {
    if (Array.isArray(budgetStatementMKRVest)) {
      this._budgetStatement.budgetStatementMKRVest?.push(...budgetStatementMKRVest);
    } else {
      this._budgetStatement.budgetStatementMKRVest?.push(budgetStatementMKRVest);
    }
    return this;
  }

  addComment(comment: BudgetStatementComment) {
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

  build(): BudgetStatement {
    return this._budgetStatement;
  }
}
