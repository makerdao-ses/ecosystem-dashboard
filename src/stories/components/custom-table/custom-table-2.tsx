import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { HeadCustomTable } from './head-custom-table/head-custom-table-2';
import { TablePlaceholder } from './placeholder';
import type { SortEnum } from '../../../core/enums/sort.enum';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';
import type { CSSProperties } from 'react';

export interface CustomTableColumn {
  justifyContent?: string;
  header?: string;
  cellRender?: (data: CoreUnitDto) => JSX.Element;
  headerAlign?: 'flex-start' | 'center' | 'flex-end';
  isCardHeader?: boolean;
  isCardFooter?: boolean;
  width?: string;
  responsiveWidth?: string;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (param: any) => void;
  style?: CSSProperties;
  sortReverse?: boolean;
  hasSort?: boolean;
}

export interface CustomTableRow {
  value: unknown;
  key: string;
}

interface Props {
  columns: CustomTableColumn[];
  items?: CustomTableRow[];
  loading?: boolean;
  sortState?: SortEnum[];
  handleSort?: (index: number) => void;
  headersSort?: SortEnum[];
  renderCard?: (data: CustomTableRow, index: number) => JSX.Element;
  queryStrings?: string;
}

export const CustomTable2 = (props: Props) => {
  const { isLight } = useThemeContext();

  if (!props.loading && props.items?.length === 0) return <TablePlaceholder />;

  const rows = props.loading ? new Array(10).fill(null) : props.items;
  return (
    <>
      <TableWrapper>
        <TableContainer isLight={isLight}>
          <Table>
            <HeadCustomTable {...props} />
            <TableBody isLight={isLight}>
              {rows?.map((row, i) => (
                <Link
                  href={`/core-unit/${(row?.value as CoreUnitDto)?.shortCode}${props.queryStrings}` || ''}
                  passHref
                  legacyBehavior
                  key={`row-${row?.key ?? i}`}
                >
                  <TableRow isLight={isLight} isLoading={props.loading} columns={props.columns}>
                    {props.columns?.map((column) => (
                      <TableCell key={column?.header}>{column.cellRender?.(row?.value as CoreUnitDto)}</TableCell>
                    ))}
                  </TableRow>
                </Link>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
      <ListWrapper>{rows?.map((row, i) => props.renderCard?.(row, i))}</ListWrapper>
    </>
  );
};

const TableContainer = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? 'white' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
  '& *': {
    boxSizing: 'border-box',
  },
}));

const Table = styled.div({
  borderCollapse: 'separate',
  tableLayout: 'fixed',
  flex: '1',
});

const TableRow = styled.a<{ isLight: boolean; isLoading?: boolean; columns: CustomTableColumn[] }>(
  ({ isLight, isLoading, columns }) => ({
    background: isLight ? 'white' : '#10191F',
    display: 'grid',
    gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.responsiveWidth ?? curr.width}`, ''),
    gridTemplateRows: '120px',
    marginTop: '16px',
    cursor: 'pointer',
    boxShadow: isLight
      ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
    ':hover': {
      background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
    },
    '@media (min-width: 1410px)': {
      gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.width}`, ''),
      gridTemplateRows: '98px',
    },
  })
);

export const TableCell = styled.div({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
});

const TableBody = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#F7F8F966' : 'none',
}));

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1194px)': {
    display: 'flex',
  },
});

const ListWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});
