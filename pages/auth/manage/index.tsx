import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import { useAuthContext } from '../../../src/core/context/AuthContext';
import UsersManager from '../../../src/stories/containers/users/users-manager/users-manager';
import NotFoundPage from '../../404';

const UsersManagePage: NextPage = () => {
  const { isAlreadyToken, authToken } = useAuthContext();

  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH && !authToken) {
    return <NotFoundPage />;
  }
  if (!isAlreadyToken) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 30,
        }}
      >
        Loading......
      </div>
    );
  }

  return <UsersManager />;
};

export default UsersManagePage;
