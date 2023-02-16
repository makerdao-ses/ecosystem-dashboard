import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import RecognizedDelegatesContainer from '@ses/containers/recognized-delegates/recognized-delegates';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { NextPage } from 'next';

const RecognizedDelegates: NextPage = () => <RecognizedDelegatesContainer />;

export default RecognizedDelegates;

export async function getServerSideProps() {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    props: {},
  };
}
