export type AuditStatus = 'Approved' | 'ApprovedWithComments' | 'NeedActionsBeforeApproval' | 'Escalated';

export interface AuditReport {
  id: string;
  budgetStatementId: string;
  auditStatus: AuditStatus;
  reportUrl: string;
  timestamp: string;
}
