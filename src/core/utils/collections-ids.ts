export const budgetStatementCommentsCollectionId = (budgetId: string): string => {
  return `BudgetStatement(${budgetId}).comments`;
};
