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
  filter: {
    filter,
  },
});

export const coreUnitShortCodeQuery = (id: string) => ({
  query: gql`
    query CoreUnits($filter: CoreUnitFilter) {
      coreUnits(filter: $filter) {
        shortCode
      }
    }
  `,
  filter: {
    filter: { id },
  },
});

export const teamShortCodeQuery = (id: string) => ({
  query: gql`
    query Teams($filter: TeamFilter) {
      teams(filter: $filter) {
        shortCode
      }
    }
  `,
  filter: {
    filter: { id },
  },
});

export const fetchAccountsSnapshot = async (ownerType: string, ownerId: string): Promise<Snapshots[]> => {
  const { query, filter } = accountsSnapshotQuery({
    ownerType,
    ownerId,
  });

  const res = await request<{
    snapshots: Snapshots[];
  }>(GRAPHQL_ENDPOINT, query, filter);

  return res.snapshots;
};

interface CoreUnitResponse {
  coreUnits: {
    shortCode: string;
  }[];
}

interface TeamResponse {
  teams: {
    shortCode: string;
  }[];
}

const getCoreUnitShortCode = async (ownerId: string): Promise<string> => {
  const { query, filter } = coreUnitShortCodeQuery(ownerId);
  const res = await request<CoreUnitResponse>(GRAPHQL_ENDPOINT, query, filter);
  if (res?.coreUnits?.[0]?.shortCode) {
    return res.coreUnits[0].shortCode;
  }
  return '';
};

const getTeamsShortCode = async (ownerId: string): Promise<string> => {
  const { query, filter } = teamShortCodeQuery(ownerId);
  const res = await request<TeamResponse>(GRAPHQL_ENDPOINT, query, filter);
  if (res?.teams?.[0]?.shortCode) {
    return res.teams[0].shortCode;
  }
  return '';
};

export const generateSnapshotOwnerString = async (ownerType: string, ownerId: string): Promise<string> => {
  try {
    switch (ownerType) {
      case 'CoreUnitDraft': {
        const shortCode = await getCoreUnitShortCode(ownerId);
        return `${shortCode} Core Unit`;
      }
      case 'DelegatesDraft':
        return 'Recognized Delegates';
      case 'EcosystemActorDraft': {
        const shortCode = await getTeamsShortCode(ownerId);
        return `${shortCode} Ecosystem Actor`;
      }
      default:
        // TODO: add the correct phrase
        return `<<PENDING: ${ownerType}, ${ownerId}>>`;
    }
  } catch (error) {
    return ownerType;
  }
};
