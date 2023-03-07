import styled from '@emotion/styled';
import React from 'react';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/commonGetSSRProps';
import DeleteAccount from '../../../src/stories/containers/users/delete-account/delete-account';
import { ManagerTabs } from '../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../src/stories/containers/users/users-manager/user-manager-layout';
import lightTheme from '../../../styles/theme/light';
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

export const getServerSideProps = getSSRPropsDefaultAuth;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
