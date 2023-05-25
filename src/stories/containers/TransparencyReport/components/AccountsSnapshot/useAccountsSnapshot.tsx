import { useThemeContext } from '@ses/core/context/ThemeContext';
import { EXPENSES_COMPARISON_TABLE_HEADER } from './components/ExpensesComparison/ExpensesComparison';
import type { RowProps } from '@ses/components/AdvanceTable/types';

const useAccountsSnapshot = () => {
  const { isLight } = useThemeContext();

  const expensesComparisonRows = [
    {
      render: ({ children }) => <tr style={{ background: 'rgba(236, 239, 249, 0.5)' }}>{children}</tr>,
      cellPadding: {
        table_834: '18.5px 8px',
        desktop_1194: '17.4px 16px',
      },
      cells: [
        {
          value: 'MAY-2023',
          defaultRenderer: 'boldText',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[0],
          isCardHeader: true,
        },
        {
          value: '221,503.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[1],
        },
        {
          value: '240,000.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[2],
        },
        {
          value: '8.35%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[3],
        },
        {
          value: '221,504.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[4],
        },
        {
          value: '0.00%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[5],
        },
      ],
    },
    {
      cellPadding: {
        table_834: '18.5px 8px',
        desktop_1194: '17.4px 16px',
      },
      cells: [
        {
          value: 'APR-2023',
          defaultRenderer: 'boldText',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[0],
          isCardHeader: true,
        },
        {
          value: '171,503.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[1],
        },
        {
          value: '170,000.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[2],
        },
        {
          value: '-0.88%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[3],
        },
        {
          value: '171,500,00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[4],
        },
        {
          value: '0.00%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[5],
        },
      ],
    },
    {
      cellPadding: {
        table_834: '18.5px 8px',
        desktop_1194: '17.4px 16px',
      },
      cells: [
        {
          value: 'MAR-2023',
          defaultRenderer: 'boldText',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[0],
          isCardHeader: true,
        },
        {
          value: '288,503.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[1],
        },
        {
          value: '280,000.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[2],
        },
        {
          value: '-2,95%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[3],
        },
        {
          value: '288,300.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[4],
        },
        {
          value: '-0.07%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[5],
        },
      ],
    },
    {
      cellPadding: {
        table_834: '17px 8px 18.5px',
        desktop_1194: '17.4px 16px',
      },
      cells: [
        {
          value: 'Totals',
          defaultRenderer: 'boldText',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[0],
          isCardHeader: true,
        },
        {
          value: '681,509.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[1],
        },
        {
          value: '681,509.00 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[2],
        },
        {
          value: '1.25%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[3],
        },
        {
          value: '681,304.25 DAI',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[4],
        },
        {
          value: '-0.03%',
          defaultRenderer: 'number',
          inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[5],
        },
      ],
      extraProps: {
        isBold: true,
      },
      border: {
        top: true,
      },
      rowToCardConfig: {
        type: 'total',
      },
    },
  ] as RowProps[];

  return {
    isLight,
    expensesComparisonRows,
  };
};

export default useAccountsSnapshot;
