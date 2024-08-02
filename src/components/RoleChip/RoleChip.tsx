import { styled } from '@mui/material';

import React from 'react';
import type { TeamRole } from '@/core/enums/teamRole';
import { pascalCaseToNormalString } from '@/core/utils/string';
import useRoleColors from './useRoleColors';
import type { RoleColors } from './useRoleColors';

interface ScopeChipProps {
  status: TeamRole;
  className?: string;
  hasDefaultColors?: boolean;
}

const RoleChip: React.FC<ScopeChipProps> = ({ status, className, hasDefaultColors }) => {
  const colors = useRoleColors();
  return (
    <Chip className={className} colors={colors} status={status} hasDefaultColors={hasDefaultColors}>
      <Status hasDefaultColors={hasDefaultColors}>{pascalCaseToNormalString(status)}</Status>
    </Chip>
  );
};

export default RoleChip;
const Chip = styled('div')<{
  colors: RoleColors;
  status: TeamRole;
  hasDefaultColors?: boolean;
}>(({ theme, colors, status, hasDefaultColors = false }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'baseline',
  borderRadius: 6,
  padding: '1px 4px 1px 4px',
  width: 'fit-content',
  background: theme.palette.isLight ? colors[status]?.background : colors[status]?.backgroundDark,
  borderBottom: `1.5px solid ${theme.palette.isLight ? colors[status]?.borderColor : colors[status]?.borderColorDark}`,
  ...(hasDefaultColors && {
    background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : 'red',
    borderBottom: `1.5px solid ${theme.palette.isLight ? theme.palette.colors.charcoal[200] : 'red'}`,
  }),
}));

const Status = styled('div')<{ hasDefaultColors?: boolean }>(({ theme, hasDefaultColors }) => ({
  fontSize: 12,
  fontWeight: 600,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[400] : theme.palette.colors.charcoal[200],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 14,
  },
  ...(hasDefaultColors && {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
  }),
  [theme.breakpoints.up('desktop_1024')]: {
    ...(hasDefaultColors && {
      fontSize: 12,
      lineHeight: '18px',
    }),
  },
  [theme.breakpoints.up('desktop_1280')]: {
    ...(hasDefaultColors && {
      fontSize: 14,
      lineHeight: '22px',
    }),
  },
}));
