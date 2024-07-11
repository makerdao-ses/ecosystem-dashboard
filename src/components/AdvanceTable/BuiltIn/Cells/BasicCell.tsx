import { styled } from '@mui/material';
import merge from 'lodash/merge';
import { buildBorderStyles, buildPaddingStyles, buildWidthStyles } from '../../utils';
import type { GenericCell } from '../../types';

interface BasicCellProps {
  cell: GenericCell;
  className?: string;
  asComponent?: keyof JSX.IntrinsicElements;
}

const BasicCell: React.FC<BasicCellProps> = ({ cell, className, asComponent }) => (
  <TD
    className={className}
    as={asComponent ?? (cell.isHeader ? 'th' : 'td')}
    align={cell.alignment ?? cell.inherit?.alignment ?? 'left'}
    padding={cell.cellPadding ?? cell.inherit?.cellPadding ?? '16px'}
    rowSpan={cell.rowSpan ?? cell.inherit?.rowSpan}
    colSpan={cell.colSpan ?? cell.inherit?.colSpan}
    border={cell.border ?? cell.inherit?.border ?? {}}
    cellWidth={cell.width ?? cell.inherit?.width}
  >
    {cell.value as React.ReactNode}
  </TD>
);

export default BasicCell;

const TD = styled('td')<{
  align: GenericCell['alignment'];
  padding: GenericCell['cellPadding'];
  border: GenericCell['border'];
  cellWidth: GenericCell['width'];
}>(({ theme, align, padding, border, cellWidth }) => ({
  textAlign: align,
  ...merge(buildPaddingStyles(padding), buildWidthStyles(cellWidth), buildBorderStyles(border, theme.palette.isLight)),
}));
