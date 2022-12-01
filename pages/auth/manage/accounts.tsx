import { NextPage } from 'next';
import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/common-get-ssr-props';
import ManageAccounts from '../../../src/stories/containers/users/manage-accounts/manage-accounts';
import { ManagerTabs } from '../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../src/stories/containers/users/users-manager/user-manager-layout';

const ManageAccountsPage: NextPage = () => {
  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <ManageAccounts />
    </UserManagerLayout>
  );
};

export default ManageAccountsPage;

export const getServerSideProps = getSSRPropsDefaultAuth;
