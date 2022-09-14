import React, { CSSProperties, useMemo } from 'react';
import styled from '@emotion/styled';
import { CustomTableHeader } from '../custom-table-header/custom-table-header';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomTableHeaderSkeleton } from './custom-table-header.skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';
import { selectCuTableHeadersSort, setSort } from '../../containers/cu-table/cu-table.slice';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { SortEnum } from '../../../core/enums/sort.enum';
import { renderCard } from '../../containers/cu-table/cu-table.renders';

export interface CustomTableColumn {
  justifyContent?: string;
  header?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellRender?: (data: any) => JSX.Element;
  headerAlign?: 'flex-start' | 'center' | 'flex-end';
  isCardHeader?: boolean;
  isCardFooter?: boolean;
  width?: string;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (param: any) => void;
  style?: CSSProperties;
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
}

export const CustomTable2 = ({ ...props }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const dispatch = useAppDispatch();

  const headersSort = useSelector((state: RootState) => selectCuTableHeadersSort(state));
  const handleSort = (index: number) => dispatch(setSort(index));

  const tableHead = useMemo(() => {
    if (props.loading) {
      return <CustomTableHeaderSkeleton isLight={isLight} />;
    }
    return (
      <TableHead isLight={isLight}>
        <TableHeadRow>
          {props.columns?.map((column, i) => (
            <TableCell
              key={`header-${i}`}
              style={{
                justifyContent: column.justifyContent,
              }}
              onClick={() => handleSort(i)}
            >
              <CustomTableHeader
                style={column.style}
                align={column.headerAlign}
                state={headersSort[i]}
                title={column.header ?? ''}
              />
            </TableCell>
          ))}
        </TableHeadRow>
      </TableHead>
    );
  }, [props.items, isLight]);

  const rows = props.loading ? new Array(10).fill(null) : props.items;

  return (
    <>
      <TableWrapper>
        <TableContainer isLight={isLight}>
          <Table>
            {tableHead}
            <TableBody isLight={isLight}>
              {rows?.map((row, i) => (
                <TableRow key={`row-${row?.key ?? i}`} isLight={isLight} isLoading={props.loading}>
                  {props.columns?.map((column) => (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <TableCell key={column?.header} onClick={() => column.onClick?.(row?.value)}>
                      {column.cellRender?.(row?.value as any)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
      <ListWrapper>
        {rows?.map((row, i) => renderCard(row?.value, i))}
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

const TableHead = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'relative',
  zIndex: 1,
  background: isLight ? '#F7F8F9' : '#25273D',
  padding: '14px 0',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  boxShadow: isLight
    ? 'inset .25px -.25px .25px .25px rgba(190, 190, 190, 0.25), 0px 20px 40px rgba(190, 190, 190, .25), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4)',
}));

const TableRow = styled.div<{ isLight: boolean; isLoading?: boolean }>(({ isLight, isLoading }) => ({
  background: isLight ? 'white' : '#10191F',
  display: 'grid',
  gridTemplateColumns: '400px 215px 205px 358px',
  marginTop: '16px',
  boxShadow: isLight
    ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  '@media (min-width: 1180px) and (max-width: 1280px)': {
    gridTemplateColumns: '360px 215px 205px 340px',
  },
  ':hover': {
    background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
  },
}));

const TableHeadRow = styled.div({
  display: 'inline-grid',
  gridTemplateColumns: '400px 215px 205px 358px',
  '@media (min-width: 1180px) and (max-width: 1280px)': {
    gridTemplateColumns: '360px 215px 205px 340px',
  },
});

const TableCell = styled.div({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
});

const TableBody = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#F7F8F966' : 'none',
}));

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1180px)': {
    display: 'flex',
  },
});

const ListWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1180px)': {
    display: 'none',
  },
});
