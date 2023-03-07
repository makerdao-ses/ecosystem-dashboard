import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { useAppDispatch } from '../../../core/hooks/reduxHooks';
import { selectCuTableHeadersSort, setSort } from '../../containers/cu-table/cu-table.slice';
import { CustomTableHeader } from '../CustomTableHeader/CustomTableHeader';
import { CustomTableHeaderSkeleton } from './CustomTableHeaderSkeleton';
import type { RootState } from '../../../core/store/store';
import type { CSSProperties } from 'react';

interface CustomTableProps {
  headers: string[];
  items?: (JSX.Element | string)[][];
  headersAlign?: ('flex-start' | 'center' | 'flex-end')[];
  headersStyles?: CSSProperties[];
  loading?: boolean;
}

export const CustomTable = ({ headersStyles = [], ...props }: CustomTableProps) => {
  const { isLight } = useThemeContext();
  const dispatch = useAppDispatch();

  const headersSort = useSelector((state: RootState) => selectCuTableHeadersSort(state));
  const handleSort = useMemo(() => {
    const handleSort = (index: number) => dispatch(setSort(index));
    return handleSort;
  }, [dispatch]);

  const tableHead = useMemo(() => {
    if (props.loading) {
      return <CustomTableHeaderSkeleton isLight={isLight} />;
    }
    return (
      <TableHead isLight={isLight}>
        <TableHeadRow>
          {props.headers?.map((header, i) => (
            <TableCell
              key={`header-${i}`}
              style={{
                justifyContent: props.headersAlign && props.headersAlign[i],
              }}
              onClick={() => handleSort(i)}
            >
              <CustomTableHeader
                style={headersStyles[i] ?? {}}
                align={props.headersAlign && props.headersAlign[i]}
                state={headersSort[i]}
                title={header}
              />
            </TableCell>
          ))}
        </TableHeadRow>
      </TableHead>
    );
  }, [props.loading, props.headers, props.headersAlign, isLight, headersStyles, headersSort, handleSort]);

  return (
    <TableContainer isLight={isLight}>
      <Table>
        {tableHead}
        <TableBody isLight={isLight}>
          {props.items?.map((row, i) => (
            <TableRow key={i} isLight={isLight} isLoading={props.loading}>
              {row.map((item, j) => (
                <TableCell key={`${i}-${j}`}>{item}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
  '@media (min-width: 1194px) and (max-width: 1280px)': {
    gridTemplateColumns: '360px 215px 205px 340px',
  },
  ':hover': {
    background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
  },
}));

const TableHeadRow = styled.div({
  display: 'inline-grid',
  gridTemplateColumns: '400px 215px 205px 358px',
  '@media (min-width: 1194px) and (max-width: 1280px)': {
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
