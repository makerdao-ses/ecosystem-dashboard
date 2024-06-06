import { styled, useTheme } from '@mui/material';
import React from 'react';
import { SortEnum } from '../../../core/enums/sortEnum';
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
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  return (
    <Container
      className="no-select"
      align={props.align}
      style={props.style}
      onClick={props.state !== SortEnum.Disabled ? props.onSort : undefined}
    >
      <Label>{props.title}</Label>
      {props.state !== SortEnum.Disabled && (
        <Arrows>
          <ArrowUp
            fill={
              isLight
                ? props.state === SortEnum.Asc
                  ? theme.palette.colors.slate[200]
                  : theme.palette.colors.slate[100]
                : props.state === SortEnum.Asc
                ? theme.palette.colors.slate[600]
                : theme.palette.colors.slate[500]
            }
            style={{ margin: '4px 0' }}
          />
          <ArrowDown
            fill={
              isLight
                ? props.state === SortEnum.Desc
                  ? theme.palette.colors.slate[200]
                  : theme.palette.colors.slate[100]
                : props.state === SortEnum.Desc
                ? theme.palette.colors.slate[600]
                : theme.palette.colors.slate[500]
            }
          />
        </Arrows>
      )}
    </Container>
  );
};

const Label = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
  fontWeight: theme.palette.isLight ? 600 : 500,
  lineHeight: theme.palette.isLight ? '24px' : '22px',
}));

const Container = styled('div')<{ align?: string }>((props) => ({
  display: 'flex',
  cursor: 'pointer',
  justifyContent: props.align ?? 'flex-start',
  whiteSpace: 'nowrap',
}));

const Arrows = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
