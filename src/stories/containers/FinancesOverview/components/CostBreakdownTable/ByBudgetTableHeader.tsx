import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import { TABLE_COLUMN_SIZE_BUDGET } from '../../utils/tableColumnSizes';
import TableHeaderItem from './TableHeaderItem';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const ByBudgetTableHeader: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <TableHeader isLight={isLight}>
      <TableHeaderItem width={TABLE_COLUMN_SIZE_BUDGET[0]} align={'left'}>
        Budget
      </TableHeaderItem>
      <TableHeaderItem width={TABLE_COLUMN_SIZE_BUDGET[1]} align={'right'}>
        % of total
      </TableHeaderItem>
      <TableHeaderItem width={TABLE_COLUMN_SIZE_BUDGET[2]} align={'right'}>
        Total Spend
      </TableHeaderItem>
      <TableHeaderItem width={TABLE_COLUMN_SIZE_BUDGET[3]} />
    </TableHeader>
  );
};

export default ByBudgetTableHeader;

const TableHeader = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  padding: 16,
}));
