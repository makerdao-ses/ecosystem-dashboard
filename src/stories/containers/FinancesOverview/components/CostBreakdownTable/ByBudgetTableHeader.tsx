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
      <TotalSpendColumn>Actuals</TotalSpendColumn>
      <ViewColumn />
    </TableHeader>
  );
};

export default ByBudgetTableHeader;

const TableHeader = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  borderBottom: `1px solid ${isLight ? '#D4D9E1' : '#405361'}`,
  padding: '16px 0 14px 0',

  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    padding: '16px 0',
  },
}));

const BudgetColumn = styled(TableHeaderItem)({
  width: '100%',
  textAlign: 'left',
  paddingLeft: 16,

  [lightTheme.breakpoints.up('tablet_768')]: {
    flex: 1.15,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    flex: 1.35,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    flex: 'auto',
  },
});

const TotalPercentageColumn = styled(TableHeaderItem)({
  width: 170,
  minWidth: 170,
  textAlign: 'right',
  paddingRight: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 'auto',
    minWidth: 'auto',
    flex: 1.1,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    flex: 1,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 150,
    minWidth: 150,
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

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 'auto',
    minWidth: 'auto',
    flex: 0.85,
    paddingRight: 8,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    flex: 1,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 144,
    minWidth: 144,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 155,
    minWidth: 155,
  },
});

const ViewColumn = styled(TableHeaderItem)({
  width: 70,
  minWidth: 70,

  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 110,
    minWidth: 110,
  },

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 126,
    minWidth: 126,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 106,
    minWidth: 106,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 115,
    minWidth: 115,
  },
});
