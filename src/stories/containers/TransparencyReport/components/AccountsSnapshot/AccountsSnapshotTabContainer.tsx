import { Box } from '@mui/material';
import React from 'react';
import AccountsSnapshot from './AccountsSnapshot';
import AccountsSnapshotSkeleton from './AccountsSnapshotSkeleton';
import useAccountsSnapshotTab from './useAccountsSnapshotTab';
import type { DateTime } from 'luxon';

interface AccountsSnapshotTabContainerProps {
  snapshotOwner: string;
  currentMonth: DateTime;
  ownerId: string;
}

const AccountsSnapshotTabContainer: React.FC<AccountsSnapshotTabContainerProps> = ({
  snapshotOwner,
  currentMonth,
  ownerId,
}) => {
  const { isLoading, snapshot } = useAccountsSnapshotTab(ownerId, currentMonth);

  return isLoading ? (
    <AccountsSnapshotSkeleton />
  ) : snapshot ? (
    <AccountsSnapshot snapshot={snapshot} snapshotOwner={snapshotOwner} />
  ) : (
    <Box
      sx={{
        textAlign: 'center',
        mt: 2,
        mb: 5,
      }}
    >
      There is no snapshot data for this month
    </Box>
  );
};

export default AccountsSnapshotTabContainer;
