import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
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
      <div>Breadcrumb</div>
      <Container>
        <PageHeader />

        <SectionsContainer>
          <OverviewSection />
          <DetailsSection />
        </SectionsContainer>
      </Container>
    </PageContainer>
  );
};

export default EndgamePhaseOneProgressContainer;

const SectionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
