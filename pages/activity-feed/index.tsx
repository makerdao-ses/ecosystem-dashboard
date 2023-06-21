import React from 'react';
import { fetchGlobalActivityFeedData } from '../../src/stories/containers/GlobalActivity/GlobalActivityAPI';
import GlobalActivityFeedContainer from '../../src/stories/containers/GlobalActivity/GlobalActivityFeedContainer';
import type { ActivityFeedDto, CoreUnitDto } from '../../src/core/models/dto/coreUnitDTO';
import type { GetServerSideProps, NextPage } from 'next';

interface GlobalActivityPageProps {
  coreUnits: CoreUnitDto[];
  activityFeed: ActivityFeedDto[];
}

const GlobalActivityPage: NextPage<GlobalActivityPageProps> = ({ coreUnits, activityFeed }) => (
  <GlobalActivityFeedContainer coreUnits={coreUnits} activityFeed={activityFeed} />
);

export default GlobalActivityPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { activityFeed, coreUnits } = await fetchGlobalActivityFeedData();

  return {
    props: {
      coreUnits,
      activityFeed,
    },
  };
};
