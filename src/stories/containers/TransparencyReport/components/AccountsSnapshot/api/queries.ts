import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import request, { gql } from 'graphql-request';
import type { SnapshotFilter, Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';

export const accountsSnapshotQuery = (filter: SnapshotFilter) => ({
  query: gql`
    query Snapshots($filter: SnapshotFilter) {
      snapshots(filter: $filter) {
        id
        start
        end
        ownerType
        ownerId
        snapshotAccount {
          id
          accountLabel
          accountType
          accountAddress
          groupAccountId
          upstreamAccountId
          snapshotAccountTransaction {
            id
            block
            timestamp
            tx_hash
            token
            counterParty
            amount
          }
          snapshotAccountBalance {
            id
            token
            initialBalance
            newBalance
            inflow
            outflow
          }
        }
      }
    }
  `,
  filter,
});

export const fetchAccountsSnapshot = async (ownerType: string, ownerId: string): Promise<Snapshots[]> => {
  const { query, filter } = accountsSnapshotQuery({
    ownerType,
    ownerId,
  });

  const res = await request<{
    snapshots: Snapshots[];
  }>(GRAPHQL_ENDPOINT, query, filter);

  console.log(res);

  return res.snapshots;
};
