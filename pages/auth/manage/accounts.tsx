import React from 'react';
import ManageAccounts from '../../../src/stories/containers/Users/ManageAccounts/ManageAccounts';
import UserManagerLayout from '../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import type { NextPage } from 'next';

const ManageAccountsPage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
    <ManageAccounts />
  </UserManagerLayout>
);

export default ManageAccountsPage;
