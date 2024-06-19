import { styled } from '@mui/material';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import { siteRoutes } from '@/config/routes';
import { toAbsoluteURL } from '@/core/utils/urls';
import { SEOHead } from '@/stories/components/SEOHead/SEOHead';
import Breadcrumb from '../RoadmapMilestones/components/Breadcrumb/Breadcrumb';
import PageHeader from '../RoadmapMilestones/components/PageHeader/PageHeader';
import DetailsSection from '../RoadmapMilestones/components/sections/DetailsSection/DetailsSection';
import OverviewSection from '../RoadmapMilestones/components/sections/OverviewSection/OverviewSection';

const PowerhouseRoadmapView = () => (
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
          label: 'Roadmap',
          url: '',
        },
        {
          label: 'Powerhouse Roadmap 2024',
          url: siteRoutes.roadmapMilestones('endgame-phase-1'),
        },
      ]}
    />
    <ContainerWithMargin>
      <PageHeader
        title="Powerhouse Roadmap 2024"
        subtitle="Powerhouse Ecosystem Actor team roadmap for the year 2024."
      />

      <SectionsContainer>
        <OverviewSection title="Roadmap Milestones" />
        <DetailsSection title="Milestones Details" minimal />
      </SectionsContainer>
    </ContainerWithMargin>
  </PageContainer>
);

export default PowerhouseRoadmapView;

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
