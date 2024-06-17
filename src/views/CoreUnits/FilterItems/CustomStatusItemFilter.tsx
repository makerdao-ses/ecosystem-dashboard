import { Box, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { StatusChip } from '@/components/StatusChip/StatusChip';
import type { TeamStatus } from '@/core/models/interfaces/types';
import type { FC } from 'react';

interface Props {
  status: TeamStatus;
  isActive: boolean;
  count?: string;
}

const CustomStatusItemFilter: FC<Props> = ({ status, isActive, count = '0' }) => (
  <BoxStyle>
    <Title isActive={isActive}>{count}</Title>
    <StatusChip status={status as TeamStatus} isFilter />
  </BoxStyle>
);

export default CustomStatusItemFilter;

const Title = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[300]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.charcoal[800],
  width: 24,
}));

const BoxStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '16px',
});
