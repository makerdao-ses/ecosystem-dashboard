import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';

interface CustomTableProps {
  headers: string[],
  items?: (JSX.Element | string)[][],
  headersAlign?: ('left' | 'right' | 'inherit' | 'center' | 'justify')[]
}

export const CustomTable = (props: CustomTableProps) => {
  return (
    <TableContainer sx={{ border: '1px solid #C4C4C4', background: 'white' }}>
      <Table>
        <TableHead>
          <TableRow>
            {props.headers?.map((header, i) => <TableCell key={`header-${i}`} align={props.headersAlign && props.headersAlign[i] ? props.headersAlign[i] : 'left'}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.items?.map((row, i) => <TableRow key={i}>
            {row.map((item, j) => <TableCell key={`${i}-${j}`}>{item}</TableCell>)}
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
  fontFamily: 'Inter'
});
