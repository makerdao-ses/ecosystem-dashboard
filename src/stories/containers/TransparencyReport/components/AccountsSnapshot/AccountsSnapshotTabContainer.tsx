import { Box } from '@mui/material';
import React from 'react';
import AccountsSnapshot from './AccountsSnapshot';
import useAccountsSnapshotTab from './components/useAccountsSnapshotTab';
import type { DateTime } from 'luxon';

interface AccountsSnapshotTabContainerProps {
  snapshotOwner: string;
  currentMonth: DateTime;
  ownerId: string;
}

const AccountsSnapshotTabContainer: React.FC<AccountsSnapshotTabContainerProps> = ({
  snapshotOwner,
  // this parameter is no used till the API is completed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentMonth,
  ownerId,
}) => {
  const { isLoading, snapshot } = useAccountsSnapshotTab(ownerId);

  return isLoading ? (
    // TODO: implement a fancy loading state
    <Box
      sx={{
        textAlign: 'center',
        mt: 2,
        mb: 5,
      }}
    >
      loading...
    </Box>
  ) : (
    <AccountsSnapshot
      snapshot={
        snapshot ?? {
          id: '1',
          start: null,
          end: null,
          ownerType: 'CoreUnit',
          ownerId: '1',
          snapshotAccount: [],
        }
      }
      snapshotOwner={snapshotOwner}
    />
  );
};

export default AccountsSnapshotTabContainer;
