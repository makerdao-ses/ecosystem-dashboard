import React from 'react';
import { fetchCoreUnitsWithActivities } from '../../src/stories/containers/GlobalActivity/GlobalActivityAPI';
import GlobalActivity from '../../src/stories/containers/GlobalActivity/GlobalActivityFeedContainer';
import type { CoreUnitDto } from '../../src/core/models/dto/coreUnitDTO';
import type { GetServerSideProps, NextPage } from 'next';

const GlobalActivityPage: NextPage<{ coreUnits: CoreUnitDto[] }> = ({ coreUnits }) => (
  <GlobalActivity coreUnits={coreUnits} />
);

export default GlobalActivityPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const coreUnits = await fetchCoreUnitsWithActivities();

  return {
    props: {
      coreUnits,
    },
  };
};
