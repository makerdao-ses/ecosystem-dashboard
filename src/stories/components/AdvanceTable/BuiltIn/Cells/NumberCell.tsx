import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { formatNumber } from '@ses/core/utils/string';
import React from 'react';
import BasicCell from './BasicCell';
import type { GenericCell } from '../../types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface NumberCellProps {
  cell: GenericCell;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const NumberCell: React.FC<NumberCellProps> = ({ cell, className, as }) => {
  const { isLight } = useThemeContext();

  return (
    <Cell
      className={className}
      as={as ?? (cell.isHeader ? 'th' : 'td')}
      isLight={isLight}
      cell={{
        ...cell,
        value: formatNumber(cell.value as number),
      }}
    />
  );
};

export default NumberCell;

const Cell = styled(BasicCell)<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#FFFFFF',
}));
