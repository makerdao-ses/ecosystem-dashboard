import { styled } from '@mui/material';
import React from 'react';
import Card from '@/components/Card/Card';
import CardItemCoreUnitMobile from '../CardItemCoreUnitMobile/CardItemCoreUnitMobile';
import type { CustomTableColumn } from '../CustomTable2';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface Props {
  queryStrings?: string;
  isLoading?: boolean;
  columns: CustomTableColumn[];
  cu: CoreUnit;
}

export const ItemCoreUnit = ({ isLoading, columns, cu }: Props) => (
  <>
    <TableWrapper>
      <TableRow isLoading={isLoading} columns={columns}>
        {columns?.map((column) => (
          <TableCell key={column?.header}>{column.cellRender?.(cu)}</TableCell>
        ))}
      </TableRow>
    </TableWrapper>
    <ListWrapper>
      <CardItemCoreUnitMobile coreUnit={cu} />
    </ListWrapper>
  </>
);

const TableWrapper = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    minWidth: '100%',
    gap: 8,
  },
}));

const TableRow = styled(Card)<{ isLoading?: boolean; columns: CustomTableColumn[] }>(
  ({ theme, isLoading, columns }) => ({
    borderRadius: 16,
    background: theme.palette.isLight ? 'white' : theme.palette.colors.charcoal[900],
    display: 'grid',
    padding: '16px 16px 8px 8px',
    width: '100%',
    justifyContent: 'space-between',
    gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.width}`, ''),

    marginTop: '16px',
    cursor: 'pointer',
    boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
    ':hover': {
      background: !isLoading
        ? theme.palette.isLight
          ? theme.palette.colors.gray[50]
          : '#292E38'
        : theme.palette.isLight
        ? 'white'
        : '#10191F',
    },
    [theme.breakpoints.up('desktop_1280')]: {
      padding: '16px 16px 8px 16px',
    },
    [theme.breakpoints.up('desktop_1440')]: {
      padding: '16px 16px 8px 8px',
    },

    [theme.breakpoints.up('desktop_1440')]: {
      gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.width}`, ''),
      width: '100%',
    },
  })
);

export const TableCell = styled('div')({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
});

const ListWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  gap: 32,
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
export default ItemCoreUnit;
