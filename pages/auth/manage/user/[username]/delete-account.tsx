import { NextPage } from 'next';
import styled from '@emotion/styled';
import React from 'react';
import { ManagerTabs } from '../../../../../src/stories/containers/users/users-manager/manager-tabs.enum';
import UserManagerLayout from '../../../../../src/stories/containers/users/users-manager/user-manager-layout';
import lightTheme from '../../../../../styles/theme/light';
import { useAuthContext } from '../../../../../src/core/context/AuthContext';
import { featureFlags } from '../../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../../../src/config/endpoints';
import NotFoundPage from '../../../../404';
import DeleteAccount from '../../../../../src/stories/containers/users/delete-account/delete-account';

const DeleteUserAccountPage: NextPage = () => {
  const { authToken, isAdmin } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH || !isAdmin || !authToken) {
    return <NotFoundPage />;
  }

  return (
    <UserManagerLayout tabIndex={ManagerTabs.MANAGER}>
      <Container>
        <DeleteAccount />
      </Container>
    </UserManagerLayout>
  );
};

export default DeleteUserAccountPage;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});
