import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../src/config/endpoints';
import Login from '../../src/stories/containers/auth/login/login';
import NotFoundPage from '../404';

const LoginPage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  return <Login />;
};

export default LoginPage;
