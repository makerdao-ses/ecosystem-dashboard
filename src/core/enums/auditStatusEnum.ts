export enum AuditStatusEnum {
  Escalated = 'Escalated',
  NeedActionsBeforeApproval = 'NeedActionsBeforeApproval',
  ApprovedWithComments = 'ApprovedWithComments',
  Approved = 'Approved',
}

export const getAuditStatusLabel = (value: AuditStatusEnum) => {
  switch (value) {
    case AuditStatusEnum.Approved:
      return 'Approved';
    case AuditStatusEnum.Escalated:
      return 'Escalated';
    case AuditStatusEnum.ApprovedWithComments:
      return 'Approved With Comments';
    case AuditStatusEnum.NeedActionsBeforeApproval:
      return 'Need Actions Before Approval';
  }
};
