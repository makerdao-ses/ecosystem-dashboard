import { Box, Typography, styled } from '@mui/material';
import React from 'react';
import RoleChip from '@/components/RoleChip/RoleChip';
import type { TeamRole } from '@/core/enums/teamRole';
import type { FC } from 'react';

interface Props {
  count?: string;
  role: TeamRole;
  isActive: boolean;
}

export const CustomItemRole: FC<Props> = ({ count = '0', role, isActive }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: '16px',
    }}
  >
    <Title sx={{ width: '24px' }} isActive={isActive}>
      {count}
    </Title>
    <RoleChipStyled status={role} />
  </Box>
);

const Title = styled(Typography)<{ isActive: boolean }>(({ theme, isActive }) => ({
  color: theme.palette.isLight
    ? isActive
      ? theme.palette.colors.gray[900]
      : theme.palette.colors.gray[300]
    : isActive
    ? theme.palette.colors.gray[50]
    : theme.palette.colors.charcoal[800],
}));

const RoleChipStyled = styled(RoleChip)({
  '& div': {
    fontSize: 14,
  },
});
