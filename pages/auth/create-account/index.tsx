import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/commonGetSSRProps';
import CreateAccount from '../../../src/stories/containers/Users/CreateAccount/CreateAccount';
import UserManagerLayout from '../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import type { NextPage } from 'next';

const CreateAccountPage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
    <CreateAccount />
  </UserManagerLayout>
);

export default CreateAccountPage;

export const getServerSideProps = getSSRPropsDefaultAuth;
