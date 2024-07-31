import { styled } from '@mui/material';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { ModalCategoriesProvider } from '@ses/core/context/CategoryModalContext';
import { CommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import { BudgetStatementActuals } from '@/components/BudgetStatement/BudgetStatementActuals/BudgetStatementActuals';
import { TransparencyAudit } from '@/components/BudgetStatement/BudgetStatementAudit/BudgetStatementAudit';
import AuditorCommentsContainer from '@/components/BudgetStatement/BudgetStatementAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import { BudgetStatementForecast } from '@/components/BudgetStatement/BudgetStatementForecast/BudgetStatementForecast';
import { BudgetStatementMkrVesting } from '@/components/BudgetStatement/BudgetStatementMkrVesting/BudgetStatementMkrVesting';
import BudgetStatementPager from '@/components/BudgetStatement/BudgetStatementPager/BudgetStatementPager';
import { BudgetStatementTransferRequest } from '@/components/BudgetStatement/BudgetStatementTransferRequest/BudgetStatementTransferRequest';
import ExpenseReport from '@/components/BudgetStatement/ExpenseReport/ExpenseReport';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import Tabs from '@/components/Tabs/Tabs';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import AccountsSnapshotTabContainer from '../../components/AccountsSnapshot/AccountsSnapshotTabContainer';
import CuHeadlineText from '../../components/CuHeadlineText/CuHeadlineText';
import { TRANSPARENCY_IDS_ENUM } from '../CoreUnitBudgetStatement/useCoreUnitBudgetStatementView';
import useEcosystemActorBudgetStatementView from './useEcosystemActorBudgetStatementView';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { Team } from '@ses/core/models/interfaces/team';

interface EcosystemActorBudgetStatementViewProps {
  actors: Team[];
  actor: Team;
  expenseCategories: ExpenseCategory[];
  snapshotLimitPeriods?: SnapshotLimitPeriods;
}

const EcosystemActorBudgetStatementView: React.FC<EcosystemActorBudgetStatementViewProps> = ({
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
    pager,
    isDisablePopoverForMobile,
  } = useEcosystemActorBudgetStatementView(actor, actors, snapshotLimitPeriods);

  const headline = <CuHeadlineText cuLongCode={actor.code} isCoreUnit={false} shortCode={actor.shortCode} />;
  return (
    <PageContainer>
      <SEOHead
        title={`${actor.name} Ecosystem Actor | Finances`}
        description={`Learn about the ${actor.name} Ecosystem Actor at MakerDAO: their mandate, scope, vision, strategy, and more.`}
        image={actor.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={actor.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.ecosystemActorReports(actor.shortCode)}
      />
      <Breadcrumb
        items={[
          {
            label: 'Contributors',
            href: siteRoutes.contributors,
          },
          {
            label: 'Ecosystem Actors',
            href: siteRoutes.ecosystemActors,
            number: actors.length,
          },
          {
            label: actor.name,
            href: siteRoutes.ecosystemActorAbout(actor.shortCode),
          },
          {
            label: 'Budget Statements',
            href: '',
          },
        ]}
        rightContent={
          <TeamBreadcrumbContent
            team={ResourceType.EcosystemActor}
            currentPage={pager.currentPage}
            totalPages={pager.totalPages}
            pagerProps={{
              hasNext: pager.hasNext,
              hasPrevious: pager.hasPrevious,
              onNext: pager.onNext,
              onPrevious: pager.onPrevious,
            }}
          />
        }
      />
      <TeamHeader team={actor} />

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
            lastUpdate={lastUpdate}
            ref={pagerRef}
          />

          <TabsContainer>
            <Tabs
              isDisablePopover={isDisablePopoverForMobile}
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
              <BudgetStatementActuals
                currentMonth={currentMonth}
                budgetStatements={actor?.budgetStatements}
                longCode={actor.code}
                shortCode={actor.shortCode}
                headline={headline}
                resource={ResourceType.EcosystemActor}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.FORECAST && (
              <BudgetStatementForecast
                currentMonth={currentMonth}
                budgetStatements={actor?.budgetStatements}
                longCode={actor.code}
                shortCode={actor.shortCode}
                headline={headline}
                resource={ResourceType.EcosystemActor}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.MKR_VESTING && (
              <BudgetStatementMkrVesting
                currentMonth={currentMonth}
                budgetStatements={actor?.budgetStatements}
                longCode={actor.code}
                shortCode={actor.shortCode}
                headline={headline}
                resource={ResourceType.EcosystemActor}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS && (
              <BudgetStatementTransferRequest
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
  );
};

export default EcosystemActorBudgetStatementView;

const PageSeparator = styled('div')(() => ({
  marginTop: 24,
}));

const TabsContainer = styled('div')(({ theme }) => ({
  margin: '32px 0 24px',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '24px 0',
  },
}));
