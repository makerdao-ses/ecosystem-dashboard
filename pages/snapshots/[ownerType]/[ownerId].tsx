import TemporaryContainer from '@ses/containers/TransparencyReport/components/AccountsSnapshot/TemporaryContainer';
import React from 'react';
import type { GetServerSidePropsContext } from 'next';

const TemporalAccountSnapshotPage = () => <TemporaryContainer />;

export default TemporalAccountSnapshotPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
