import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import CreateAccount from '../../../src/stories/containers/users/create-account/create-account';
import NotFoundPage from '../../404';
import { useAuthContext } from '../../../src/core/context/AuthContext';

const CreateAccountPage: NextPage = () => {
  const { authToken, isAdmin } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || !authToken || !isAdmin) {
    return <NotFoundPage />;
  }

  return <CreateAccount />;
};

export default CreateAccountPage;
