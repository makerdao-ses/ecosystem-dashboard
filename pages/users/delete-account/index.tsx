import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import DeleteAccount from '../../../src/stories/containers/users/delete-account/delete-account';
import NotFoundPage from '../../404';

const CreateAccountPage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  return <DeleteAccount />;
};

export default CreateAccountPage;
