import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import UsersManager from '../../../src/stories/containers/users/users-manager/users-manager';
import NotFoundPage from '../../404';

const UsersManagePage: NextPage = () => {
  const { authToken } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH && !authToken) {
    return <NotFoundPage />;
  }

  return <UsersManager />;
};

export default UsersManagePage;
