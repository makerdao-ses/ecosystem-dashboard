import { Box, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import ScopeChip from '@/components/ScopeChip/ScopeChip';
import type { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import type { Scope } from '@/core/models/interfaces/scopes';
import type { FC } from 'react';

interface Props {
  scopes: Scope[];
  scope: TeamScopeEnum;
  isActive: boolean;
  count?: string;
}

const CustomItemScope: FC<Props> = ({ scopes, scope, isActive, count = '0' }) => {
  const getScopeObject = scopes.find((item) => item.name === scope);
  return (
    <BoxStyle>
      <Title isActive={isActive}>{count}</Title>
      <ScopeChip
        scope={{
          code: getScopeObject?.code ?? '',
          id: getScopeObject?.name ?? '',
          name: getScopeObject?.name as TeamScopeEnum,
        }}
      />
    </BoxStyle>
  );
};

export default CustomItemScope;

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
