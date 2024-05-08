import styled from '@emotion/styled';
import React from 'react';
import ChangePassword from '../../../src/stories/containers/Auth/ChangePassword/ChangePassword';
import UserManagerLayout from '../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import lightTheme from '../../../styles/theme/themes';
import type { NextPage } from 'next';

const ChangeMyPasswordPage: NextPage = () => (
  <UserManagerLayout tabIndex={ManagerTabs.PROFILE}>
    <Container>
      <ChangePassword />
    </Container>
  </UserManagerLayout>
);

export default ChangeMyPasswordPage;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
