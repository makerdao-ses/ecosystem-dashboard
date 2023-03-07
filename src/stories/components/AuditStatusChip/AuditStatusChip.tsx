import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { getAuditStatusLabel } from '../../../core/enums/audit-status.enum';
import type { AuditStatusEnum } from '../../../core/enums/audit-status.enum';

interface AuditStatusChipProps {
  status: AuditStatusEnum;
}

const colors = {
  Approved: {
    color: '#1AAB9B',
    background: '#F5FFF680',
    colorDark: '#02CB9B',
    backgroundDark: '#50FF9626',
  },
  ApprovedWithComments: {
    color: '#447AFB',
    background: '#F7FFF585',
    colorDark: '#34AAFF',
    backgroundDark: '#4992FF26',
  },
  Escalated: {
    color: '#F08B04',
    background: '#FFFBF580',
    colorDark: '#F08B04',
    backgroundDark: '#FFA23526',
  },
  NeedActionsBeforeApproval: {
    color: '#9055AF',
    background: '#FAF5FF80',
    colorDark: '#8F2EC1',
    backgroundDark: '#8728FF26',
  },
};

export const AuditStatusChip = (props: AuditStatusChipProps) => {
  const { isLight } = useThemeContext();
  return (
    <Chip
      style={{
        color: isLight ? colors[props.status]?.color : colors[props.status]?.colorDark,
        background: isLight ? colors[props.status]?.background : colors[props.status]?.backgroundDark,
        borderColor: isLight ? colors[props.status]?.color : colors[props.status]?.colorDark,
      }}
    >
      {getAuditStatusLabel(props.status)}
    </Chip>
  );
};

const Chip = styled.div({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 400,
  fontSize: '11px',
  borderRadius: '4px',
  padding: '0 8px',
  height: '22px',
  width: 'fit-content',
  borderBottom: '1px solid black',
});
