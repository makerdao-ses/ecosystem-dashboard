import { useEffect, useState } from 'react';
import { fetchAccountsSnapshot } from '../api/queries';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { DateTime } from 'luxon';

const useAccountsSnapshotTab = (ownerId: string, currentMonth: DateTime) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<Snapshots>();

  useEffect(() => {
    const fetchFn = async () => {
      setIsLoading(true);
      const _snapshot = (await fetchAccountsSnapshot('CoreUnit', ownerId, currentMonth))[0];
      setSnapshot(_snapshot);
      setIsLoading(false);
    };
    fetchFn();
  }, [currentMonth, ownerId]);

  return {
    isLoading,
    snapshot,
  };
};

export default useAccountsSnapshotTab;
