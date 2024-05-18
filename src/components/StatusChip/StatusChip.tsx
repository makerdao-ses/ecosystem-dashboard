import { styled } from '@mui/material';
import React from 'react';
import { useCustomColors } from './useCustomColors';
import type { CustomColors } from './useCustomColors';
import type { Status } from '@ses/core/models/interfaces/types';

interface StatusChipProps {
  status: Status;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  const colors = useCustomColors();
  return (
    <Chip colors={colors} status={status} className={className}>
      {status}
    </Chip>
  );
};

const Chip = styled('div')<{ colors: CustomColors; status: Status }>(({ theme, colors, status }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  borderRadius: 6,
  padding: '1px 16px 1px 16px',
  color: theme.palette.isLight ? colors[status].color : colors[status].colorDark,
  background: theme.palette.isLight ? colors[status].background : colors[status].backgroundDark,
}));
