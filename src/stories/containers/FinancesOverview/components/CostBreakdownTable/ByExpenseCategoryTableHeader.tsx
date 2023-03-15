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
});

const TotalPercentageColumn = styled(TableHeaderItem)({
  width: 240,
  minWidth: 240,
  textAlign: 'right',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 164,
    minWidth: 164,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 240,
    minWidth: 240,
  },
});

const TotalSpendColumn = styled(TableHeaderItem)({
  width: 200,
  minWidth: 200,
  textAlign: 'right',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 154,
    minWidth: 154,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 200,
    minWidth: 200,
  },
});
