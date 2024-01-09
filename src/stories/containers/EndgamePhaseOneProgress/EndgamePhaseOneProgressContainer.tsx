import styled from '@emotion/styled';
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
import useEndgamePhaseOneProgressContainer from './useEndgamePhaseOneProgressContainer';

const EndgamePhaseOneProgressContainer: React.FC = () => {
  useEndgamePhaseOneProgressContainer();

  return (
    <PageContainer hasImageBackground>
      <SEOHead
        // TODO: Update SEO props
        title="MakerDAO Endgame | Phase 1 Progress"
        description="MakerDAO Endgame provides a comprehensive overview of Endgame governance, operations, token upgrades and budget structure."
        image={{
          src: toAbsoluteURL('/assets/img/endgame/endgame-social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/endgame/endgame-social-1200x630.png')}
      />
      <Breadcrumb
        items={[
          {
            label: 'Roadmaps',
            url: siteRoutes.endgame,
          },
          {
            label: 'Endgame Phase 1',
            url: siteRoutes.endgamePhaseOneProgress,
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

export default EndgamePhaseOneProgressContainer;

const SectionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

const ContainerWithMargin = styled(Container)({
  marginTop: 100,
});
