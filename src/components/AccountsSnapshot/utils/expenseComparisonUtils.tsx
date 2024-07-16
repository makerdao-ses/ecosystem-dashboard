import { styled } from '@mui/material';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { DateTime } from 'luxon';
import type { CardRenderProps, RowProps } from '@/components/AdvanceTable/types';
import ExpensesComparisonRowCard from '../components/Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCard';
import {
  expensesComparisonTableHeader,
  expensesComparisonTableHeaderWithoutOffChain,
} from '../components/ExpensesComparison/headers';
import type { ActualsComparison, Token } from '@ses/core/models/dto/snapshotAccountDTO';

export type BreakpointOptions = {
  isTablet: boolean;
};

const RenderCurrentMonthRow: React.FC<React.PropsWithChildren> = ({ children }) => <CustomRow>{children}</CustomRow>;

const CustomRow = styled('tr')(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : '#21262F',

  '&:hover': {
    background: theme.palette.isLight ? '#EEF0F2' : '#20252E',
  },
}));

export const buildRow = (
  values: [string, string, string, string, string, string],
  isCurrentMonth = false,
  isTotal = false,
  breakpointOptions: BreakpointOptions
): RowProps => {
  const EXPENSES_COMPARISON_TABLE_HEADER = expensesComparisonTableHeader(breakpointOptions);

  return {
    ...(isCurrentMonth ? { render: RenderCurrentMonthRow } : {}),
    hover: true,
    cellPadding: {
      tablet_768: isTotal ? '15px 8px 16px' : '16px 8px',
      desktop_1024: isTotal ? '15px 16px 16px' : '15px 16px',
    },
    rowToCardConfig: {
      render: (props: CardRenderProps) => (
        <ExpensesComparisonRowCard
          row={{ cells: props.cells ?? [] }}
          hasOffChainData={true}
          expandable={!!props.cells?.[0].rowIndex}
        />
      ),
      ...(isTotal ? { type: 'total' } : {}),
    },
    ...(isTotal
      ? {
          extraProps: {
            isBold: true,
          },
          border: {
            top: true,
          },
        }
      : {}),
    cells: [
      {
        value: values[0],
        defaultRenderer: 'boldText',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[0],
        isCardHeader: true,
      },
      {
        value: values[1],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[1],
      },
      {
        value: values[2],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[2],
      },
      {
        value: values[3],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[3],
      },
      {
        value: values[4],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[4],
      },
      {
        value: values[5],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[5],
      },
    ],
  } as RowProps;
};

export const buildRowWithoutOffChain = (
  values: [string, string, string, string],
  isCurrentMonth = false,
  isTotal = false
): RowProps => {
  const EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN = expensesComparisonTableHeaderWithoutOffChain();

  return {
    ...(isCurrentMonth ? { render: RenderCurrentMonthRow } : {}),
    hover: true,
    cellPadding: {
      tablet_768: isTotal ? '15px 16px 16px' : 16,
      desktop_1024: isTotal ? '15px 16px 16px' : '15px 16px',
    },
    rowToCardConfig: {
      render: (props: CardRenderProps) => (
        <ExpensesComparisonRowCard
          row={{ cells: props.cells ?? [] }}
          hasOffChainData={false}
          expandable={!!props.cells?.[0].rowIndex}
        />
      ),
      ...(isTotal ? { type: 'total' } : {}),
    },
    ...(isTotal
      ? {
          extraProps: {
            isBold: true,
          },
          border: {
            top: true,
          },
        }
      : {}),
    cells: [
      {
        value: values[0],
        defaultRenderer: 'boldText',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[0],
        isCardHeader: true,
      },
      {
        value: values[1],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[1],
      },
      {
        value: values[2],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[3],
      },
      {
        value: values[3],
        defaultRenderer: isTotal ? 'boldText' : 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[4],
      },
    ],
  } as RowProps;
};

export const formatExpenseMonth = (month: string): string => DateTime.fromFormat(month, 'yyyy/MM').toFormat('MMM-yyyy');

export const formatExpenseWithCurrency = (value: number, currency: Token): string => {
  const formatted = `${usLocalizedNumber(value, 2)} ${currency}`;
  return formatted;
};

