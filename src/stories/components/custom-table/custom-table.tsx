import React from 'react';
import styled from '@emotion/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { TableHead, TableRow } from '@mui/material';
import { CustomTableHeader } from '../custom-table-header/custom-table-header';
import { SortEnum } from '../../../core/enums/sort.enum';

interface CustomTableProps {
  headers: string[],
  items?: (JSX.Element | string)[][],
  headersAlign?: ('flex-start' | 'center' | 'flex-end')[],
  headersSort?: SortEnum[],
  sortFunction?: (index: number, previousSort: SortEnum) => void,
}

export const CustomTable = ({ headersSort = [], ...props }: CustomTableProps) => {
  return (
    <TableContainer sx={{ border: '1px solid #C4C4C4', background: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            {props.headers?.map((header, i) =>
              <TableCell
                key={`header-${i}`}
                onClick={() => headersSort && headersSort[i] && headersSort[i] !== SortEnum.Disabled && props.sortFunction && props.sortFunction(i, headersSort[i])}>
                <CustomTableHeader align={props.headersAlign && props.headersAlign[i]} state={headersSort[i]} title={header}/>
              </TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items?.map((row, i) => <TableRow key={i}>
            {row.map((item, j) => <TableCell key={`${i}-${j}`} onClick={() => { console.log(item); }}>{item}</TableCell>)}
          </TableRow>)}
        </TableBody>
      </Table>
      {(!props.items || props.items.length === 0) && <Placeholder>There is no data to show</Placeholder>}
    </TableContainer>);
};

const Placeholder = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '600px',
});
