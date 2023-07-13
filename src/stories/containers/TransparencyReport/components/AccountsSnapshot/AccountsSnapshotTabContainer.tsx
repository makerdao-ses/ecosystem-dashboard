import { Box } from '@mui/material';
import React from 'react';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import AccountsSnapshot from './AccountsSnapshot';
import AccountsSnapshotSkeleton from './AccountsSnapshotSkeleton';
import useAccountsSnapshotTab from './useAccountsSnapshotTab';
import type { DateTime } from 'luxon';

interface AccountsSnapshotTabContainerProps {
  snapshotOwner: string;
  currentMonth: DateTime;
  ownerId: string;
  longCode: string;
}

const AccountsSnapshotTabContainer: React.FC<AccountsSnapshotTabContainerProps> = ({
  snapshotOwner,
  currentMonth,
  ownerId,
  longCode,
}) => {
  const { isLoading, snapshot } = useAccountsSnapshotTab(ownerId, currentMonth);

  return isLoading ? (
    <AccountsSnapshotSkeleton />
  ) : snapshot ? (
    <AccountsSnapshot snapshot={snapshot} snapshotOwner={snapshotOwner} />
  ) : (
    <Box sx={{ mb: '64px' }}>
      <TransparencyEmptyTable longCode={longCode} />
    </Box>
  );
};

export default AccountsSnapshotTabContainer;
