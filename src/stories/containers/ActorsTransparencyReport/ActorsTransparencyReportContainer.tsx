import styled from '@emotion/styled';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Tabs from '@ses/components/Tabs/Tabs';
import BudgetStatementPager from '@ses/components/TransparencyReporting/BudgetStatementPager/BudgetStatementPager';
import { siteRoutes } from '@ses/config/routes';
import { ModalCategoriesProvider } from '@ses/core/context/CategoryModalContext';
import { CommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import ActorSummary from '../../../views/EAAbout/components/ActorSummary/ActorSummary';
import AccountsSnapshotTabContainer from '../TransparencyReport/components/AccountsSnapshot/AccountsSnapshotTabContainer';
import ExpenseReport from '../TransparencyReport/components/ExpenseReport/ExpenseReport';
import { TransparencyActuals } from '../TransparencyReport/components/TransparencyActuals/TransparencyActuals';
import { TransparencyAudit } from '../TransparencyReport/components/TransparencyAudit/TransparencyAudit';
import AuditorCommentsContainer from '../TransparencyReport/components/TransparencyAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import { TransparencyForecast } from '../TransparencyReport/components/TransparencyForecast/TransparencyForecast';
import { TransparencyMkrVesting } from '../TransparencyReport/components/TransparencyMkrVesting/TransparencyMkrVesting';
import { TransparencyTransferRequest } from '../TransparencyReport/components/TransparencyTransferRequest/TransparencyTransferRequest';
import { TRANSPARENCY_IDS_ENUM } from '../TransparencyReport/useTransparencyReport';
import TeamHeadLine from './components/TeamHeadlineText/TeamHeadlineText';
import useActorsTransparencyReport from './useActorsTransparencyReport';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { Team } from '@ses/core/models/interfaces/team';

interface ActorsTransparencyReportContainerProps {
  actors: Team[];
  actor: Team;
  expenseCategories: ExpenseCategory[];
  snapshotLimitPeriods?: SnapshotLimitPeriods;
}

const ActorsTransparencyReportContainer: React.FC<ActorsTransparencyReportContainerProps> = ({
  actor,
  actors,
  expenseCategories,
  snapshotLimitPeriods,
}) => {
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
    lastUpdate,
    tabItems,
    compressedTabItems,
    onTabsInit,
    onTabChange,
    onTabsExpand,
    lastVisitHandler,
    comments,
    setSnapshotCreated,
  } = useActorsTransparencyReport(actor, snapshotLimitPeriods);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, router.query.code as string);
  const headline = <TeamHeadLine teamLongCode={actor.code} teamShortCode={actor.shortCode} />;

  return (
    <Wrapper>
      <SEOHead
        title={`${actor.name} Ecosystem Actor | Finances`}
        description={`Learn about the ${actor.name} Ecosystem Actor at MakerDAO: their mandate, scope, vision, strategy, and more.`}
        image={actor.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={actor.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.ecosystemActorReports(actor.shortCode)}
      />
      <ActorSummary
        actors={actors}
        trailingAddress={['Budget Statements']}
        breadcrumbTitle="Budget Statements"
        ref={ref}
        showHeader={showHeader}
      />
      <PageContainer hasImageBackground={true}>
        <PageSeparator marginTop={height}>
          <Container>
            <BudgetStatementPager
              currentMonth={currentMonth}
              handleNext={handleNextMonth}
              handlePrevious={handlePreviousMonth}
              hasNext={hasNextMonth()}
              hasPrevious={hasPreviousMonth()}
              budgetStatus={currentBudgetStatement?.status || BudgetStatus.Draft}
              showExpenseReportStatusCTA={showExpenseReportStatusCTA}
              lastUpdate={lastUpdate}
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
          <ModalCategoriesProvider expenseCategories={expenseCategories}>
            <Container>
              {tabsIndex === TRANSPARENCY_IDS_ENUM.ACTUALS && (
                <TransparencyActuals
                  currentMonth={currentMonth}
                  budgetStatements={actor?.budgetStatements}
                  longCode={actor.code}
                  shortCode={actor.shortCode}
                  headline={headline}
                  resource={ResourceType.EcosystemActor}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.FORECAST && (
                <TransparencyForecast
                  currentMonth={currentMonth}
                  budgetStatements={actor?.budgetStatements}
                  longCode={actor.code}
                  shortCode={actor.shortCode}
                  headline={headline}
                  resource={ResourceType.EcosystemActor}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.MKR_VESTING && (
                <TransparencyMkrVesting
                  currentMonth={currentMonth}
                  budgetStatements={actor?.budgetStatements}
                  longCode={actor.code}
                  shortCode={actor.shortCode}
                  headline={headline}
                  resource={ResourceType.EcosystemActor}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS && (
                <TransparencyTransferRequest
                  currentMonth={currentMonth}
                  budgetStatements={actor?.budgetStatements}
                  longCode={actor.code}
                  shortCode={actor.shortCode}
                  headline={headline}
                  resource={ResourceType.EcosystemActor}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS && isEnabled('FEATURE_AUDIT_REPORTS') && (
                <TransparencyAudit budgetStatement={currentBudgetStatement} />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS && (
                <AccountsSnapshotTabContainer
                  snapshotOwner={`${actor.shortCode} Ecosystem Actor`}
                  currentMonth={currentMonth}
                  ownerId={actor.id}
                  longCode={actor.code}
                  shortCode={actor.shortCode}
                  resource={ResourceType.EcosystemActor}
                  setSnapshotCreated={setSnapshotCreated}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS && (
                <CommentActivityContext.Provider value={{ lastVisitHandler }}>
                  <AuditorCommentsContainer
                    budgetStatement={currentBudgetStatement}
                    comments={comments}
                    resource={ResourceType.EcosystemActor}
                  />
                </CommentActivityContext.Provider>
              )}
            </Container>

            {tabsIndex === TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT && (
              <ExpenseReport
                code={actor.shortCode}
                currentMonth={currentMonth}
                budgetStatements={actor?.budgetStatements}
                longCode={actor.code}
                resource={ResourceType.EcosystemActor}
              />
            )}
          </ModalCategoriesProvider>
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

const PageSeparator = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  marginTop: `${32 + marginTop}px`,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 32,
    marginTop,
  },
}));

const TabsContainer = styled.div({
  margin: '32px 0 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '32px 0',
  },
});
