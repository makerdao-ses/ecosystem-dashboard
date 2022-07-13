import { AuditStatusEnum } from '../../../../core/enums/audit-status.enum';
import { AuditReportDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';

export const useTransparencyAuditMvvm = () => {
  const items = [
    {
      auditStatus: AuditStatusEnum.Escalated,
      reportUrl: 'https://SES_AUDIT_REPORT-05_14_2022.PDF',
      timestamp: '1657705670',
    },
    {
      auditStatus: AuditStatusEnum.NeedActionsBeforeApproval,
      reportUrl: 'https://SES_AUDIT_REPORT-05_14_2022.PDF',
      timestamp: '1657705670',
    },
    {
      auditStatus: AuditStatusEnum.ApprovedWithComments,
      reportUrl: 'https://SES_AUDIT_REPORT-05_14_2022.PDF',
      timestamp: '1657705670',
    },
    {
      auditStatus: AuditStatusEnum.Approved,
      reportUrl: 'https://SES_AUDIT_REPORT-05_14_2022.PDF',
      timestamp: '1657705670',
    },
  ] as AuditReportDto[];

  const getDate = (timestamp: string) => {
    return DateTime.fromSeconds(Number(timestamp)).toFormat('dd-MMM-yyyy');
  };

  const getTime = (timestamp: string) => {
    return DateTime.fromSeconds(Number(timestamp)).toFormat('hh:mm');
  };

  const getFilenameFromUrl = (url: string) => {
    if (!url) return '';
    const parts = url.split('/');

    return parts[parts.length - 1];
  };

  return {
    items,
    getDate,
    getTime,
    getFilenameFromUrl,
  };
};
