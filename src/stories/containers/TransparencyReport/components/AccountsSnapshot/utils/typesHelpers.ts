import type { SnapshotAccount } from '@ses/core/models/dto/snapshotAccountDTO';

export const isSnapshotAccount = (snapshotAccount: SnapshotAccount | unknown): snapshotAccount is SnapshotAccount => {
  const account = snapshotAccount as SnapshotAccount;
  if (account?.accountLabel || account?.accountType || account?.snapshotAccountBalance) {
    return true;
  }
  return false;
};
