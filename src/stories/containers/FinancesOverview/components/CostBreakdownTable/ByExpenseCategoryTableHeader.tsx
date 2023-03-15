import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import TableHeaderItem from './TableHeaderItem';

const ByExpenseCategoryTableHeader: React.FC = () => (
  <TableHeader>
    <CategoryColumn>Category</CategoryColumn>
    <TotalPercentageColumn>% of total</TotalPercentageColumn>
    <TotalSpendColumn>Total spend</TotalSpendColumn>
  </TableHeader>
);

export default ByExpenseCategoryTableHeader;

const TableHeader = styled.div({
  display: 'none',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    padding: 16,
  },
});

const CategoryColumn = styled(TableHeaderItem)({
  width: '100%',
  textAlign: 'left',
  // paddingLeft: 16,
});

const TotalPercentageColumn = styled(TableHeaderItem)({
  width: 240,
  minWidth: 240,
  textAlign: 'right',
  // paddingRight: 8,
});

const TotalSpendColumn = styled(TableHeaderItem)({
  width: 240,
  minWidth: 240,
  textAlign: 'right',
  // paddingRight: 16,
});
