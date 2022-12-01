import { NextPage } from 'next';
import styled from '@emotion/styled';
import React from 'react';
import { ManagerTabs } from '../../../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../../../src/stories/containers/users/users-manager/user-manager-layout';
import lightTheme from '../../../../../styles/theme/light';
import DeleteAccount from '../../../../../src/stories/containers/users/delete-account/delete-account';
import { getSSRPropsDefaultAuth } from '../../../../../src/core/utils/common-get-ssr-props';

const DeleteUserAccountPage: NextPage = () => {
  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <Container>
        <DeleteAccount />
      </Container>
    </UserManagerLayout>
  );
};

export default DeleteUserAccountPage;

export const getServerSideProps = getSSRPropsDefaultAuth;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
