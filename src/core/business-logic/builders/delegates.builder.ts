import type { ActivityFeedDto, BudgetStatementDto } from '../../models/dto/core-unit.dto';
import type { DelegatesDto } from '@ses/core/models/dto/delegates.dto';

export class RecognizedDelegatesBuilder {
  private readonly _delegates: DelegatesDto;

  constructor() {
    this._delegates = {
      id: '1',
      code: '',
      shortCode: '',
      budgetStatements: [] as BudgetStatementDto[],
      activityFeed: [] as ActivityFeedDto[],
    } as DelegatesDto;
  }

  withId(id: string): RecognizedDelegatesBuilder {
    this._delegates.id = id;
    return this;
  }

  withCode(code: string): RecognizedDelegatesBuilder {
    this._delegates.code = code;
    return this;
  }

  withShortCode(code: string): RecognizedDelegatesBuilder {
    this._delegates.shortCode = code;
    return this;
  }

  addBudgetStatement(budgetStatement: BudgetStatementDto): RecognizedDelegatesBuilder {
    this._delegates.budgetStatements.push(budgetStatement);
    return this;
  }

  addActivity(activity: ActivityFeedDto): RecognizedDelegatesBuilder {
    this._delegates.activityFeed.push(activity);
    return this;
  }

  build(): DelegatesDto {
    return this._delegates;
  }
}
