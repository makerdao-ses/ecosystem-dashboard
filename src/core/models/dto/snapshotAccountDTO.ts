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
  timestamp: string;
  txHash: string;
  txLabel: string | null;
  token: Token;
  counterParty: string;
  counterPartyName: string | null;
  amount: number;
}

export interface SnapshotAccountBalance {
  id: string;
  token: Token;
  initialBalance: number;
  newBalance: number;
  inflow: number;
  outflow: number;
  includesOffChain: boolean | null;
}

export interface SnapshotAccount {
  id: string;
  accountLabel: string;
  accountType: AccountType;
  offChain: boolean | null;
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
  children?: SnapshotAccount[];
}
