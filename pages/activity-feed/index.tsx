import React from 'react';
import {
  fetchActivities,
  fetchCoreUnitsWithActivities,
} from '../../src/stories/containers/global-activity/global-activity.api';
import GlobalActivityFeed from '../../src/stories/containers/global-activity/global-activity2';
import type { CoreUnitDto } from '../../src/core/models/dto/core-unit.dto';
import type { GetServerSideProps, NextPage } from 'next';

const GlobalActivityPage: NextPage<{ coreUnits: CoreUnitDto[] }> = ({ coreUnits }) => (
  <GlobalActivityFeed coreUnits={coreUnits} />
);

export default GlobalActivityPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const coreUnits = await fetchCoreUnitsWithActivities();

  const activities = await fetchActivities(0, 5, 1);
  console.log(activities);
  return {
    props: {
      coreUnits,
    },
  };
};
