import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../../src/config/endpoints';
import { useAuthContext } from '../../../../src/core/context/AuthContext';
import ManagedUserProfile from '../../../../src/stories/containers/users/managed-user-profile/managed-user-profile';
import { ManagerTabs } from '../../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../../src/stories/containers/users/users-manager/user-manager-layout';
import NotFoundPage from '../../../404';

const ManageUserProfilePage: NextPage = () => {
  const { authToken, isAdmin } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || !authToken || !isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <ManagedUserProfile />
    </UserManagerLayout>
  );
};

export default ManageUserProfilePage;
