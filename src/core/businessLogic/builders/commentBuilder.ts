import { BudgetStatus } from '@ses/core/models/interfaces/types';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { User } from '@ses/core/models/interfaces/users';

export class CommentBuilder {
  private readonly _comment: BudgetStatementComment;
  private static idCounter = 0;

  constructor() {
    this._comment = {
      id: (CommentBuilder.idCounter++).toString(),
      budgetStatementId: '1',
      timestamp: '2022-12-18T03:58:07+0000',
      comment: '',
      author: {},
      status: BudgetStatus.Draft,
    } as BudgetStatementComment;
  }

  withId(id: string): CommentBuilder {
    this._comment.id = id;
    return this;
  }

  withBudgetStatementId(id: string): CommentBuilder {
    this._comment.budgetStatementId = id;
    return this;
  }

  withTimestamp(timestamp: string): CommentBuilder {
    this._comment.timestamp = timestamp;
    return this;
  }

  withComment(comment: string): CommentBuilder {
    this._comment.comment = comment;
    return this;
  }

  withAuthor(author: User): CommentBuilder {
    this._comment.author = author;
    return this;
  }

  withStatus(status: BudgetStatus): CommentBuilder {
    this._comment.status = status;
    return this;
  }

  build(): BudgetStatementComment {
    return this._comment;
  }
}
