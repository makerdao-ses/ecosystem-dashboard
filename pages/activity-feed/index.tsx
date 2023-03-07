import React from 'react';
import GlobalActivity from '../../src/stories/containers/global-activity/global-activity';
import { fetchCoreUnitsWithActivities } from '../../src/stories/containers/global-activity/global-activity.api';
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
