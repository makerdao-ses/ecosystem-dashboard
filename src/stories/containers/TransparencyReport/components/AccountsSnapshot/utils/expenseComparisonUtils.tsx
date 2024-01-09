import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { DateTime } from 'luxon';
import ExpensesComparisonRowCard from '../components/Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCard';
import {
  EXPENSES_COMPARISON_TABLE_HEADER,
  EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN,
} from '../components/ExpensesComparison/headers';
import type { CardRenderProps, RowProps } from '@ses/components/AdvanceTable/types';
import type { ActualsComparison, Token } from '@ses/core/models/dto/snapshotAccountDTO';

const RenderCurrentMonthRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isLight } = useThemeContext();
  return <tr style={{ background: isLight ? 'rgba(236, 239, 249, 0.5)' : '#283341' }}>{children}</tr>;
};

export const buildRow = (
  values: [string, string, string, string, string, string],
  isCurrentMonth = false,
  isTotal = false
): RowProps =>
  ({
    ...(isCurrentMonth ? { render: RenderCurrentMonthRow } : {}),
    cellPadding: {
      table_834: isTotal ? '17px 8px 18.5px' : '18.5px 8px',
      desktop_1194: '17.4px 16px',
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
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[1],
      },
      {
        value: values[2],
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[2],
      },
      {
        value: values[3],
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[3],
      },
      {
        value: values[4],
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[4],
      },
      {
        value: values[5],
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER[1].cells[5],
      },
    ],
  } as RowProps);

export const buildRowWithoutOffChain = (
  values: [string, string, string, string],
  isCurrentMonth = false,
  isTotal = false
): RowProps =>
  ({
    ...(isCurrentMonth ? { render: RenderCurrentMonthRow } : {}),
    cellPadding: {
      table_834: isTotal ? '17px 8px 18.5px' : '18.5px 8px',
      desktop_1194: '17.4px 16px',
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
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[1],
      },
      {
        value: values[2],
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[3],
      },
      {
        value: values[3],
        defaultRenderer: 'number',
        inherit: EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN[0].cells[4],
      },
    ],
  } as RowProps);

export const formatExpenseMonth = (month: string): string =>
  DateTime.fromFormat(month, 'yyyy/MM').toFormat('MMM-yyyy').toLocaleUpperCase();

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
      acc.netExpenses.onChainOnly.difference = (acc.reportedActuals * 100) / acc.netExpenses.onChainOnly.amount - 100;
      acc.netExpenses.offChainIncluded.amount += curr.netExpenses.offChainIncluded.amount;
      acc.netExpenses.offChainIncluded.difference =
        (acc.reportedActuals * 100) / acc.netExpenses.offChainIncluded.amount - 100;

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
  hasOffChainData: boolean
): RowProps[] => {
  const rows: RowProps[] = [];
  if (hasOffChainData) {
    values.forEach((comparison) => {
      const row = buildRow(
        [
          formatExpenseMonth(comparison.month),
          formatExpenseWithCurrency(comparison.reportedActuals || 0, currency),
          formatExpenseWithCurrency(comparison.netExpenses.onChainOnly.amount || 0, currency),
          formatExpenseDifference(comparison.netExpenses.onChainOnly.difference || 0),
          formatExpenseWithCurrency(comparison.netExpenses.offChainIncluded.amount || 0, currency),
          formatExpenseDifference(comparison.netExpenses.offChainIncluded.difference || 0),
        ],
        comparison.month === currentPeriod,
        false
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
          true
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
          formatExpenseDifference(comparison.netExpenses.onChainOnly.difference || 0),
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
