import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { getScopeColor } from '@ses/core/utils/colors';
import React from 'react';
import type { ActorScopeEnum } from '@ses/core/enums/actorScopeEnum';
import type { CSSProperties } from 'react';

interface ScopeChipProps {
  status: ActorScopeEnum | 'All';
  style?: CSSProperties;
  code: string;
  codeOnly?: boolean;
  isUppercase?: boolean;
}

const ScopeChip = (props: ScopeChipProps) => {
  const { isLight } = useThemeContext();
  const colorsChip = getScopeColor(props.status);

  return (
    <Chip
      style={{
        color: isLight ? colorsChip.color : colorsChip.darkColor,
        background: isLight ? colorsChip.background : colorsChip.darkBackground,
        ...(props.codeOnly && {
          width: 46,
          justifyContent: 'center',
        }),
        ...props.style,
      }}
    >
      <Code isUppercase={props.isUppercase}>{props.code}</Code>
      {!props.codeOnly && <Scope>{props.status}</Scope>}
    </Chip>
  );
};

export default ScopeChip;
const Chip = styled.div({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '6px',
  padding: '4px 8px',
  gap: 2,
  width: 'fit-content',
});

const Code = styled.div<{ isUppercase?: boolean }>(({ isUppercase = true }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: isUppercase ? 'uppercase' : 'none',
}));
const Scope = styled.div({
  fontWeight: 400,
  fontSize: 11,
  lineHeight: '13px',
});
