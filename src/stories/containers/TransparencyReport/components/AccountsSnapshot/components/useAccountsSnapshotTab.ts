import { useEffect, useState } from 'react';
import { fetchAccountsSnapshot } from '../api/queries';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';

const useAccountsSnapshotTab = (ownerId: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<Snapshots>();

  useEffect(() => {
    const fetchFn = async () => {
      setIsLoading(true);
      const _snapshot = (await fetchAccountsSnapshot('CoreUnitDraft', ownerId))[0];
      setSnapshot(_snapshot);
      setIsLoading(false);
    };
    fetchFn();
  }, [ownerId]);

  return {
    isLoading,
    snapshot,
  };
};

export default useAccountsSnapshotTab;
