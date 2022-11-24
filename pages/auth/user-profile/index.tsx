import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import UserProfileContainer from '../../../src/stories/containers/users/user-profile/user-profile-container';
import NotFoundPage from '../../404';

const UserProfilePage: NextPage = () => {
  const { authToken } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || !authToken) {
    return <NotFoundPage />;
  }

  return <UserProfileContainer />;
};

export default UserProfilePage;
