import { NextPage } from 'next';
import React from 'react';
import CreateAccount from '../../../src/stories/containers/users/create-account/create-account';
import UserManagerLayout from '../../../src/stories/containers/users/users-manager/user-manager-layout';
import { ManagerTabs } from '../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/common-get-ssr-props';

const CreateAccountPage: NextPage = () => {
  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <CreateAccount />
    </UserManagerLayout>
  );
};

export default CreateAccountPage;

export const getServerSideProps = getSSRPropsDefaultAuth;
