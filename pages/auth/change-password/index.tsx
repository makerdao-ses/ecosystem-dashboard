import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import ChangePassword from '../../../src/stories/containers/auth/change-password/change-password';
import NotFoundPage from '../../404';

const ChangePasswordPage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  return <ChangePassword />;
};

export default ChangePasswordPage;
