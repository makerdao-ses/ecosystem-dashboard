/* eslint-disable spellcheck/spell-checker */
import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { useRouter } from 'next/router';
import React /* , { useEffect } */ from 'react';

import BudgetStructureSection from './components/BudgetStructureSection/BudgetStructureSection';
import BudgetTransitionStatusSection from './components/BudgetTransitionStatusSection/BudgetTransitionStatusSection';
import EndgameIntroductionBanner from './components/EndgameIntroductionBanner/EndgameIntroductionBanner';
import IntroductoryHeadline from './components/IntroductoryHeadline/IntroductoryHeadline';
import KeyChangesSections from './components/KeyChangesSections/KeyChangesSections';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

gsap.registerPlugin(ScrollTrigger);

const EndgameContainer: React.FC = () => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();

  /* useEffect(() => {
    ScrollTrigger.create({
      id: 'st',
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        console.log('progress:', self.progress.toFixed(3), 'direction:', self.direction, 'velocity', self.getVelocity());
      },
      markers: true,
    });

    return () => {
      const st = ScrollTrigger.getById('st');
      if (st) {
        st.kill();
      }
    };
  }, []); */

  return (
    <EndgamePageContainer isLight={isLight}>
      <SEOHead
        title="MakerDAO Endgame | Endgame Overview"
        description="MakerDAO Endgame provides a comprehensive overview of Endgame governance, operations, token upgrades and budget structure."
        image={{
          src: toAbsoluteURL('/assets/img/endgame/endgame-social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/endgame/endgame-social-1200x630.png')}
      />
      <Container>
        <IntroductoryHeadline />
      </Container>
      {isEnabled('FEATURE_ENDGAME_NAVIGATION_SECTION') && <NavigationTabs />}

      <BannerContainer id="key-changes">
        <EndgameIntroductionBanner isKeyChanges />
      </BannerContainer>

      <Container>
        <SectionSpacing>
          <KeyChangesSections />

          {isEnabled('FEATURE_ENDGAME_BUDGET_STRUCTURE_SECTION') && <BudgetStructureSection />}

          {isEnabled('FEATURE_ENDGAME_BUDGET_TRANSITION_SECTION') && <BudgetTransitionStatusSection />}
        </SectionSpacing>
      </Container>
    </EndgamePageContainer>
  );
};

export default EndgameContainer;

const EndgamePageContainer = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  marginTop: 32,
  background: isLight ? 'white' : 'linear-gradient(180deg, #001020 0%, #000 100%)',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 40,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
}));

const BannerContainer = styled.div({
  marginTop: 48,
  marginBottom: 48,
  scrollMarginTop: 110,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 64,
    marginBottom: 64,
  },
});

const SectionSpacing = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
});
