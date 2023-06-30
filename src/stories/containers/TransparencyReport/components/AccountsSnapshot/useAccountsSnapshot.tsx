import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useState } from 'react';
import ExpensesComparisonRowCard from './components/Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCard';
import { EXPENSES_COMPARISON_TABLE_HEADER } from './components/ExpensesComparison/ExpensesComparison';
import { getReserveAccounts, transactionSort } from './utils/reserveUtils';
import type { CardRenderProps, RowProps } from '@ses/components/AdvanceTable/types';
import type { Snapshots, Token } from '@ses/core/models/dto/snapshotAccountDTO';

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

  // TODO: the `setSelectedTo` is not used yet, but it will be used to filter the data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedToken, setSelectedToken] = useState<Token>('DAI');

  const [includeOffChain, setIncludeOffChain] = useState<boolean>(false);
  const toggleIncludeOffChain = () => setIncludeOffChain(!includeOffChain);

  const startDate = snapshot.start ?? undefined;
  const endDate = snapshot.end ?? undefined;

  const rootAccount = snapshot.snapshotAccount.find(
    (account) => account.groupAccountId === null && account.upstreamAccountId === null
  );
  if (!rootAccount) throw new Error('Maker Protocol Wallet not found');

  const mainAccount = snapshot.snapshotAccount.find(
    (account) => account.groupAccountId === rootAccount.id && account.upstreamAccountId === null
  );
  if (!mainAccount) throw new Error('Maker Protocol Wallet not found');
  const rootBalance = rootAccount.snapshotAccountBalance.find((balance) => balance.token === selectedToken);

  const transactionHistory = mainAccount.snapshotAccountTransaction
    .filter((transaction) => transaction.token === selectedToken)
    .sort(transactionSort);

  // cu reserves balance
  const cuReservesAccount = snapshot.snapshotAccount.find(
    // eslint-disable-next-line arrow-body-style
    (account) => {
      return account.groupAccountId === rootAccount.id && account.upstreamAccountId !== null;
    }
  );
  const cuReservesBalances = cuReservesAccount?.snapshotAccountBalance?.filter(
    (balance) => balance.token === selectedToken
  );
  // balance with or without the off-chain data
  const cuReservesBalance =
    (cuReservesBalances?.length ?? 0) > 1
      ? cuReservesBalances?.find((account) => account.includesOffChain === includeOffChain)
      : cuReservesBalances?.[0];

  const onChainData = getReserveAccounts(snapshot, false, cuReservesAccount?.id, mainAccount.id, selectedToken);

  const offChainData = getReserveAccounts(snapshot, true, cuReservesAccount?.id, mainAccount.id, selectedToken);

  // mocked data for the "Reported Expenses Comparison" table
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
    startDate,
    endDate,
    rootBalance,
    transactionHistory,
    cuReservesBalance,
    onChainData,
    offChainData,
  };
};

export default useAccountsSnapshot;
