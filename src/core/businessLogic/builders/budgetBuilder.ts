import type { Budget } from '@ses/core/models/interfaces/budget';

export class BudgetBuilder {
  private readonly _budget: Budget;

  constructor() {
    this._budget = {
      parentId: '',
      name: '',
      image: '',
      idPath: '',
      id: '',
      description: '',
      codePath: '',
      code: '',
    };
  }

  withParentId(parentId: string | null): BudgetBuilder {
    this._budget.parentId = parentId;
    return this;
  }

  withName(name: string): BudgetBuilder {
    this._budget.name = name;
    return this;
  }

  withImage(image: string): BudgetBuilder {
    this._budget.image = image;
    return this;
  }

  withIdPath(idPath: string): BudgetBuilder {
    this._budget.idPath = idPath;
    return this;
  }

  withId(id: string): BudgetBuilder {
    this._budget.id = id;
    return this;
  }

  withDescription(description: string): BudgetBuilder {
    this._budget.description = description;
    return this;
  }

  withCodePath(codePath: string): BudgetBuilder {
    this._budget.codePath = codePath;
    return this;
  }

  withCode(code: string): BudgetBuilder {
    this._budget.code = code;
    return this;
  }

  build(): Budget {
    return this._budget;
  }
}
