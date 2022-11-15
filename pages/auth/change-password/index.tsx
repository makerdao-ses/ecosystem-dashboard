import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import ChangePassword from '../../../src/stories/containers/auth/change-password/change-password';
import NotFoundPage from '../../404';

const ChangePasswordPage: NextPage = () => {
  const { authToken } = useAuthContext();
  const router = useRouter();
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  if (!authToken) {
    router.push('/login');
  }

  return <ChangePassword />;
};

export default ChangePasswordPage;
