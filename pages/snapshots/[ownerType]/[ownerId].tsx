import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import TemporaryContainer from '@ses/containers/TransparencyReport/components/AccountsSnapshot/TemporaryContainer';
import { fetchAccountsSnapshot } from '@ses/containers/TransparencyReport/components/AccountsSnapshot/api/queries';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { GetServerSidePropsContext } from 'next';

interface TemporalAccountSnapshotPageProps {
  snapshot: Snapshots;
}

const TemporalAccountSnapshotPage: React.FC<TemporalAccountSnapshotPageProps> = ({ snapshot }) => (
  <TemporaryContainer snapshot={snapshot} />
);

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

  const snapshots = await fetchAccountsSnapshot(ownerType as string, ownerId as string);

  if (snapshots?.length <= 0) {
    // there are not snapshots
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ownerType,
      ownerId,
      snapshot: snapshots[0] ?? null,
    },
  };
};
