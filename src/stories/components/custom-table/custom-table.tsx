import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { CustomTableHeader } from '../custom-table-header/custom-table-header';
import { SortEnum } from '../../../core/enums/sort.enum';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

interface CustomTableProps {
  headers: string[],
  items?: (JSX.Element | string)[][],
  headersAlign?: ('flex-start' | 'center' | 'flex-end')[],
  headersStyles?: CSSProperties[],
  headersSort?: SortEnum[],
  sortFunction?: (index: number, previousSort: SortEnum) => void,
  loading?: boolean,
}

export const CustomTable = ({ headersSort = [], headersStyles = [], ...props }: CustomTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableHeadRow>
            {props.headers?.map((header, i) =>
              <TableCell
                key={`header-${i}`}
                style={headersStyles[i] ?? {}}
                onClick={() => headersSort && headersSort[i] && headersSort[i] !== SortEnum.Disabled && props.sortFunction && props.sortFunction(i, headersSort[i])}>
                <CustomTableHeader align={props.headersAlign && props.headersAlign[i]} state={headersSort[i]} title={header}/>
              </TableCell>)}
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {props.items?.map((row, i) => <TableRow key={i}>
            {row.map((item, j) => <TableCell key={`${i}-${j}`} onClick={() => { console.log(item); }}>{item}</TableCell>)}
          </TableRow>)}
        </TableBody>
      </Table>
      {(!props.items || props.items.length === 0) && <Placeholder>{props.loading ? <Loading><LoadingSpinner/> <LoadingText>Loading</LoadingText></Loading> : 'There is no data to show'}</Placeholder>}
    </TableContainer>);
};

const Placeholder = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '600px',
});

const TableContainer = styled.div({
  background: 'white',
  display: 'flex',
  flexDirection: 'column'
});

const Table = styled.table({
  borderCollapse: 'separate',
  borderSpacing: '0px 8px',
  tableLayout: 'fixed',
  flex: '1',
  padding: '2px 4px',
});

const TableHead = styled.thead({
  padding: '16px',
  height: '52px',
  background: '#F7F8F9',
});

const TableRow = styled.tr({});

const TableHeadRow = styled.tr({
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  boxShadow: '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
});

const TableCell = styled.td({});

const TableBody = styled.tbody({
  background: '#F7F8F966',
  '> tr': {
    display: 'table-row',
    background: '#FFFFFF',
    boxShadow: '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
    marginBottom: '10px',
  }
});

const Loading = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const LoadingText = styled.span({
  marginLeft: '8px'
});
