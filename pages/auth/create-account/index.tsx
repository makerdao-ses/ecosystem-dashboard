import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import CreateAccount from '../../../src/stories/containers/auth/create-account/create-account';
import NotFoundPage from '../../404';

const CreateAccountPage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  return <CreateAccount />;
};

export default CreateAccountPage;
