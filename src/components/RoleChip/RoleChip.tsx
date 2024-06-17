import { styled } from '@mui/material';

import React from 'react';
import type { TeamRole } from '@/core/enums/teamRole';
import { pascalCaseToNormalString } from '@/core/utils/string';
import useRoleColors from './useRoleColors';
import type { RoleColors } from './useRoleColors';

interface ScopeChipProps {
  status: TeamRole;
  className?: string;
}

const RoleChip: React.FC<ScopeChipProps> = ({ status, className }) => {
  const colors = useRoleColors();

  return (
    <Chip className={className} colors={colors} status={status}>
      <Status>{pascalCaseToNormalString(status)}</Status>
    </Chip>
  );
};

export default RoleChip;
const Chip = styled('div')<{
  colors: RoleColors;
  status: TeamRole;
}>(({ theme, colors, status }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 6,
  padding: '1px 4px 1px 4px',
  width: 'fit-content',
  background: theme.palette.isLight ? colors[status]?.background : colors[status]?.backgroundDark,
  borderBottom: `1.5px solid ${theme.palette.isLight ? colors[status]?.borderColor : colors[status]?.borderColorDark}`,
}));

const Status = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[400] : theme.palette.colors.charcoal[200],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
  },
}));
