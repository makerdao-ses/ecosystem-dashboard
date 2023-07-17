import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Tabs from '@ses/components/Tabs/Tabs';
import BudgetStatementPager from '@ses/components/TransparencyReporting/BudgetStatementPager/BudgetStatementPager';
import { siteRoutes } from '@ses/config/routes';
import { CommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ActorSummary from '../ActorsAbout/ActorSummary/ActorSummary';
import AccountsSnapshotTabContainer from '../TransparencyReport/components/AccountsSnapshot/AccountsSnapshotTabContainer';
import ExpenseReport from '../TransparencyReport/components/ExpenseReport/ExpenseReport';
import { TransparencyActuals } from '../TransparencyReport/components/TransparencyActuals/TransparencyActuals';
import { TransparencyAudit } from '../TransparencyReport/components/TransparencyAudit/TransparencyAudit';
import AuditorCommentsContainer from '../TransparencyReport/components/TransparencyAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import { TransparencyForecast } from '../TransparencyReport/components/TransparencyForecast/TransparencyForecast';
import { TransparencyMkrVesting } from '../TransparencyReport/components/TransparencyMkrVesting/TransparencyMkrVesting';
import { TransparencyTransferRequest } from '../TransparencyReport/components/TransparencyTransferRequest/TransparencyTransferRequest';
import { TRANSPARENCY_IDS_ENUM } from '../TransparencyReport/useTransparencyReport';
import useActorsTransparencyReport from './useActorsTransparencyReport';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorsTransparencyReportContainerProps {
  actors: Partial<Team>[];
  actor: Team;
}

const ActorsTransparencyReportContainer: React.FC<ActorsTransparencyReportContainerProps> = ({ actor, actors }) => {
  const {
    isEnabled,
    pagerRef,
    tabsIndex,
    currentBudgetStatement,
    currentMonth,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
    tabItems,
    compressedTabItems,
    onTabsInit,
    onTabChange,
    onTabsExpand,
    lastVisitHandler,
    comments,
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
        // TODO: modify the type of actors to be Team[]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        actors={actors as any}
        trailingAddress={['Expense Report']}
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

            <TabsContainer>
              <Tabs
                tabs={tabItems}
                expandable
                compressedTabs={compressedTabItems}
                onInit={onTabsInit}
                onChange={onTabChange}
                onExpand={onTabsExpand}
                expandToolTip={{
                  default: 'Default View',
                  compressed: 'Auditor View',
                }}
                tabQuery={'section'}
                viewValues={{
                  default: 'default',
                  compressed: 'auditor',
                }}
              />
            </TabsContainer>
          </Container>
          <Container>
            {tabsIndex === TRANSPARENCY_IDS_ENUM.ACTUALS && (
              <TransparencyActuals
                code={actor.shortCode}
                currentMonth={currentMonth}
                // TODO: modify the type of actors to be BudgetStatement[]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgetStatements={actor?.budgetStatements as any}
                longCode={actor.code}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.FORECAST && (
              <TransparencyForecast
                currentMonth={currentMonth}
                // TODO: modify the type of actors to be BudgetStatement[]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgetStatements={actor?.budgetStatements as any}
                code={actor.shortCode}
                longCode={actor.code}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.MKR_VESTING && (
              <TransparencyMkrVesting
                currentMonth={currentMonth}
                // TODO: modify the type of actors to be BudgetStatement[]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgetStatements={actor?.budgetStatements as any}
                code={actor.shortCode}
                longCode={actor.code}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS && (
              <TransparencyTransferRequest
                currentMonth={currentMonth}
                // TODO: modify the type of actors to be BudgetStatement[]
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                budgetStatements={actor?.budgetStatements as any}
                code={actor.shortCode}
                longCode={actor.code}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS && isEnabled('FEATURE_AUDIT_REPORTS') && (
              <TransparencyAudit budgetStatement={currentBudgetStatement} />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS && isEnabled('FEATURE_ACCOUNTS_SNAPSHOT') && (
              <AccountsSnapshotTabContainer
                snapshotOwner={`${actor.shortCode} Ecosystem Actor`}
                currentMonth={currentMonth}
                ownerId={actor.id}
                longCode={actor.code}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS && (
              <CommentActivityContext.Provider value={{ lastVisitHandler }}>
                <AuditorCommentsContainer budgetStatement={currentBudgetStatement} comments={comments} />
              </CommentActivityContext.Provider>
            )}
          </Container>

          {tabsIndex === TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT && (
            <ExpenseReport
              code={actor.shortCode}
              currentMonth={currentMonth}
              // TODO: modify the type of actors to be BudgetStatement[]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              budgetStatements={actor?.budgetStatements as any}
              longCode={actor.code}
            />
          )}
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

const TabsContainer = styled.div({
  margin: '32px 0 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '32px 0',
  },
});
