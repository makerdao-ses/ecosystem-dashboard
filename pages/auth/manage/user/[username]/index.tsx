import { NextPage } from 'next';
import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../../../src/core/utils/common-get-ssr-props';
import ManagedUserProfile from '../../../../../src/stories/containers/users/managed-user-profile/managed-user-profile';
import { ManagerTabs } from '../../../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../../../src/stories/containers/users/users-manager/user-manager-layout';

const ManageUserProfilePage: NextPage = () => {
  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <ManagedUserProfile />
    </UserManagerLayout>
  );
};

export default ManageUserProfilePage;

export const getServerSideProps = getSSRPropsDefaultAuth;
