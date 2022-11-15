import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import EnableDisableAccount from '../../../src/stories/containers/users/enable-disable-accounts/enable-disable-accounts';
import NotFoundPage from '../../404';

const CreateAccountPage: NextPage = () => {
  const { authToken } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || authToken) {
    return <NotFoundPage />;
  }

  return <EnableDisableAccount />;
};

export default CreateAccountPage;
