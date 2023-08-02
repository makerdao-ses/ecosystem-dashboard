import { fetcher } from '@ses/core/utils/fetcher';
import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import { accountsSnapshotQuery, allAccountsSnapshotsForStartDateQuery } from './api/queries';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

const useAccountsSnapshotTab = (ownerId: string, currentMonth: DateTime, resource: ResourceType) => {
  const { query, filter } = useMemo(
    () =>
      accountsSnapshotQuery({
        ownerType: resource,
        ownerId,
        period: currentMonth?.toFormat('yyyy/MM'),
      }),
    [resource, ownerId, currentMonth]
  );

  const { data: response, error: errorFetchingSnapshots } = useSWRImmutable<{ snapshots: Snapshots[] }>(
    {
      query,
      input: filter,
    },
    fetcher
  );

  const { query: dateQuery, filter: dateFilter } = useMemo(
    () =>
      allAccountsSnapshotsForStartDateQuery({
        ownerType: resource,
        ownerId,
      }),
    [resource, ownerId]
  );

  const { data: dateResponse, error: errorFetchingDateSnapshots } = useSWRImmutable<{
    snapshots: Pick<Snapshots, 'start'>[];
  }>(
    {
      query: dateQuery,
      input: dateFilter,
    },
    fetcher
  );

  const sinceDate = useMemo(() => {
    const validDates: Date[] | undefined = dateResponse?.snapshots
      ?.filter((snapshot) => snapshot.start !== null)
      ?.map((snapshot) => new Date(snapshot.start as string));

    if (!validDates || validDates.length === 0) return;

    return new Date(Math.min(...validDates.map((date) => date.getTime())));
  }, [dateResponse?.snapshots]);

  return {
    isLoading: (!response && !errorFetchingSnapshots) || (!dateResponse && !errorFetchingDateSnapshots),
    snapshot: response?.snapshots?.[0],
    sinceDate,
  };
};

export default useAccountsSnapshotTab;
