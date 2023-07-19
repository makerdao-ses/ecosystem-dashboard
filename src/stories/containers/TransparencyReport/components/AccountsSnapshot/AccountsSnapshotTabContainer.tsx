import { Box } from '@mui/material';
import React from 'react';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import AccountsSnapshot from './AccountsSnapshot';
import AccountsSnapshotSkeleton from './AccountsSnapshotSkeleton';
import useAccountsSnapshotTab from './useAccountsSnapshotTab';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface AccountsSnapshotTabContainerProps {
  snapshotOwner: string;
  currentMonth: DateTime;
  ownerId: string;
  longCode: string;
  resource: ResourceType;
}

const AccountsSnapshotTabContainer: React.FC<AccountsSnapshotTabContainerProps> = ({
  snapshotOwner,
  currentMonth,
  ownerId,
  longCode,
  resource,
}) => {
  const { isLoading, snapshot } = useAccountsSnapshotTab(ownerId, currentMonth, resource);

  return isLoading ? (
    <AccountsSnapshotSkeleton />
  ) : snapshot ? (
    <AccountsSnapshot snapshot={snapshot} snapshotOwner={snapshotOwner} />
  ) : (
    <Box sx={{ mb: '64px' }}>
      <TransparencyEmptyTable longCode={longCode} resource={resource} />
    </Box>
  );
};

export default AccountsSnapshotTabContainer;
