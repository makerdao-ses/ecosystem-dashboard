import React, { CSSProperties } from 'react';
import ArrowUp from '../svg/arrow-up';
import ArrowDown from '../svg/arrow-down';
import styled from '@emotion/styled';
import { SortEnum } from '../../../core/enums/sort.enum';
import { Typography } from '@mui/material';

export interface CustomTableHeaderProps {
  state: SortEnum;
  title: string;
  align?: 'flex-start' | 'center' | 'flex-end';
  style?: CSSProperties;
}

export const CustomTableHeader = (props: CustomTableHeaderProps) => {
  return <Container className="no-select" align={props.align} style={props.style}>
    <Typography>{props.title}</Typography>
    {props.state !== SortEnum.Disabled && <Arrows>
      <ArrowUp fill={props.state === SortEnum.Asc ? '#231536' : '#708390'}/>
      <ArrowDown fill={props.state === SortEnum.Desc ? '#231536' : '#708390'}/>
    </Arrows>}
  </Container>;
};

const Container = styled.div<{align?: string}>((props) => ({
  display: 'flex',
  cursor: 'pointer',
  justifyContent: props.align ?? 'flex-start'
}));

const Arrows = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
