import { BudgetStatus } from '../../models/dto/coreUnitDTO';
import type { UserDTO } from '../../models/dto/authDTO';
import type { CommentsBudgetStatementDto } from '../../models/dto/coreUnitDTO';

export class CommentBuilder {
  private readonly _comment: CommentsBudgetStatementDto;
  private static idCounter = 0;

  constructor() {
    this._comment = {
      id: (CommentBuilder.idCounter++).toString(),
      budgetStatementId: '1',
      timestamp: '2022-12-18T03:58:07+0000',
      comment: '',
      author: {},
      status: BudgetStatus.Draft,
    } as CommentsBudgetStatementDto;
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

  withAuthor(author: UserDTO): CommentBuilder {
    this._comment.author = author;
    return this;
  }

  withStatus(status: BudgetStatus): CommentBuilder {
    this._comment.status = status;
    return this;
  }

  build(): CommentsBudgetStatementDto {
    return this._comment;
  }
}
