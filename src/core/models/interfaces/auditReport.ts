import type { AuditStatusEnum } from '@ses/core/enums/auditStatusEnum';

export interface AuditReport {
  id: string;
  budgetStatementId: string;
  auditStatus: AuditStatusEnum;
  reportUrl: string;
  timestamp: string;
}
