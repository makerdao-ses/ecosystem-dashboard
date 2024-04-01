import styled from '@emotion/styled';
import React from 'react';
import UserProfile from '../../../src/stories/containers/Users/UserProfile/UserProfile';
import UserManagerLayout from '../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import lightTheme from '../../../styles/theme/light';
import type { NextPage } from 'next';

const MyProfilePage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.PROFILE}>
    <ContainerProfile>
      <UserProfile />
    </ContainerProfile>
  </UserManagerLayout>
);

export default MyProfilePage;

const ContainerProfile = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
