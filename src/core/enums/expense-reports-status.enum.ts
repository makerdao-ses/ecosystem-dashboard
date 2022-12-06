export enum ExpenseReportStatus {
  Draft = 'draft',
  Review = 'review',
  Final = 'final',
  Escalated = 'escalated',
}

export const getExpenseReportStatusLabel = (value: ExpenseReportStatus): string => {
  switch (value) {
    case ExpenseReportStatus.Review:
      return 'Review';
    case ExpenseReportStatus.Final:
      return 'Final';
    case ExpenseReportStatus.Escalated:
      return 'Escalated';
    default:
      return 'Draft';
  }
};
