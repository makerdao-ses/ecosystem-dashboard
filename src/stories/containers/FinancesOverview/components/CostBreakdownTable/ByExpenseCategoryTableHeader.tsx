import styled from '@emotion/styled';
import React from 'react';
import { TABLE_COLUMN_SIZE_CATEGORY } from '../../utils/tableColumnSizes';
import TableHeaderItem from './TableHeaderItem';

const ByExpenseCategoryTableHeader: React.FC = () => (
  <TableHeader>
    <TableHeaderItem width={TABLE_COLUMN_SIZE_CATEGORY[0]} align={'left'}>
      Category
    </TableHeaderItem>
    <TableHeaderItem width={TABLE_COLUMN_SIZE_CATEGORY[1]} align={'right'}>
      % of total
    </TableHeaderItem>
    <TableHeaderItem width={TABLE_COLUMN_SIZE_CATEGORY[2]} />
  </TableHeader>
);

export default ByExpenseCategoryTableHeader;

const TableHeader = styled.div({
  display: 'flex',
  padding: 16,
});
