import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import merge from 'lodash/merge';
import React from 'react';
import { buildBorderStyles, buildPaddingStyles, buildWidthStyles } from '../../utils';
import type { GenericCell } from '../../types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface BasicCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const BasicCell: React.FC<BasicCellProps> = ({ cell, className, as }) => {
  const { isLight } = useThemeContext();

  return (
    <TD
      className={className}
      as={as ?? (cell.isHeader ? 'th' : 'td')}
      isLight={isLight}
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
};

export default BasicCell;

const TD = styled.td<
  WithIsLight & {
    align: GenericCell['alignment'];
    padding: GenericCell['cellPadding'];
    border: GenericCell['border'];
    cellWidth: GenericCell['width'];
  }
>(({ isLight, align, padding, border, cellWidth }) => ({
  textAlign: align,
  ...merge(buildPaddingStyles(padding), buildWidthStyles(cellWidth), buildBorderStyles(border, isLight)),
}));
