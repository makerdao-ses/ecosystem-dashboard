import React from 'react';
import ArrowUp from '../svg/arrow-up';
import ArrowDown from '../svg/arrow-down';
import styled from '@emotion/styled';
import { SortEnum } from '../../../core/enums/sort.enum';
import { Typography } from '@mui/material';

export interface CustomTableHeaderProps {
  state: SortEnum;
  title: string;
  align?: 'flex-start' | 'center' | 'flex-end';
}

export const CustomTableHeader = (props: CustomTableHeaderProps) => {
  return <Container className="no-select" align={props.align}>
    <Typography>{props.title}</Typography>
    {props.state !== SortEnum.Disabled && <Arrows>
      <ArrowUp fill={props.state === SortEnum.Asc ? 'black' : 'lightgray'}/>
      <ArrowDown fill={props.state === SortEnum.Desc ? 'black' : 'lightgray'}/>
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
  margin: '0 6px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
