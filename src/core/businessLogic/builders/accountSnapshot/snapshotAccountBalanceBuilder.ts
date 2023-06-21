import type { SnapshotAccountBalance, Token } from '@ses/core/models/dto/snapshotAccountDTO';

export class SnapshotAccountBalanceBuilder {
  private readonly _snapshotAccountBalance: SnapshotAccountBalance;

  constructor() {
    this._snapshotAccountBalance = {
      id: '',
      token: 'DAI',
      initialBalance: 0,
      newBalance: 0,
      inflow: 0,
      outflow: 0,
      includesOffChain: false,
    };
  }

  withId(id: string): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.id = id;
    return this;
  }

  withToken(token: Token): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.token = token;
    return this;
  }

  withInitialBalance(initialBalance: number): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.initialBalance = initialBalance;
    return this;
  }

  withNewBalance(newBalance: number): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.newBalance = newBalance;
    return this;
  }

  withInflow(inflow: number): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.inflow = inflow;
    return this;
  }

  withOutflow(outflow: number): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.outflow = outflow;
    return this;
  }

  withIncludesOffChain(includesOffChain: boolean): SnapshotAccountBalanceBuilder {
    this._snapshotAccountBalance.includesOffChain = includesOffChain;
    return this;
  }

  build(): SnapshotAccountBalance {
    return this._snapshotAccountBalance;
  }
}
