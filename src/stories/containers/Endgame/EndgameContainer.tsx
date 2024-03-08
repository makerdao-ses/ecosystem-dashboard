import 'intersection-observer'; // polyfill
import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import BudgetStructureSection from './components/BudgetStructureSection/BudgetStructureSection';
import BudgetTransitionStatusSection from './components/BudgetTransitionStatusSection/BudgetTransitionStatusSection';
import EndgameIntroductionBanner from './components/EndgameIntroductionBanner/EndgameIntroductionBanner';
import IntroductoryHeadline from './components/IntroductoryHeadline/IntroductoryHeadline';
import KeyChangesSections from './components/KeyChangesSections/KeyChangesSections';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';
import useEndgameContainer from './useEndgameContainer';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface EndgameContainerProps {
  budgetTransitionAnalytics: Analytic;
  yearsRange: string[];
  initialYear: string;
}

const EndgameContainer: React.FC<EndgameContainerProps> = ({ budgetTransitionAnalytics, yearsRange, initialYear }) => {
  const {
    isLight,
    isEnabled,
    keyChangesRef,
    structureRef,
    transitionStatusRef,
    activeTab,
    handlePauseUrlUpdate,
    transitionDataSelected,
    handleTransitionDateSelectedChange,
    budgetStructureData,
    isLoadingBudgetStructure,
    selectedYear,
    handleYearChange,
    transitionStatusData,
  } = useEndgameContainer(budgetTransitionAnalytics, yearsRange, initialYear);

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
      {isEnabled('FEATURE_ENDGAME_NAVIGATION_SECTION') && (
        <NavigationTabs activeTab={activeTab} handlePauseUrlUpdate={handlePauseUrlUpdate} />
      )}

      <BannerContainer id="section-key-changes">
        <EndgameIntroductionBanner isKeyChanges />
      </BannerContainer>

      <Container>
        <SectionSpacing>
          <div ref={keyChangesRef}>
            <KeyChangesSections />
          </div>

          {isEnabled('FEATURE_ENDGAME_BUDGET_STRUCTURE_SECTION') && (
            <div ref={structureRef}>
              <BudgetStructureSection
                totalBudgetCap={budgetStructureData.totalBudgetCap}
                averageCapUtilization={budgetStructureData.averageCapUtilization}
                endgameBudgets={budgetStructureData.endgameBudgets}
                legacyBudgets={budgetStructureData.legacyBudgets}
                scopes={budgetStructureData.scopes.budget}
                immutable={budgetStructureData.immutable.budget}
                legacy={budgetStructureData.legacy.budget}
                isLoading={isLoadingBudgetStructure}
                yearsRange={yearsRange}
                selectedYear={selectedYear}
                handleYearChange={handleYearChange}
              />
            </div>
          )}

          {isEnabled('FEATURE_ENDGAME_BUDGET_TRANSITION_SECTION') && (
            <div ref={transitionStatusRef}>
              <BudgetTransitionStatusSection
                selected={transitionDataSelected}
                handleChange={handleTransitionDateSelectedChange}
                data={transitionStatusData}
              />
            </div>
          )}
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
