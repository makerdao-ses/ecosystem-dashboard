import { fetcher } from '@ses/core/utils/fetcher';
import { DateTime } from 'luxon';
import { useEffect, useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import { accountsSnapshotQuery, allAccountsSnapshotsForStartDateQuery } from './api/queries';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { Fetcher } from 'swr';

const useAccountsSnapshotTab = (
  ownerId: string | null,
  currentMonth: DateTime,
  resource: ResourceType,
  setSnapshotCreated: (value: DateTime | undefined) => void
) => {
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
    fetcher as Fetcher<{ snapshots: Snapshots[] }>
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
    fetcher as Fetcher<{ snapshots: Pick<Snapshots, 'start'>[] }>
  );

  const sinceDate = useMemo(() => {
    const validDates: Date[] | undefined = dateResponse?.snapshots
      ?.filter((snapshot) => snapshot.start !== null)
      ?.map((snapshot) => new Date(snapshot.start as string));

    if (!validDates || validDates.length === 0) return;

    return new Date(Math.min(...validDates.map((date) => date.getTime())));
  }, [dateResponse?.snapshots]);

  const snapshot = response?.snapshots?.[0];
  const isLoading = (!response && !errorFetchingSnapshots) || (!dateResponse && !errorFetchingDateSnapshots);

  // update the create date to be displayed as last update
  useEffect(() => {
    if (isLoading) {
      // the current data is not valid as a new one is being loaded
      setSnapshotCreated(undefined);
      return;
    }
    const created = DateTime.fromISO(snapshot?.created ?? '');
    setSnapshotCreated(created.isValid ? created : undefined);
  }, [isLoading, setSnapshotCreated, snapshot]);

  return {
    isLoading,
    snapshot,
    sinceDate,
  };
};

export default useAccountsSnapshotTab;
