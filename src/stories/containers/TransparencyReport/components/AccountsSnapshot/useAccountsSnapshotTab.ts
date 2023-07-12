import { fetcher } from '@ses/core/utils/fetcher';
import { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';
import { accountsSnapshotQuery } from './api/queries';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { DateTime } from 'luxon';

const useAccountsSnapshotTab = (ownerId: string, currentMonth: DateTime) => {
  const { query, filter } = useMemo(
    () =>
      accountsSnapshotQuery({
        ownerType: 'CoreUnit',
        ownerId,
        period: currentMonth?.toFormat('yyyy/MM'),
      }),
    [ownerId, currentMonth]
  );

  const { data: response, error: errorFetchingUser } = useSWRImmutable<{ snapshots: Snapshots[] }>(
    {
      query,
      input: filter,
    },
    fetcher
  );

  return {
    isLoading: !response && !errorFetchingUser,
    snapshot: response?.snapshots?.[0],
  };
};

export default useAccountsSnapshotTab;
