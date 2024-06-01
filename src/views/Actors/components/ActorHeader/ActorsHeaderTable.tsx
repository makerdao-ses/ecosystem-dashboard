import { styled, useTheme } from '@mui/material';
import ArrowDown from '@ses/components/svg/arrow-down';
import ArrowUp from '@ses/components/svg/arrow-up';
import { SortEnum } from '@ses/core/enums/sortEnum';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import Card from '@/components/Card/Card';
export interface ActorTableHeader {
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  styles?: React.CSSProperties;
  sort?: SortEnum;
  hidden?: boolean;
  sortReverse?: boolean;
}

export interface Props {
  columns: ActorTableHeader[];
  sortClick?: (index: number) => void;
}

const ActorsHeaderTable: React.FC<Props> = ({ columns, sortClick }) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  return (
    <TableHeader isLight={isLight}>
      <TableHeaderRow className="no-select">
        {columns
          .filter((column) => !column.hidden)
          .map((column, i) => (
            <TableHeaderTitle
              key={column.header}
              width={column.width}
              styles={column.styles}
              align={column.align ?? 'left'}
              onClick={() => column.sort !== SortEnum.Disabled && sortClick?.(i)}
            >
              {column.header}
              {column.sort !== SortEnum.Disabled && (
                <Arrows>
                  <ArrowUp
                    fill={
                      isLight
                        ? column.sort === SortEnum.Asc
                          ? theme.palette.colors.slate[200]
                          : theme.palette.colors.slate[100]
                        : column.sort === SortEnum.Asc
                        ? theme.palette.colors.slate[600]
                        : theme.palette.colors.slate[500]
                    }
                    style={{ margin: '4px 0' }}
                  />
                  <ArrowDown
                    fill={
                      isLight
                        ? column.sort === SortEnum.Desc
                          ? theme.palette.colors.slate[200]
                          : theme.palette.colors.slate[100]
                        : column.sort === SortEnum.Desc
                        ? theme.palette.colors.slate[600]
                        : theme.palette.colors.slate[500]
                    }
                  />
                </Arrows>
              )}
            </TableHeaderTitle>
          ))}
      </TableHeaderRow>
    </TableHeader>
  );
};

export default ActorsHeaderTable;
const TableHeader = styled(Card)<{ isLight: boolean; isGlobal?: boolean }>(({ theme }) => ({
  display: 'none',
  position: 'relative',
  zIndex: 1,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(33, 38, 48, 1)',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[600],
  border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[200] : 'none'}`,

  padding: 15,

  borderRadius: '6px',
  lineHeight: '24px',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 24px 16px 24px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: 15,
  },
}));

const TableHeaderRow = styled('div')({
  display: 'flex',
});

const TableHeaderTitle = styled('div')<{
  width?: string;
  styles?: React.CSSProperties;
  align: 'left' | 'center' | 'right';
}>(({ width, styles, align, theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: theme.palette.isLight ? 600 : 500,
  lineHeight: '24px',
  textAlign: align,
  ...(width && { width }),

  ...(styles || {}),
}));

const Arrows = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 8px',
  cursor: 'pointer',
  boxSizing: 'unset',
});
