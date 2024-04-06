import type {
  SnapshotAccountTransaction,
  Snapshots,
  Token,
  UIReservesData,
} from '@ses/core/models/dto/snapshotAccountDTO';

export const transactionSort = (a: SnapshotAccountTransaction, b: SnapshotAccountTransaction) =>
  new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();

export const getReserveAccounts = (
  snapshot: Snapshots,
  isOffChain: boolean,
  groupId?: string,
  upstreamId?: string,
  token?: Token
): UIReservesData[] => {
  const accounts = snapshot.snapshotAccount.filter(
    (account) =>
      account.groupAccountId === groupId &&
      account.upstreamAccountId === upstreamId &&
      !!account.offChain === isOffChain
  )?.[0];

  return snapshot.snapshotAccount
    .filter((account) => account.groupAccountId === accounts?.id)
    .map(
      (account) =>
        ({
          ...account,
          snapshotAccountBalance: account.snapshotAccountBalance.filter((balance) => balance.token === token),
          snapshotAccountTransaction: account.snapshotAccountTransaction
            .filter((transaction) => transaction.token === token)
            .sort(transactionSort),
          children: snapshot.snapshotAccount
            .filter(
              (childrenAccount) =>
                childrenAccount.groupAccountId === account.id && childrenAccount.snapshotAccountBalance.length > 0
            )
            .map((childrenAccount) => ({
              ...childrenAccount,
              snapshotAccountBalance: childrenAccount.snapshotAccountBalance.filter(
                (balance) => balance.token === token
              ),
              snapshotAccountTransaction: childrenAccount.snapshotAccountTransaction
                .filter((transaction) => transaction.token === token)
                .sort(transactionSort),
            })),
        } as UIReservesData)
    )
    .sort((a, b) => parseInt(b.upstreamAccountId) - parseInt(a.upstreamAccountId));
};
