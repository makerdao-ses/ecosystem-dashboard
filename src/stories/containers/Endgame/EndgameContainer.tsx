import 'intersection-observer'; // polyfill
import { styled } from '@mui/material';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import React from 'react';
import KeyChangesBudgetTransitionStatusSection from '../../../components/KeyChangesBudgetTransitionStatusSection/KeyChangesBudgetTransitionStatusSection';
import BudgetStructureSection from './components/BudgetStructureSection/BudgetStructureSection';
import BudgetTransitionStatusSection from './components/BudgetTransitionStatusSection/BudgetTransitionStatusSection';
import EndgameIntroductionBanner from './components/EndgameIntroductionBanner/EndgameIntroductionBanner';
import IntroductoryHeadline from './components/IntroductoryHeadline/IntroductoryHeadline';
import KeyChangesSections from './components/KeyChangesSections/KeyChangesSections';
import LatestUpdatesSection from './components/LatestUpdatesSection/LatestUpdatesSection';
import NavigationTabs from './components/NavigationTabs/NavigationTabs';
import useEndgameContainer from './useEndgameContainer';
import type { Analytic } from '@ses/core/models/interfaces/analytic';

interface EndgameContainerProps {
  budgetTransitionAnalytics: Analytic;
  yearsRange: string[];
  initialYear: string;
}

const EndgameContainer: React.FC<EndgameContainerProps> = ({ budgetTransitionAnalytics, yearsRange, initialYear }) => {
  const {
    updatesChangesRef,
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
    <EndgamePageContainer>
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
      <NavigationTabs activeTab={activeTab} handlePauseUrlUpdate={handlePauseUrlUpdate} />

      <Container>
        <div ref={updatesChangesRef}>
          <LatestUpdatesSection />
        </div>
      </Container>

      <div ref={keyChangesRef}>
        <BannerContainer id="section-key-changes">
          <EndgameIntroductionBanner isKeyChanges />
        </BannerContainer>
        <Container>
          <KeyChangesSections />
        </Container>
      </div>

      <Container>
        <SectionSpacing>
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

          <div ref={transitionStatusRef}>
            <BudgetTransitionStatusSection
              selected={transitionDataSelected}
              handleChange={handleTransitionDateSelectedChange}
              data={transitionStatusData}
            />
          </div>

          <KeyChangesBudgetTransitionStatusSection />
        </SectionSpacing>
      </Container>
    </EndgamePageContainer>
  );
};

export default EndgameContainer;

const EndgamePageContainer = styled(PageContainer)(({ theme }) => ({
  marginTop: 32,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 40,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginTop: 64,
  },
}));

const BannerContainer = styled('div')(({ theme }) => ({
  marginTop: 32,
  marginBottom: 32,
  scrollMarginTop: 110,
  paddingLeft: 16,
  paddingRight: 16,
  width: '100%',
  maxWidth: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 12000,
  },
}));

const SectionSpacing = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 48,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 80,
  },
}));
