import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useState } from 'react';
import { EXPENSES_COMPARISON_TABLE_HEADER } from './components/ExpensesComparison/ExpensesComparison';
import ExpensesComparisonRowCard from './components/ExpensesComparisonRowCard/ExpensesComparisonRowCard';
import type { CardRenderProps, RowProps } from '@ses/components/AdvanceTable/types';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';

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
        <ExpensesComparisonRowCard row={{ cells: props.cells ?? [] }} expandable={!!props.cells?.[0].rowIndex} />
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

const useAccountsSnapshot = (snapshot: Snapshots) => {
  const { isLight } = useThemeContext();

  const [includeOffChain, setIncludeOffChain] = useState<boolean>(false);

  const toggleIncludeOffChain = () => setIncludeOffChain(!includeOffChain);

  // TODO: process the snapshot object
  console.log(snapshot);

  const expensesComparisonRows = [
    buildRow(['MAY-2023', '221,503.00 DAI', '240,000.00 DAI', '8.35%', '221,504.00 DAI', '0.00%'], true, false),
    buildRow(['APR-2023', '171,503.00 DAI', '170,000.00 DAI', '-0.88%', '171,500,00 DAI', '0.00%'], false, false),
    buildRow(['MAR-2023', '288,503.00 DAI', '280,000.00 DAI', '-2,95%', '288,300.00 DAI', '-0.07%'], false, false),
    buildRow(['Totals', '681,509.00 DAI', '681,509.00 DAI', '1.25%', '681,304.25 DAI', '-0.03%'], false, true),
  ] as RowProps[];

  return {
    isLight,
    expensesComparisonRows,
    includeOffChain,
    toggleIncludeOffChain,
  };
};

export default useAccountsSnapshot;
