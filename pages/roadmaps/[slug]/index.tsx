import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import RoadmapMilestonesView from '@/views/RoadmapMilestones/RoadmapMilestonesView';

const RoadmapsPage: React.FC = () => <RoadmapMilestonesView />;

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
