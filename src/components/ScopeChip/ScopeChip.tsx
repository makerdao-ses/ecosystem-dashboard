import { styled } from '@mui/material';
import React from 'react';
import { TeamScopeEnum } from '@/core/enums/actorScopeEnum';
import type { Scope } from '@/core/models/interfaces/scopes';
import useScopeColors from './useScopeColors';
import type { ScopeColors } from './useScopeColors';

export type ScopeSizeVariant = 'small' | 'medium' | 'large' | 'extraLarge';
interface Props {
  scope: Scope;
  className?: string;
  size?: ScopeSizeVariant;
}

const ScopeChip: React.FC<Props> = ({ scope, className, size = 'large' }) => {
  const colors = useScopeColors();
  const renderValue = size === 'small' || size === 'medium' ? scope.code : scope.name;

  return (
    <Chip className={className} scope={scope.name} colors={colors} type={size}>
      <Code colors={colors} scope={scope.name} type={size}>
        {renderValue}
      </Code>
    </Chip>
  );
};

export default ScopeChip;
const Chip = styled('div')<{ colors: ScopeColors; scope: TeamScopeEnum; type: ScopeSizeVariant }>(
  ({ theme, scope, colors, type }) => ({
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    width: 'fit-content',
    border: `1.5px solid ${theme.palette.isLight ? colors[scope]?.color : colors[scope]?.colorDark}`,
    background: theme.palette.isLight ? colors[scope]?.background : colors[scope]?.backgroundDark,

    ...((type === 'small' || type === 'medium' || type === 'large') && {
      padding: '1px 8px ',
    }),
    ...(type === 'extraLarge' && {
      padding: '5px 8px ',
      border: `2px solid ${theme.palette.isLight ? colors[scope]?.color : colors[scope]?.colorDark}`,
    }),
    ...(scope === TeamScopeEnum.All && {
      padding: '1px 16px 1px 16px',
      border: `1.5px solid ${theme.palette.isLight ? colors[scope]?.borderColor : colors[scope]?.borderColorDark}`,
    }),
  })
);

const Code = styled('div')<{
  isUppercase?: boolean;
  colors: ScopeColors;
  scope: TeamScopeEnum;

  className?: string;
  type: ScopeSizeVariant;
}>(({ scope, theme, colors, type }) => ({
  color: theme.palette.isLight ? colors[scope]?.color : colors[scope]?.colorDark,
  width: 'fit-content',
  ...(type === 'small' && {
    fontWeight: 800,
    fontSize: 12,
    lineHeight: '22px',
    textAlign: 'center',
    textTransform: 'uppercase',
  }),
  ...(type === 'medium' && {
    fontWeight: 800,
    fontSize: 14,
    lineHeight: '22px',
    textAlign: 'center',
    textTransform: 'uppercase',
  }),
  ...((type === 'large' || type === 'extraLarge') && {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '22px',
    textAlign: 'center',
  }),
  ...(scope === TeamScopeEnum.All && {
    textTransform: 'revert',
    fontWeight: 600,
  }),
}));
