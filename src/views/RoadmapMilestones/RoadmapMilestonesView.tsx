import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import PageHeader from './components/PageHeader/PageHeader';
import DetailsSection from './components/sections/DetailsSection/DetailsSection';
import OverviewSection from './components/sections/OverviewSection/OverviewSection';
import useRoadmapMilestonesView from './useRoadmapMilestonesView';

const RoadmapMilestonesView: React.FC = () => {
  useRoadmapMilestonesView();

  return (
    <PageContainer hasImageBackground>
      <SEOHead
        title="Powerhouse Roadmap 2024"
        description="Powerhouse Ecosystem Actor team roadmap for the year 2024."
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <Breadcrumb
        items={[
          {
            label: 'Roadmaps',
            url: siteRoutes.endgame,
          },
          {
            label: 'Endgame Phase 1',
            url: siteRoutes.roadmapMilestones('endgame-phase-1'),
          },
        ]}
      />
      <ContainerWithMargin>
        <PageHeader
          title="Phase 1 Progress"
          subtitle="Unleashing Potential: MakerDAO’s result-driven road map for unlocking tangible results."
        />

        <SectionsContainer>
          <OverviewSection title="Milestones Roadmap Overview" />
          <DetailsSection title="Milestones Roadmap Details" />
        </SectionsContainer>
      </ContainerWithMargin>
    </PageContainer>
  );
};

export default RoadmapMilestonesView;

const SectionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 48,
  },
}));

const ContainerWithMargin = styled(Container)({
  marginTop: 64,
});
