import { NextPage } from 'next';
import styled from '@emotion/styled';
import React from 'react';
import { ManagerTabs } from '../../../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../../../src/stories/containers/users/users-manager/user-manager-layout';
import lightTheme from '../../../../../styles/theme/light';
import ChangePassword from '../../../../../src/stories/containers/auth/change-password/change-password';
import { getSSRPropsDefaultAuth } from '../../../../../src/core/utils/common-get-ssr-props';

const ChangeUserPasswordPage: NextPage = () => {
  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <Container>
        <ChangePassword adminChange={true} />
      </Container>
    </UserManagerLayout>
  );
};

export default ChangeUserPasswordPage;

export const getServerSideProps = getSSRPropsDefaultAuth;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
