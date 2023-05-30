import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import TemporaryContainer from '@ses/containers/TransparencyReport/components/AccountsSnapshot/TemporaryContainer';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { GetServerSidePropsContext } from 'next';

const TemporalAccountSnapshotPage = () => <TemporaryContainer />;

export default TemporalAccountSnapshotPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const flags = featureFlags[CURRENT_ENVIRONMENT];
  if (!flags.FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE) {
    return {
      notFound: true,
    };
  }

  const { query } = context;
  const { ownerType, ownerId } = query;

  if (!ownerType || !ownerId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ownerType,
      ownerId,
    },
  };
};
