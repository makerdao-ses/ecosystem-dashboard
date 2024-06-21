import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { ResourceType } from '@ses/core/models/interfaces/types';
import request, { gql } from 'graphql-request';
import type { SnapshotFilter, Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { DateTime } from 'luxon';

export const accountsSnapshotQuery = (filter: SnapshotFilter) => ({
  query: gql`
    query Snapshots($filter: SnapshotFilter) {
      snapshots(filter: $filter) {
        id
        period
        start
        end
        created
        ownerType
        ownerId
        snapshotAccount {
          id
          accountLabel
          accountType
          accountAddress
          offChain
          groupAccountId
          upstreamAccountId
          snapshotAccountTransaction {
            id
            timestamp
            txHash
            token
            txLabel
            counterPartyName
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
            includesOffChain
          }
        }
        actualsComparison {
          month
          reportedActuals
          currency
          netExpenses {
            offChainIncluded {
              amount
              difference
            }
            onChainOnly {
              amount
              difference
            }
          }
        }
      }
    }
  `,
  filter: {
    filter,
  },
});

export const allAccountsSnapshotsForStartDateQuery = (filter: SnapshotFilter) => ({
  query: gql`
    query Snapshots($filter: SnapshotFilter) {
      snapshots(filter: $filter) {
        start
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

export const fetchAccountsSnapshot = async (
  ownerType: string,
  ownerId: string,
  period?: DateTime
): Promise<Snapshots[]> => {
  const { query, filter } = accountsSnapshotQuery({
    ownerType,
    ownerId,
    period: period?.toFormat('yyyy/MM'),
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

export const getResourceType = (ownerType: string): ResourceType => {
  switch (ownerType) {
    case 'CoreUnit':
    case 'CoreUnitDraft':
      return ResourceType.CoreUnit;
    case 'DelegatesDraft':
    case 'Delegates':
      return ResourceType.Delegates;
    case 'EcosystemActor':
    case 'EcosystemActorDraft':
      return ResourceType.EcosystemActor;
    case 'Keepers':
    case 'KeepersDraft':
      return ResourceType.Keepers;

    default:
      return ResourceType.EcosystemActor;
  }
};

export const generateSnapshotOwnerString = async (ownerType: string, ownerId: string): Promise<string | undefined> => {
  try {
    switch (ownerType) {
      case 'CoreUnit':
      case 'CoreUnitDraft': {
        const shortCode = await getCoreUnitShortCode(ownerId);
        return `${shortCode} Core Unit`;
      }
      case 'DelegatesDraft':
      case 'Delegates':
        return 'Recognized Delegates';
      case 'EcosystemActor':
      case 'EcosystemActorDraft': {
        const shortCode = await getTeamsShortCode(ownerId);
        return `${shortCode} Ecosystem Actor`;
      }
      case 'Keepers':
      case 'KeepersDraft':
        return 'Keepers';
    }
  } catch (error) {}
  return '';
};
