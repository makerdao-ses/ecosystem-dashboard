import type { Category } from '@ses/core/models/dto/coreUnitDTO';

export class CategoryBuilder {
  private readonly _category: Category;

  constructor() {
    this._category = {
      name: '',
      subcategories: [],
    } as Category;
  }

  withCategory(category: string): CategoryBuilder {
    this._category.name = category;
    return this;
  }

  withSubCategories(subcategories: string[]): CategoryBuilder {
    this._category.subcategories = subcategories;
    return this;
  }

  build(): Category {
    return this._category;
  }
}
