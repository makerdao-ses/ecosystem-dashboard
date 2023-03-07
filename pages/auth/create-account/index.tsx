import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/commonGetSSRProps';
import CreateAccount from '../../../src/stories/containers/users/create-account/create-account';
import { ManagerTabs } from '../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../src/stories/containers/users/users-manager/user-manager-layout';
import type { NextPage } from 'next';

const CreateAccountPage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
    <CreateAccount />
  </UserManagerLayout>
);

export default CreateAccountPage;

export const getServerSideProps = getSSRPropsDefaultAuth;
