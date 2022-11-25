import { NextPage } from 'next';
import styled from '@emotion/styled';
import React from 'react';
import { ManagerTabs } from '../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../src/stories/containers/users/users-manager/user-manager-layout';
import UserProfile from '../../../src/stories/containers/users/user-profile/user-profile';

const MyProfilePage: NextPage = () => {
  return (
    <UserManagerLayout tabIndex={ManagerTabs.PROFILE}>
      <ContainerProfile>
        <UserProfile />
      </ContainerProfile>
    </UserManagerLayout>
  );
};

const ContainerProfile = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export default MyProfilePage;
