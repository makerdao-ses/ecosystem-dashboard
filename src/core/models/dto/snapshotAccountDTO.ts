export type Token = 'DAI' | 'ETH' | 'MKR';

export type AccountType = 'singular' | 'group';

export interface SnapshotFilter {
  id?: string;
  start?: string;
  end?: string;
  ownerType?: string;
  ownerId?: string;
}

export interface SnapshotAccountTransaction {
  id: string;
  block: number;
  timestamp: string;
  tx_hash: string;
  token: Token;
  counterParty: string;
  amount: number;
}

export interface SnapshotAccountBalance {
  id: string;
  token: Token;
  initialBalance: number;
  newBalance: number;
  inflow: number;
  outflow: number;
}

export interface SnapshotAccount {
  id: string;
  accountLabel: string;
  accountType: AccountType;
  accountAddress: string;
  groupAccountId: string;
  upstreamAccountId: string;
  snapshotAccountTransaction: SnapshotAccountTransaction[];
  snapshotAccountBalance: SnapshotAccountBalance[];
}

export interface Snapshots {
  id: string;
  start: string | null;
  end: string | null;
  ownerType: string;
  ownerId: string;
  snapshotAccount: SnapshotAccount[];
}

export interface UIReservesData extends SnapshotAccount {
  groups?: SnapshotAccount[];
}
