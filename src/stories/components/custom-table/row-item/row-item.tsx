import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import Link from 'next/link';
import React from 'react';
import type { CustomTableColumn } from '../custom-table-2';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';

interface Props {
  queryStrings: string;
  key: string;
  loading: boolean;
  columns: CustomTableColumn[];
  cu: CoreUnitDto;
}

export const RowItem = ({ queryStrings, key, loading, columns, cu }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Link href={`core-unit/${cu?.shortCode}/${queryStrings}`} passHref>
      <TableRow key={`row-${key}`} isLight={isLight} isLoading={loading} columns={columns}>
        {columns?.map((column) => (
          <TableCell key={column?.header}>{column.cellRender?.(cu)}</TableCell>
        ))}
      </TableRow>
    </Link>
  );
};

const TableRow = styled.a<{ isLight: boolean; isLoading?: boolean; columns: CustomTableColumn[] }>(
  ({ isLight, isLoading, columns }) => ({
    background: isLight ? 'white' : '#10191F',
    display: 'grid',
    gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.responsiveWidth ?? curr.width}`, ''),
    gridTemplateRows: '120px',
    marginTop: '16px',
    cursor: 'pointer',
    borderColor: 'red',
    boxShadow: isLight
      ? '0px 0px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
    ':hover': {
      background: !isLoading ? (isLight ? '#ECF1F3' : '#1E2C37') : isLight ? 'white' : '#10191F',
    },
    '@media (min-width: 1410px)': {
      gridTemplateColumns: columns?.reduce((prev, curr) => `${prev} ${curr.width}`, ''),
      gridTemplateRows: '98px',
    },
  })
);
export const TableCell = styled.div({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
});

export default RowItem;
