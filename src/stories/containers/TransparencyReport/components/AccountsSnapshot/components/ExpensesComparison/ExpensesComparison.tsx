import styled from '@emotion/styled';
import AdvanceTable from '@ses/components/AdvanceTable/AdvanceTable';
import Information from '@ses/components/svg/information';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import type { RowProps } from '@ses/components/AdvanceTable/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface ExpensesComparisonProps {
  rows: RowProps[];
}

const HeaderWithIcon = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 6.5,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 10,
  },
});

export const EXPENSES_COMPARISON_TABLE_HEADER = [
  {
    cells: [
      {
        value: 'Reported actuals',
        rowSpan: 2,
        colSpan: 2,
        border: {
          right: true,
        },
        alignment: 'right',
      },
      {
        value: 'Net Expense Transactions',
        defaultRenderer: 'boldText',
        colSpan: 4,
        border: {
          bottom: true,
        },
        cellPadding: {
          table_834: '16px 16px 18px',
          desktop_1194: '16px',
        },
        alignment: 'center',
      },
    ],
  },
  {
    cellPadding: {
      table_834: '23px 8px 23px 0',
      desktop_1194: '23px 16px',
    },
    cells: [
      {
        isHidden: true,
        border: {
          right: true,
        },
        width: {
          desktop_1194: '16.463%',
          table_834: '12%',
        },
      },
      {
        isHidden: true,
        border: {
          right: true,
        },
        alignment: 'right',
        width: {
          desktop_1194: '16.463%',
          table_834: '18.463%',
        },
      },
      {
        value: (
          <HeaderWithIcon>
            On-Chain Only <Information />
          </HeaderWithIcon>
        ),
        alignment: 'right',
        width: {
          desktop_1194: '22.027%',
          table_834: '19.5%',
        },
        cellPadding: {
          table_834: '23px 13px 23px 0',
          desktop_1194: '23px 16px',
        },
      },
      {
        value: 'difference',
        alignment: 'right',
        width: {
          desktop_1194: '11.28%',
          table_834: '11.28%',
        },
        border: {
          right: true,
        },
      },
      {
        value: (
          <HeaderWithIcon>
            Including off-chain <Information />
          </HeaderWithIcon>
        ),
        alignment: 'right',
        width: {
          desktop_1194: '22.027%',
          table_834: '26%',
        },
        cellPadding: {
          table_834: '23px 13px 23px 0',
          desktop_1194: '23px 16px',
        },
      },
      {
        value: 'difference',
        alignment: 'right',
      },
    ],
    border: {
      bottom: true,
    },
  },
] as RowProps[];

const ExpensesComparison: React.FC<ExpensesComparisonProps> = ({ rows }) => {
  const { isLight } = useThemeContext();

  return (
    <div>
      <SectionHeader
        title="Reported Expenses Comparison"
        subtitle={'Reported actuals compared to expense and revenue transactions.'}
        tooltip={'pending...'}
      />

      <TableWrapper>
        <StyledTable isLight={isLight} header={EXPENSES_COMPARISON_TABLE_HEADER} body={rows} />
      </TableWrapper>
    </div>
  );
};

export default ExpensesComparison;

const TableWrapper = styled.div({
  marginTop: 24,
});

const StyledTable = styled(AdvanceTable)<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#1E2C37',
}));
