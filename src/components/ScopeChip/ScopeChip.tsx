import { styled } from '@mui/material';
import React from 'react';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import type { Scope } from '@/core/models/interfaces/scopes';
import useScopeColors from './useScopeColors';
import type { ScopeColors } from './useScopeColors';

interface Props {
  scope: Scope;
  className?: string;
  codeOnly?: boolean;
  isUppercase?: boolean;
}

const ScopeChip: React.FC<Props> = ({ scope, className, codeOnly, isUppercase }) => {
  const colors = useScopeColors();

  return (
    <Chip className={className} scope={scope.name} colors={colors} codeOnly={codeOnly}>
      {!(scope.name === TeamScopeEnum.All) && (
        <Code isUppercase={isUppercase} colors={colors} scope={scope.name} codeOnly={codeOnly}>
          {scope.code}
        </Code>
      )}
      {!codeOnly && (
        <ScopeContainer colors={colors} scope={scope.name}>
          {scope.name}
        </ScopeContainer>
      )}
    </Chip>
  );
};

export default ScopeChip;
const Chip = styled('div')<{ colors: ScopeColors; scope: TeamScopeEnum; codeOnly?: boolean }>(
  ({ theme, scope, colors, codeOnly = false }) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    gap: 4,
    border: `1.5px solid ${theme.palette.isLight ? colors[scope]?.color : colors[scope]?.colorDark}`,
    padding: '0px 8px 0px 0px',
    width: 'fit-content',
    ...(codeOnly && {
      border: 'revert',
      padding: '0px',
    }),
    ...(scope === TeamScopeEnum.All && {
      padding: '1px 16px 1px 16px',
      border: `1.5px solid ${theme.palette.isLight ? colors[scope]?.borderColor : colors[scope]?.borderColorDark}`,
    }),
  })
);

const Code = styled('div')<{ isUppercase?: boolean; colors: ScopeColors; scope: TeamScopeEnum; codeOnly?: boolean }>(
  ({ scope, theme, isUppercase = true, colors, codeOnly = false }) => ({
    fontWeight: 800,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: theme.palette.isLight ? '22px' : '21px',
    borderRadius: '4px 0px 0px 4px',
    padding: '1px 4px 1px 8px',

    textTransform: isUppercase ? 'uppercase' : 'none',
    color: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(243, 245, 247, 0.6)',
    background: theme.palette.isLight ? colors[scope]?.color : colors[scope]?.color,
    ...(codeOnly && {
      padding: '1px 8px 1px 8px',
      borderRadius: 6,
    }),
    ...(scope === TeamScopeEnum.All && {
      padding: '1px 16px 1px 16px',
      background: 'revert',
    }),

    [theme.breakpoints.up('tablet_768')]: {
      fontSize: 14,
    },
  })
);
const ScopeContainer = styled('div')<{ colors: ScopeColors; scope: TeamScopeEnum }>(({ theme, colors, scope }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? colors[scope]?.color : colors[scope]?.colorDark,
  ...(scope === TeamScopeEnum.All && {
    color: theme.palette.isLight ? colors[scope].color : colors[scope].colorDark,
  }),
}));
