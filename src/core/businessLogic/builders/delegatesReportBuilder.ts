import type { ActivityFeedDto, BudgetStatementDto } from '../../models/dto/coreUnitDTO';
import type { DelegatesReportDto } from '@ses/core/models/dto/delegatesDTO';

export class RecognizedDelegatesReportBuilder {
  private readonly _delegates: DelegatesReportDto;

  constructor() {
    this._delegates = {
      id: '1',
      code: '',
      shortCode: '',
      budgetStatements: [] as BudgetStatementDto[],
      activityFeed: [] as ActivityFeedDto[],
    } as DelegatesReportDto;
  }

  withId(id: string): RecognizedDelegatesReportBuilder {
    this._delegates.id = id;
    return this;
  }

  withCode(code: string): RecognizedDelegatesReportBuilder {
    this._delegates.code = code;
    return this;
  }

  withShortCode(code: string): RecognizedDelegatesReportBuilder {
    this._delegates.shortCode = code;
    return this;
  }

  addBudgetStatement(budgetStatement: BudgetStatementDto): RecognizedDelegatesReportBuilder {
    this._delegates.budgetStatements.push(budgetStatement);
    return this;
  }

  addActivity(activity: ActivityFeedDto): RecognizedDelegatesReportBuilder {
    this._delegates.activityFeed.push(activity);
    return this;
  }

  build(): DelegatesReportDto {
    return this._delegates;
  }
}
