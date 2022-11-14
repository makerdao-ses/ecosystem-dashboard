import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import UsersManager from '../../../src/stories/containers/users/users-manager/users-manager';
import NotFoundPage from '../../404';

const UsersManagePage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  return <UsersManager />;
};

export default UsersManagePage;
