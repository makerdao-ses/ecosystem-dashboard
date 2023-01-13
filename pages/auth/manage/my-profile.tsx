import styled from '@emotion/styled';
import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/common-get-ssr-props';
import UserProfile from '../../../src/stories/containers/users/user-profile/user-profile';
import { ManagerTabs } from '../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../src/stories/containers/users/users-manager/user-manager-layout';
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

export const getServerSideProps = getSSRPropsDefaultAuth;

const ContainerProfile = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
