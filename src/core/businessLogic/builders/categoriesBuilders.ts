import type { ParsedExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';

export class ParsedExpenseCategoryBuilder {
  private readonly _parsedExpenseCategory: ParsedExpenseCategory;

  constructor() {
    this._parsedExpenseCategory = {
      id: '',
      order: 0,
      name: '',
      headcountExpense: false,
      subcategories: [],
    };
  }

  withId(id: string): ParsedExpenseCategoryBuilder {
    this._parsedExpenseCategory.id = id;
    return this;
  }

  withOrder(order: number): ParsedExpenseCategoryBuilder {
    this._parsedExpenseCategory.order = order;
    return this;
  }

  withName(name: string): ParsedExpenseCategoryBuilder {
    this._parsedExpenseCategory.name = name;
    return this;
  }

  withHeadcountExpense(headcountExpense: boolean): ParsedExpenseCategoryBuilder {
    this._parsedExpenseCategory.headcountExpense = headcountExpense;
    return this;
  }

  withSubcategories(subcategories: Omit<ParsedExpenseCategory, 'subcategories'>[]): ParsedExpenseCategoryBuilder {
    this._parsedExpenseCategory.subcategories = subcategories;
    return this;
  }

  build(): ParsedExpenseCategory {
    return this._parsedExpenseCategory;
  }
}
