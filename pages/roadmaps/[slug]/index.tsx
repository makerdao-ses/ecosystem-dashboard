import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import RoadmapMilestonesContainer from '@ses/containers/RoadmapMilestones/RoadmapMilestonesContainer';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';

const RoadmapsPage: React.FC = () => <RoadmapMilestonesContainer />;

export default RoadmapsPage;

export const getServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ROADMAP_MILESTONES) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
