import { styled } from '@mui/material';
import React from 'react';
import { TeamStatus } from '@/core/models/interfaces/types';
import { useCustomColors } from './useCustomColors';
import type { CustomColors } from './useCustomColors';

interface StatusChipProps {
  status: TeamStatus;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  const colors = useCustomColors();
  const removeAdditionalText =
    status === TeamStatus.FormalSubmission ? TeamStatus.FormalSubmission.split(' ')[1] : status;
  return (
    <Chip colors={colors} status={status} className={className}>
      {removeAdditionalText}
    </Chip>
  );
};

const Chip = styled('div')<{ colors: CustomColors; status: TeamStatus }>(({ theme, colors, status }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '18px',
  borderRadius: 6,
  padding: '1px 16px 1px 16px',
  color: theme.palette.isLight ? colors[status].color : colors[status].colorDark,
  background: theme.palette.isLight ? colors[status].background : colors[status].backgroundDark,
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
    lineHeight: '22px',
  },
}));
