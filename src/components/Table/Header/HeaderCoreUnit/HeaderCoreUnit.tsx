import * as React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import ItemHeaderCoreUnit from '../ItemHeader/ItemHeaderCoreUnit';
import './HeaderCore.scss';

interface HeadCell {
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    label: 'Core Units',
  },
  {
    label: 'Initiatives',
  },
  {
    label: 'Expenditure',
  },
  {
    label: 'Team Members',
  },
  {
    label: 'Links',
  },
];

const HeaderCoreUnit = () => {
  return (
    <TableHead className="head">
      {headCells.map((headCell) => (
        <TableCell key={headCell.label} padding='none'>
          <ItemHeaderCoreUnit title={headCell.label} />
        </TableCell>
      ))}
    </TableHead>
  );
};

export default HeaderCoreUnit;
