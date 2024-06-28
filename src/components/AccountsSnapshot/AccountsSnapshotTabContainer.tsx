import { Box } from '@mui/material';
import React from 'react';
import { TransparencyEmptyTable } from '@/views/TransparencyReport/components/Placeholders/TransparencyEmptyTable';
import AccountsSnapshot from './AccountsSnapshot';
import AccountsSnapshotSkeleton from './AccountsSnapshotSkeleton';
import useAccountsSnapshotTab from './useAccountsSnapshotTab';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface AccountsSnapshotTabContainerProps {
  snapshotOwner: string;
  currentMonth: DateTime;
  ownerId: string | null;
  longCode: string;
  shortCode: string;
  resource: ResourceType;
  setSnapshotCreated: (value: DateTime | undefined) => void;
}

const AccountsSnapshotTabContainer: React.FC<AccountsSnapshotTabContainerProps> = ({
  snapshotOwner,
  currentMonth,
  ownerId,
  longCode,
  shortCode,
  resource,
  setSnapshotCreated,
}) => {
  const { isLoading, snapshot, sinceDate } = useAccountsSnapshotTab(
    ownerId,
    currentMonth,
    resource,
    setSnapshotCreated
  );

  return isLoading ? (
    <AccountsSnapshotSkeleton />
  ) : snapshot ? (
    <AccountsSnapshot snapshot={snapshot} snapshotOwner={snapshotOwner} sinceDate={sinceDate} resourceType={resource} />
  ) : (
    <Box sx={{ mb: '64px' }}>
      <TransparencyEmptyTable longCode={longCode} shortCode={shortCode} resource={resource} />
    </Box>
  );
};

export default AccountsSnapshotTabContainer;
