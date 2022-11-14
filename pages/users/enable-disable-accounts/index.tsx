import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../src/config/endpoints';
import EnableDisableAccount from '../../../src/stories/containers/users/enable-disable-accounts/enable-disable-accounts';
import NotFoundPage from '../../404';

const CreateAccountPage: NextPage = () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return <NotFoundPage />;
  }

  return <EnableDisableAccount />;
};

export default CreateAccountPage;
