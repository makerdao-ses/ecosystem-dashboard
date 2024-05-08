import styled from '@emotion/styled';
import React from 'react';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import DeleteAccount from '../../../src/stories/containers/Users/DeleteAccount/DeleteAccount';
import UserManagerLayout from '../../../src/stories/containers/Users/UsersManager/UserManagerLayout';
import { ManagerTabs } from '../../../src/stories/containers/Users/UsersManager/managerTabsEnum';
import lightTheme from '../../../styles/theme/themes';
import type { NextPage } from 'next';

const DeleteMyAccount: NextPage = () => {
  const { user } = useAuthContext();

  return (
    <UserManagerLayout tabIndex={ManagerTabs.PROFILE}>
      <Container>
        <DeleteAccount username={user?.username} />
      </Container>
    </UserManagerLayout>
  );
};

export default DeleteMyAccount;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
