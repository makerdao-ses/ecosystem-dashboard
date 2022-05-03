import * as React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import './HeaderCore.scss';
import ItemHeaderCoreUnit from '../itemHeader/ItemHeaderCoreUnit';

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
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.label} padding="none">
            <ItemHeaderCoreUnit title={headCell.label} />
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderCoreUnit;
