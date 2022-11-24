import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import EnableDisableAccounts from '../../../src/stories/containers/users/enable-disable-accounts/enable-disable-accounts';
import NotFoundPage from '../../404';

const EnableDisableAccountPage: NextPage = () => {
  const { authToken, isAdmin } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || !authToken || !isAdmin) {
    return <NotFoundPage />;
  }

  return <EnableDisableAccounts />;
};

export default EnableDisableAccountPage;
