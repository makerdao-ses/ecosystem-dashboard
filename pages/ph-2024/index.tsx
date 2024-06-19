import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import PowerhouseRoadmapView from '@/views/PowerhouseRoadmap/PowerhouseRoadmapView';

const PowerhouseRoadmapPage: React.FC = () => <PowerhouseRoadmapView />;

export default PowerhouseRoadmapPage;

export const getServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_POWERHOUSE_ROADMAP) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};
