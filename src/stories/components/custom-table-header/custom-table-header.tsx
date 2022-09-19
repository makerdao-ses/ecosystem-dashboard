import React, { CSSProperties } from 'react';
import ArrowUp from '../svg/arrow-up';
import ArrowDown from '../svg/arrow-down';
import styled from '@emotion/styled';
import { SortEnum } from '../../../core/enums/sort.enum';
import { useThemeContext } from '../../../core/context/ThemeContext';

export interface CustomTableHeaderProps {
  state: SortEnum;
  title: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  style?: CSSProperties;
}

export const CustomTableHeader = (props: CustomTableHeaderProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container className="no-select" align={props.align} style={props.style}>
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