export const formatExpenseDifference = (value: number): string => {
  const formatted = `${usLocalizedNumber(value, 2)}%`;
  return formatted;
};

export const getTotals = (values: ActualsComparison[]): ActualsComparison =>
  values.reduce(
    (acc, curr) => {
      acc.reportedActuals += curr.reportedActuals;
      acc.netExpenses.onChainOnly.amount += curr.netExpenses.onChainOnly.amount;
      acc.netExpenses.onChainOnly.difference =
        acc.reportedActuals === 0 || acc.netExpenses.onChainOnly.amount === 0
          ? 0
          : (Math.abs(acc.netExpenses.onChainOnly.amount) / Math.abs(acc.reportedActuals) - 1) * 100;
      acc.netExpenses.offChainIncluded.amount += curr.netExpenses.offChainIncluded.amount;
      acc.netExpenses.offChainIncluded.difference =
        acc.reportedActuals === 0 || acc.netExpenses.offChainIncluded.amount === 0
          ? 0
          : (Math.abs(acc.netExpenses.offChainIncluded.amount) / Math.abs(acc.reportedActuals) - 1) * 100;

      return acc;
    },
    {
      reportedActuals: 0,
      netExpenses: {
        onChainOnly: {
          amount: 0,
          difference: 0,
        },
        offChainIncluded: {
          amount: 0,
          difference: 0,
        },
      },
    } as ActualsComparison
  );

export const buildExpensesComparisonRows = (
  values: ActualsComparison[],
  currency: Token,
  currentPeriod: string,
  hasOffChainData: boolean,
  breakpointOptions: BreakpointOptions
): RowProps[] => {
  const rows: RowProps[] = [];
  if (hasOffChainData) {
    values.forEach((comparison) => {
      const row = buildRow(
        [
          formatExpenseMonth(comparison.month),
          formatExpenseWithCurrency(comparison.reportedActuals || 0, currency),
          formatExpenseWithCurrency(comparison.netExpenses.onChainOnly.amount || 0, currency),
          formatExpenseDifference((comparison.netExpenses.onChainOnly.difference || 0) * 100),
          formatExpenseWithCurrency(comparison.netExpenses.offChainIncluded.amount || 0, currency),
          formatExpenseDifference((comparison.netExpenses.offChainIncluded.difference || 0) * 100),
        ],
        comparison.month === currentPeriod,
        false,
        breakpointOptions
      );
      rows.push(row);
    });

    if (values.length > 1) {
      const totals = getTotals(values);
      rows.push(
        buildRow(
          [
            'Totals',
            formatExpenseWithCurrency(totals.reportedActuals || 0, currency),
            formatExpenseWithCurrency(totals.netExpenses.onChainOnly.amount || 0, currency),
            formatExpenseDifference(totals.netExpenses.onChainOnly.difference || 0),
            formatExpenseWithCurrency(totals.netExpenses.offChainIncluded.amount || 0, currency),
            formatExpenseDifference(totals.netExpenses.offChainIncluded.difference || 0),
          ],
          false,
          true,
          breakpointOptions
        )
      );
    }
  } else {
    values.forEach((comparison) => {
      const row = buildRowWithoutOffChain(
        [
          formatExpenseMonth(comparison.month),
          formatExpenseWithCurrency(comparison.reportedActuals || 0, currency),
          formatExpenseWithCurrency(comparison.netExpenses.onChainOnly.amount || 0, currency),
          formatExpenseDifference((comparison.netExpenses.onChainOnly.difference || 0) * 100),
        ],
        comparison.month === currentPeriod,
        false
      );
      rows.push(row);
    });

    if (values.length > 1) {
      const totals = getTotals(values);
      rows.push(
        buildRowWithoutOffChain(
          [
            'Totals',
            formatExpenseWithCurrency(totals.reportedActuals || 0, currency),
            formatExpenseWithCurrency(totals.netExpenses.onChainOnly.amount || 0, currency),
            formatExpenseDifference(totals.netExpenses.onChainOnly.difference || 0),
          ],
          false,
          true
        )
      );
    }
  }

  return rows;
};
