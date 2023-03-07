import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sort.enum';
import ArrowDown from '../svg/arrow-down';
import ArrowUp from '../svg/arrow-up';
import type { CSSProperties } from 'react';

export interface CustomTableHeaderProps {
  state: SortEnum;
  title: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  style?: CSSProperties;
  onSort?: () => void;
}

export const CustomTableHeader = (props: CustomTableHeaderProps) => {
  const { isLight } = useThemeContext();
  return (
    <Container
      className="no-select"
      align={props.align}
      style={props.style}
      onClick={props.state !== SortEnum.Disabled ? props.onSort : undefined}
    >
      <Label isLight={isLight}>{props.title}</Label>
      {props.state !== SortEnum.Disabled && (
        <Arrows>
          <ArrowUp fill={props.state === SortEnum.Asc ? '#231536' : '#708390'} style={{ margin: '4px 0' }} />
          <ArrowDown fill={props.state === SortEnum.Desc ? '#231536' : '#708390'} />
        </Arrows>
      )}
    </Container>
  );
};

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  color: isLight ? '#231536' : '#FFFFFF',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '0.05rem',
}));

const Container = styled.div<{ align?: string }>((props) => ({
  display: 'flex',
  cursor: 'pointer',
  justifyContent: props.align ?? 'flex-start',
  whiteSpace: 'nowrap',
}));

const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
