export class CategoryBuilder {
  private _category: string;

  constructor() {
    this._category = '';
  }

  withCategory(category: string): CategoryBuilder {
    this._category = category;
    return this;
  }

  build(): string {
    return this._category;
  }
}
