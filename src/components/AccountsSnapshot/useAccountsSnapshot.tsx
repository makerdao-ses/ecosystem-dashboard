import { useMediaQuery } from '@mui/material';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { buildExpensesComparisonRows } from './utils/expenseComparisonUtils';
import { getReserveAccounts, transactionSort } from './utils/reserveUtils';
import type { Theme } from '@mui/material';
import type { Snapshots, Token } from '@ses/core/models/dto/snapshotAccountDTO';

const useAccountsSnapshot = (snapshot: Snapshots) => {
  const [isEnabled] = useFlagsActive();

  // TODO: the `setSelectedTo` is not used yet, but it will be used to filter the data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedToken, setSelectedToken] = useState<Token>('DAI');
  const enableCurrencyPicker = isEnabled('FEATURE_ACCOUNT_SNAPSHOT_CURRENCY_PICKER');

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
  const mainBalance = useMemo(
    () => mainAccount?.snapshotAccountBalance?.find((balance) => balance.token === selectedToken),
    [mainAccount?.snapshotAccountBalance, selectedToken]
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

  const hasActualsComparison = snapshot.actualsComparison?.length > 0;
  const actualsComparison = useMemo(
    () =>
      snapshot.actualsComparison
        .filter((comparison) => comparison.currency === selectedToken)
        .sort((a, b) => DateTime.fromFormat(a.month, 'yyyy/MM').diff(DateTime.fromFormat(b.month, 'yyyy/MM')).months),
    [selectedToken, snapshot.actualsComparison]
  );

  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop_1024'));
  const expensesComparisonRows = useMemo(
    () =>
      buildExpensesComparisonRows(actualsComparison, selectedToken, snapshot.period, hasOffChainData, {
        isTablet,
      }),
    [actualsComparison, hasOffChainData, isTablet, selectedToken, snapshot.period]
  );
  const isCoreUnit = snapshot.ownerType === 'CoreUnit';
  return {
    enableCurrencyPicker,
    includeOffChain,
    toggleIncludeOffChain,
    startDate,
    endDate,
    mainBalance,
    transactionHistory,
    cuReservesBalance,
    onChainData,
    offChainData,
    hasOffChainData,
    // expenses comparison
    hasActualsComparison,
    expensesComparisonRows,
    isCoreUnit,
  };
};

export default useAccountsSnapshot;
