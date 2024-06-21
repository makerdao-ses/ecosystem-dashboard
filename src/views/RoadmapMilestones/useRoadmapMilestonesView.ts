import { useRouter } from 'next/router';
import { DefaultRoadmap, PowerhouseRoadmap2024 } from './staticData';

const POWERHOUSE_ROADMAP_SLUG = 'ph-2024';

const useRoadmapMilestonesView = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const isMinimalist = slug === POWERHOUSE_ROADMAP_SLUG;

  const roadmap = slug === POWERHOUSE_ROADMAP_SLUG ? PowerhouseRoadmap2024 : DefaultRoadmap;

  const titles = {
    overview: slug === POWERHOUSE_ROADMAP_SLUG ? 'Roadmap Milestones' : 'Milestones Roadmap Overview',
    details: slug === POWERHOUSE_ROADMAP_SLUG ? 'Milestones Details' : 'Milestones Roadmap Details',
  };

  return {
    roadmap,
    isMinimalist,
    titles,
  };
};

export default useRoadmapMilestonesView;
