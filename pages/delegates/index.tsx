import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchRecognizedDelegates } from '@ses/containers/RecognizedDelegates/RecognizedDelegatesAPI';
import RecognizedDelegatesContainer from '@ses/containers/RecognizedDelegates/RecognizedDelegatesContainer';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  delegates: RecognizedDelegatesDto[];
}

const RecognizedDelegates: NextPage<Props> = ({ delegates }) => <RecognizedDelegatesContainer delegates={delegates} />;

export default RecognizedDelegates;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
    return {
      notFound: true,
    };
  }
  const delegates = await fetchRecognizedDelegates();
  return {
    props: {
      delegates,
    },
  };
};
