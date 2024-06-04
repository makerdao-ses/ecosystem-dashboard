import styled from '@emotion/styled';
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
    <TableHead isLight={isLight}>
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

const TableHead = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  background: isLight ? '#F7F8F9' : '#25273D',
  padding: '14px 0',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  boxShadow: isLight
    ? 'inset .25px -.25px .25px .25px rgba(190, 190, 190, 0.25), 0px 20px 40px rgba(190, 190, 190, .25), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4)',
}));

const TableHeadRow = styled.div<{ columns: CustomTableColumn[] }>(({ columns }) => ({
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
