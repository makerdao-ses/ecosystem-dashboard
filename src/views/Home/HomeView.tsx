import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
import type { Roadmap } from '@/core/models/interfaces/roadmaps';
import type { Team } from '@/core/models/interfaces/team';
import ContributorsSection from './components/Contributors/ContributorsSection';
import FinancesSection from './components/FinancesSection/FinancesSection';
import { SectionTitle } from './components/FinancesSectionTitle/FinancesSectionTitle';
import GovernanceSection from './components/GovernanceSection/GovernanceSection';
import HeaderCard from './components/HeaderCard/HeaderCard';
import RoadmapSection from './components/RoadmapSection/RoadmapSection';
import { headerCardData, sectionsData } from './staticData';
import useHomeView from './useHomeView';
import type { FormattedFinancesData } from './api/finances';
import type { RevenueAndSpendingRecords } from './api/revenueAndSpending';
import type { FC } from 'react';

export interface HomeViewProps {
  revenueAndSpendingData: RevenueAndSpendingRecords;
  financesData: FormattedFinancesData;
  teams: Team[];
  governanceProposals: ExtendedExecutiveProposal[];
  roadmaps: Roadmap[];
}

const HomeView: FC<HomeViewProps> = ({
  revenueAndSpendingData,
  financesData,
  teams,
  governanceProposals,
  roadmaps,
}) => {
  useHomeView();

  return (
    <HomeViewContainer>
      <SEOHead
        title="Homepage"
        description="Homepage description"
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <Container>
        <HeaderCard />
        <Section id={headerCardData.buttonTexts[0].toLowerCase()}>
          <FinancesSection revenueAndSpendingData={revenueAndSpendingData} financesData={financesData} />
        </Section>
        <Section id={headerCardData.buttonTexts[1].toLowerCase()}>
          <GovernanceSection governanceProposals={governanceProposals} />
        </Section>
        <Section id={headerCardData.buttonTexts[2].toLowerCase()}>
          <SectionTitle>{sectionsData.titles[2]}</SectionTitle>
          <ContainerMargin>
            <ContributorsSection teams={teams} />
          </ContainerMargin>
        </Section>
        <Section id={headerCardData.buttonTexts[3].toLowerCase()}>
          <SectionTitle>{sectionsData.titles[3]}</SectionTitle>
          <RoadmapSection roadmaps={roadmaps} />
        </Section>
      </Container>
    </HomeViewContainer>
  );
};

export default HomeView;

const HomeViewContainer = styled(PageContainer)(() => ({
  marginTop: 24,
}));

const Section = styled('section')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 24,
  scrollSnapAlign: 'start',
  scrollMarginTop: 80,

  [theme.breakpoints.up('tablet_768')]: {
    scrollMarginTop: 110,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 32,
  },
}));

const ContainerMargin = styled('div')({
  marginTop: 24,
});
