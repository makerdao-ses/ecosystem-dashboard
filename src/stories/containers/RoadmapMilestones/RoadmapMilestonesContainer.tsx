import { styled } from '@mui/material';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import PageHeader from './components/PageHeader/PageHeader';
import DetailsSection from './components/sections/DetailsSection/DetailsSection';
import OverviewSection from './components/sections/OverviewSection/OverviewSection';
import useRoadmapMilestonesContainer from './useRoadmapMilestonesContainer';

const RoadmapMilestonesContainer: React.FC = () => {
  useRoadmapMilestonesContainer();

  return (
    <PageContainer hasImageBackground>
      <SEOHead
        title="MakerDAO Endgame | Roadmaps and Milestones"
        description="MakerDAO Roadmaps and Milestones page provides a comprehensive overview of Milestones and Deliverables, their status, and progress."
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
        <PageHeader />

        <SectionsContainer>
          <OverviewSection />
          <DetailsSection />
        </SectionsContainer>
      </ContainerWithMargin>
    </PageContainer>
  );
};

export default RoadmapMilestonesContainer;

const SectionsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 48,
  },
}));

const ContainerWithMargin = styled(Container)({
  marginTop: 100,
});
