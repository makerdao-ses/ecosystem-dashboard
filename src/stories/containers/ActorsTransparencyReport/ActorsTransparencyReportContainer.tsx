import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import BudgetStatementPager from '@ses/components/TransparencyReporting/BudgetStatementPager/BudgetStatementPager';
import { siteRoutes } from '@ses/config/routes';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorSummary from '../ActorsAbout/ActorSummary/ActorSummary';
import useActorsTransparencyReport from './useActorsTransparencyReport';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorsTransparencyReportContainerProps {
  actors: Partial<Team>[];
  actor: Team;
}

const ActorsTransparencyReportContainer: React.FC<ActorsTransparencyReportContainerProps> = ({ actor, actors }) => {
  const {
    pagerRef,
    currentBudgetStatement,
    currentMonth,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
  } = useActorsTransparencyReport(actor);

  return (
    <Wrapper>
      <SEOHead
        title={`${actor.name} Core Unit | Finances`}
        description={`Learn about the ${actor.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
        image={actor.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={actor.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.ecosystemActorReports(actor.code)}
      />
      <ActorSummary
        // TODO: generalize the actor type to avoid types errors
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actors={actors as any}
        trailingAddress={['Expense Reports']}
        breadcrumbTitle="Expense Reports"
        cutTextTooLong={actor.name.length > 20}
      />
      <PageContainer hasImageBackground={true}>
        <PageSeparator>
          <Container>
            <BudgetStatementPager
              currentMonth={currentMonth}
              handleNext={handleNextMonth}
              handlePrevious={handlePreviousMonth}
              hasNext={hasNextMonth()}
              hasPrevious={hasPreviousMonth()}
              budgetStatus={currentBudgetStatement?.status || BudgetStatus.Draft}
              showExpenseReportStatusCTA={showExpenseReportStatusCTA}
              lastUpdate={lastUpdateForBudgetStatement}
              ref={pagerRef}
            />
          </Container>
        </PageSeparator>
      </PageContainer>
    </Wrapper>
  );
};

export default ActorsTransparencyReportContainer;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const PageSeparator = styled.div({
  marginTop: 32,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 32,
    marginTop: 0,
  },
});
