import React from 'react';
import { fetchGlobalActivityFeedData } from '../../src/stories/containers/GlobalActivity/GlobalActivityAPI';
import GlobalActivityFeedContainer from '../../src/stories/containers/GlobalActivity/GlobalActivityFeedContainer';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { GetServerSideProps, NextPage } from 'next';

interface GlobalActivityPageProps {
  coreUnits: CoreUnit[];
  activityFeed: ChangeTrackingEvent[];
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
