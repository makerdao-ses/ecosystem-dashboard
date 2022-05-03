import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import './TableCore.scss';
import HeaderCoreUnit from './Header/HeaderCoreUnit/HeaderCoreUnit';

interface Data {
  core: string;
  initiatives: number;
  expenditure: number;
  team: number;
  links: number;
}

function createData(
  core: string,
  initiatives: number,
  expenditure: number,
  team: number,
  links: number
): Data {
  return {
    core,
    initiatives,
    expenditure,
    team,
    links,
  };
}

const rows = [
  createData('Cupcake', 44, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

const TableCoreUnits = () => {
  return (
    <TableContainer className="container-table">
      <Table className="table">
        <HeaderCoreUnit />
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow key={index} style={{ margin: 5 }}>
                <TableCell width="25%">{row.core}</TableCell>
                <TableCell align="left" width="15%">
                  {row.initiatives}
                </TableCell>
                <TableCell align="left" width="20%">
                  {row.expenditure}
                </TableCell>
                <TableCell align="left" width="20%">
                  {row.team}
                </TableCell>
                <TableCell align="left" width="20%">
                  {row.links}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCoreUnits;
