import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import RoadmapMilestonesView from '@/views/RoadmapMilestones/RoadmapMilestonesView';
import { getScopeOfWorkState } from '@/views/RoadmapMilestones/api/queries';
import { DefaultRoadmap } from '@/views/RoadmapMilestones/staticData';
import type { GetServerSidePropsContext } from 'next';

interface RoadmapsPageProps {
  roadmap: Roadmap;
}

const RoadmapsPage: React.FC<RoadmapsPageProps> = ({ roadmap }) => <RoadmapMilestonesView roadmap={roadmap} />;

export default RoadmapsPage;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ROADMAP_MILESTONES) {
    return {
      notFound: true,
    };
  }

  const slug = context.query.slug as string;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  if (slug !== 'ph-2024') {
    // default to static data
    return {
      props: {
        roadmap: DefaultRoadmap,
      },
    };
  }

  // the slug is ph-2024
  const roadmaps = await getScopeOfWorkState();
  const roadmap = roadmaps[0];

  return {
    props: {
      roadmap,
    },
  };
};
