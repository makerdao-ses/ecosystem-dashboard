import { styled } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { SortEnum } from '@ses/core/enums/sortEnum';
import React from 'react';
import { CustomTableHeader } from '@/stories/components/CustomTableHeader/CustomTableHeader';
import { CustomTableHeaderSkeleton } from '../CustomTableHeaderSkeleton';
import type { CustomTableColumn } from '../CustomTable2';

interface Props {
  columns: CustomTableColumn[];
  loading?: boolean;
  handleSort?: (index: number) => void;
  headersSort?: SortEnum[];
}

export const HeadCustomTable = (props: Props) => {
  const { isLight } = useThemeContext();
  if (props.loading) {
    return <CustomTableHeaderSkeleton isLight={isLight} />;
  }
  return (
    <TableHead>
      <TableHeadRow columns={props.columns}>
        {props.columns?.map((column, i) => (
          <TableCell
            key={`header-${i}`}
            width={column.width}
            styles={{
              justifyContent: column.justifyContent,
              ...column.style,
            }}
          >
            <CustomTableHeader
              style={column.style}
              align={column.headerAlign}
              state={props.headersSort?.[i] ?? SortEnum.Neutral}
              title={column.header ?? ''}
              onSort={() => props.handleSort?.(i)}
            />
          </TableCell>
        ))}
      </TableHeadRow>
    </TableHead>
  );
};

const TableHead = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : '#212630',
  padding: '14px 16px',
  borderRadius: 16,

  boxShadow: theme.palette.isLight ? theme.fusionShadows.shortShadow : theme.fusionShadows.darkMode,
}));

const TableHeadRow = styled('div')<{ columns: CustomTableColumn[] }>(({ columns }) => ({
  display: 'flex',
  justifyContent: 'space-between',

  width: columns?.reduce((prev, curr) => `${prev} ${curr.width}`, ''),
}));

const TableCell = styled('div')<{ width?: string; styles?: React.CSSProperties }>(({ width, styles }) => ({
  color: '#231536',
  display: 'flex',
  alignItems: 'center',
  ...(width && { width }),

  ...(styles || {}),
}));
