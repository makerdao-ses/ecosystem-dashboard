import type { SnapshotAccountTransaction, Token } from '@ses/core/models/dto/snapshotAccountDTO';

export class SnapshotAccountTransactionBuilder {
  private readonly _snapshotAccountTransaction: SnapshotAccountTransaction;

  constructor() {
    this._snapshotAccountTransaction = {
      id: '',
      timestamp: '',
      txHash: '',
      txLabel: null,
      token: 'DAI',
      counterParty: '',
      counterPartyName: '',
      amount: 0,
    };
  }

  withId(id: string): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.id = id;
    return this;
  }

  withTimestamp(timestamp: string): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.timestamp = timestamp;
    return this;
  }

  withTxHash(txHash: string): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.txHash = txHash;
    return this;
  }

  withToken(token: Token): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.token = token;
    return this;
  }

  withCounterParty(counterParty: string): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.counterParty = counterParty;
    return this;
  }

  withAmount(amount: number): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.amount = amount;
    return this;
  }

  withCounterPartyName(counterPartyName: string): SnapshotAccountTransactionBuilder {
    this._snapshotAccountTransaction.counterPartyName = counterPartyName;
    return this;
  }

  build(): SnapshotAccountTransaction {
    return this._snapshotAccountTransaction;
  }
}
