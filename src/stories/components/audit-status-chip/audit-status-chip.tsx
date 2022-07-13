import React from 'react';
import { AuditStatusEnum, getAuditStatusLabel } from '../../../core/enums/audit-status.enum';
import styled from '@emotion/styled';

interface AuditStatusChipProps {
  status: AuditStatusEnum
}

const colors = {
  Approved: {
    color: '#1AAB9B',
    background: 'rgba(245, 255, 246, 0.5)'
  },
  ApprovedWithComments: {
    color: '#447AFB',
    background: 'rgba(247, 255, 245, 0.52)'
  },
  Escalated: {
    color: '#F08B04',
    background: 'rgba(255, 251, 245, 0.5)'
  },
  NeedActionsBeforeApproval: {
    color: '#9055AF',
    background: 'rgba(250, 245, 255, 0.5)'
  },
};

export const AuditStatusChip = (props: AuditStatusChipProps) => {
  return <Chip style={{
    color: colors[props.status]?.color,
    background: colors[props.status]?.background,
    borderColor: colors[props.status]?.color
  }}>{getAuditStatusLabel(props.status)}</Chip>;
};

const Chip = styled.div({
  fontFamily: 'FT Base, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '12px',
  padding: '0 8px',
  height: '22px',
  width: 'fit-content',
  borderBottom: '1px solid black'
});
