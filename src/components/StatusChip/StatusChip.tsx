import { styled, useTheme } from '@mui/material';
import React from 'react';
import { useCustomColors } from './useCustomColors';
import type { Status } from '@ses/core/models/interfaces/types';
import type { CSSProperties } from 'react';

interface StatusChipProps {
  status: Status | 'All';
  style?: CSSProperties;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, className, style }) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const colors = useCustomColors();
  return (
    <Chip
      className={className}
      style={{
        color: isLight ? colors[status].color : colors[status].colorDark,
        background: isLight ? colors[status].background : colors[status].backgroundDark,
        ...style,
      }}
    >
      {status}
    </Chip>
  );
};

const Chip = styled('div')({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '22px',
  borderRadius: 6,
  padding: '1px 16px 1px 16px',
});
