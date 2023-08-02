import React from 'react';
import { fetchGlobalActivityFeedData } from '../../src/stories/containers/GlobalActivity/GlobalActivityAPI';
import GlobalActivityFeedContainer from '../../src/stories/containers/GlobalActivity/GlobalActivityFeedContainer';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { Team } from '@ses/core/models/interfaces/team';
import type { GetServerSideProps, NextPage } from 'next';

interface GlobalActivityPageProps {
  teams: Team[];
  activityFeed: ChangeTrackingEvent[];
}

const GlobalActivityPage: NextPage<GlobalActivityPageProps> = ({ teams, activityFeed }) => (
  <GlobalActivityFeedContainer teams={teams} activityFeed={activityFeed} />
);

export default GlobalActivityPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const { activityFeed, teams } = await fetchGlobalActivityFeedData();

  return {
    props: {
      teams,
      activityFeed,
    },
  };
};
