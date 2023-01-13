import React from 'react';
import { featureFlags } from '../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../src/config/endpoints';
import Login from '../../src/stories/containers/auth/login/login';
import type { NextPage } from 'next';

const LoginPage: NextPage = () => <Login />;

export const getServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
