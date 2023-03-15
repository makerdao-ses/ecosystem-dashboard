import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import TableHeaderItem from './TableHeaderItem';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const ByBudgetTableHeader: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <TableHeader isLight={isLight}>
      <BudgetColumn>Budget</BudgetColumn>
      <TotalPercentageColumn>% of total</TotalPercentageColumn>
      <TotalSpendColumn>Total Spend</TotalSpendColumn>
      <ViewColumn />
    </TableHeader>
  );
};

export default ByBudgetTableHeader;

const TableHeader = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : 'red'}`,
  padding: '16px 0 14px 0',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '16px 0',
  },
}));

const BudgetColumn = styled(TableHeaderItem)({
  width: '100%',
  textAlign: 'left',
  paddingLeft: 16,
});

const TotalPercentageColumn = styled(TableHeaderItem)({
  width: 170,
  minWidth: 170,
  textAlign: 'right',
  paddingRight: 8,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 183.5,
    minWidth: 183.5,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 180,
    minWidth: 180,
  },
});

const TotalSpendColumn = styled(TableHeaderItem)({
  width: 153,
  minWidth: 153,
  textAlign: 'right',
  paddingRight: 4,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 183.5,
    minWidth: 183.5,
    paddingRight: 8,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 157,
    minWidth: 157,
  },
});

const ViewColumn = styled(TableHeaderItem)({
  width: 70,
  minWidth: 70,

  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    width: 93,
    minWidth: 93,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 80,
    minWidth: 80,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 97,
    minWidth: 97,
  },
});
