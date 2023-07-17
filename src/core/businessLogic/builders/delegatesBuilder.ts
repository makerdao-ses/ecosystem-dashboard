import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';

export class RecognizedDelegatesBuilder {
  private readonly _delegates: DelegatesDto;

  constructor() {
    this._delegates = {
      id: '1',
      code: '',
      shortCode: '',
      budgetStatements: [] as BudgetStatement[],
      activityFeed: [] as ChangeTrackingEvent[],
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

  addBudgetStatement(budgetStatement: BudgetStatement): RecognizedDelegatesBuilder {
    this._delegates.budgetStatements.push(budgetStatement);
    return this;
  }

  addActivity(activity: ChangeTrackingEvent): RecognizedDelegatesBuilder {
    this._delegates.activityFeed.push(activity);
    return this;
  }

  build(): DelegatesDto {
    return this._delegates;
  }
}
