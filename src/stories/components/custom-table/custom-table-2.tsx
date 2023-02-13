import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import CardItemCoreUnitMobile from './custom-table-mobile/card-mobile';
import { HeadCustomTable } from './head-custom-table/head-custom-table-2';
import ListCoreUnit from './list-core-unit/list-core-unit';
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
  value: CoreUnitDto;
  key: string;
}

interface Props {
  columns: CustomTableColumn[];
  items?: CustomTableRow[];
  loading?: boolean;
  sortState?: SortEnum[];
  handleSort?: (index: number) => void;
  headersSort?: SortEnum[];
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
              <ListCoreUnit
                columns={props.columns}
                isLoading={props.loading}
                queryStrings={props.queryStrings}
                rows={rows}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
      <ListWrapper>
        {rows?.map((row: CustomTableRow, i) => (
          <CardItemCoreUnitMobile coreUnit={row?.value} key={i} />
        ))}
      </ListWrapper>
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
