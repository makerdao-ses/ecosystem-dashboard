import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { featureFlags } from 'feature-flags/feature-flags';
import { DateTime } from 'luxon';
import React from 'react';
import TemporaryContainer from '@/components/AccountsSnapshot/TemporaryContainer';
import {
  fetchAccountsSnapshot,
  generateSnapshotOwnerString,
  getResourceType,
} from '@/components/AccountsSnapshot/api/queries';
import type { Snapshots } from '@ses/core/models/dto/snapshotAccountDTO';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { GetServerSidePropsContext } from 'next';

interface TemporalAccountSnapshotPageProps {
  snapshot: Snapshots;
  snapshotOwner: string;
  resourceType: ResourceType;
}

const TemporalAccountSnapshotPage: React.FC<TemporalAccountSnapshotPageProps> = ({
  snapshot,
  snapshotOwner,
  resourceType,
}) => <TemporaryContainer snapshot={snapshot} snapshotOwner={snapshotOwner} resourceType={resourceType} />;

export default TemporalAccountSnapshotPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const flags = featureFlags[CURRENT_ENVIRONMENT];
  if (!flags.FEATURE_TEMPORARY_ACCOUNTS_SNAPSHOT_PAGE) {
    return {
      notFound: true,
    };
  }

  const { query } = context;

  const { data, period } = query;
  if (!(data?.length === 1 || data?.length === 2)) {
    return {
      // wrong amount of params
      notFound: true,
    };
  }
  const ownerType = data[0];
  const ownerId = data.length === 2 ? data[1] : null;

  if (
    !ownerType ||
    (ownerId !== null && isNaN(ownerId as unknown as number)) ||
    (period && !/^\d{4}\/\d{2}$/g.test(period as string))
  ) {
    return {
      notFound: true,
    };
  }

  const resourceType = getResourceType(ownerType);

  const [snapshots, snapshotOwner] = await Promise.all([
    fetchAccountsSnapshot(
      ownerType as string,
      ownerId as string,
      period ? DateTime.fromFormat(period as string, 'yyyy/MM') : undefined
    ),
    generateSnapshotOwnerString(ownerType as string, ownerId as string),
  ]);

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
      snapshotOwner,
      resourceType,
    },
  };
};
