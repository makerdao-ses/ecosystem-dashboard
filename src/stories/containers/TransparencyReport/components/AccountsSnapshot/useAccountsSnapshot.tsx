import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useMemo, useState } from 'react';
import ExpensesComparisonRowCard from './components/Cards/ExpensesComparisonRowCard/ExpensesComparisonRowCard';
import {
  EXPENSES_COMPARISON_TABLE_HEADER,
  EXPENSES_COMPARISON_TABLE_HEADER_WITHOUT_OFF_CHAIN,
} from './components/ExpensesComparison/headers';
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

const useAccountsSnapshot = (snapshot: Snapshots) => {
  const { isLight } = useThemeContext();

  // TODO: the `setSelectedTo` is not used yet, but it will be used to filter the data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedToken, setSelectedToken] = useState<Token>('DAI');

  const [includeOffChain, setIncludeOffChain] = useState<boolean>(false);
  const toggleIncludeOffChain = () => setIncludeOffChain(!includeOffChain);

  const startDate = snapshot.start ?? undefined;
  const endDate = snapshot.end ?? undefined;

  // root account
  const rootAccount = useMemo(
    () =>
      snapshot.snapshotAccount.find((account) => account.groupAccountId === null && account.upstreamAccountId === null),
    [snapshot.snapshotAccount]
  );

  // main account (MakerDAO Funding Overview section)
  const mainAccount = useMemo(
    () =>
      snapshot.snapshotAccount.find(
        (account) => account.groupAccountId === rootAccount?.id && account.upstreamAccountId === null
      ),
    [rootAccount?.id, snapshot.snapshotAccount]
  );
  const rootBalance = useMemo(
    () => rootAccount?.snapshotAccountBalance?.find((balance) => balance.token === selectedToken),
    [rootAccount?.snapshotAccountBalance, selectedToken]
  );

  // transaction history (MakerDAO Funding Overview section)
  const transactionHistory = useMemo(
    () =>
      mainAccount?.snapshotAccountTransaction
        ?.filter((transaction) => transaction.token === selectedToken)
        ?.sort(transactionSort) ?? [],
    [mainAccount?.snapshotAccountTransaction, selectedToken]
  );

  // Total Core Unit Reserves section
  const cuReservesAccount = useMemo(
    () =>
      snapshot.snapshotAccount.find(
        (account) => account.groupAccountId === rootAccount?.id && account.upstreamAccountId !== null
      ),
    [rootAccount?.id, snapshot?.snapshotAccount]
  );
  const cuReservesBalances = useMemo(
    () => cuReservesAccount?.snapshotAccountBalance?.filter((balance) => balance.token === selectedToken),
    [cuReservesAccount?.snapshotAccountBalance, selectedToken]
  );

  // balance with or without the off-chain data
  const cuReservesBalance = useMemo(
    () =>
      (cuReservesBalances?.length ?? 0) > 1
        ? cuReservesBalances?.find((account) => account.includesOffChain === includeOffChain)
        : cuReservesBalances?.[0],
    [cuReservesBalances, includeOffChain]
  );

  const onChainData = useMemo(
    () => getReserveAccounts(snapshot, false, cuReservesAccount?.id, mainAccount?.id, selectedToken),
    [cuReservesAccount?.id, mainAccount?.id, selectedToken, snapshot]
  );

  const offChainData = useMemo(
    () => getReserveAccounts(snapshot, true, cuReservesAccount?.id, mainAccount?.id, selectedToken),
    [cuReservesAccount?.id, mainAccount?.id, selectedToken, snapshot]
  );

  const hasOffChainData = offChainData.length > 0;

  // mocked data for the "Reported Expenses Comparison" table
  const expensesComparisonRows = useMemo(() => {
    if (hasOffChainData) {
      return [
        buildRow(['MAY-2023', '221,503.00 DAI', '240,000.00 DAI', '8.35%', '221,504.00 DAI', '0.00%'], true, false),
        buildRow(['APR-2023', '171,503.00 DAI', '170,000.00 DAI', '-0.88%', '171,500,00 DAI', '0.00%'], false, false),
        buildRow(['MAR-2023', '288,503.00 DAI', '280,000.00 DAI', '-2,95%', '288,300.00 DAI', '-0.07%'], false, false),
        buildRow(['Totals', '681,509.00 DAI', '681,509.00 DAI', '1.25%', '681,304.25 DAI', '-0.03%'], false, true),
      ] as RowProps[];
    } else {
      return [
        buildRowWithoutOffChain(['MAY-2023', '221,503.00 DAI', '240,000.00 DAI', '8.35%'], true, false),
        buildRowWithoutOffChain(['APR-2023', '171,503.00 DAI', '170,000.00 DAI', '-0.88%'], false, false),
        buildRowWithoutOffChain(['MAR-2023', '288,503.00 DAI', '280,000.00 DAI', '-2,95%'], false, false),
        buildRowWithoutOffChain(['Totals', '681,509.00 DAI', '681,509.00 DAI', '1.25%'], false, true),
      ] as RowProps[];
    }
  }, [hasOffChainData]);

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
    hasOffChainData,
  };
};

export default useAccountsSnapshot;
