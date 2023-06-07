export interface ExpenseCategory {
  id: string;
  parentId: string | null;
  order: number;
  name: string;
  headcountExpense: boolean;
  legacyCategory: string;
}

export interface ParsedExpenseCategory {
  id: string;
  order: number;
  name: string;
  headcountExpense: boolean;
  // only for top-level categories
  subcategories: Omit<ParsedExpenseCategory, 'subcategories'>[];
}
