import { Box } from '@mui/material';
import { AccountsSnapshot, AccountsSnapshotSkeleton, ThemeProvider } from 'dspot-powerhouse-components';
import React from 'react';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import useAccountsSnapshotTab from './useAccountsSnapshotTab';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface AccountsSnapshotTabContainerProps {
  snapshotOwner: string;
  currentMonth: DateTime;
  ownerId: string;
  longCode: string;
  shortCode: string;
  resource: ResourceType;
}

const AccountsSnapshotTabContainer: React.FC<AccountsSnapshotTabContainerProps> = ({
  snapshotOwner,
  currentMonth,
  ownerId,
  longCode,
  shortCode,
  resource,
}) => {
  const { isLoading, snapshot, sinceDate, isEmpty, isLight } = useAccountsSnapshotTab(ownerId, currentMonth, resource);

  return isEmpty ? (
    <Box sx={{ mb: '64px' }}>
      <TransparencyEmptyTable longCode={longCode} shortCode={shortCode} resource={resource} />
    </Box>
  ) : (
    <ThemeProvider isLight={isLight}>
      {isLoading || !snapshot ? (
        <AccountsSnapshotSkeleton />
      ) : (
        <AccountsSnapshot
          snapshot={snapshot}
          snapshotOwner={snapshotOwner}
          sinceDate={sinceDate}
          resourceType={resource}
        />
      )}
    </ThemeProvider>
  );
};

export default AccountsSnapshotTabContainer;
