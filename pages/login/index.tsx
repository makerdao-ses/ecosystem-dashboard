import { NextPage } from 'next';
import React from 'react';
import { featureFlags } from '../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../src/config/endpoints';
import Login from '../../src/stories/containers/auth/login/login';

const LoginPage: NextPage = () => {
  return <Login />;
};

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
