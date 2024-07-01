import { styled } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { ModalCategoriesProvider } from '@ses/core/context/CategoryModalContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import AccountsSnapshotTabContainer from '@/components/AccountsSnapshot/AccountsSnapshotTabContainer';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import TeamBreadcrumbContent from '@/components/Breadcrumb/CustomContents/TeamBreadcrumbContent';
import BudgetStatementPager from '@/components/BudgetStatement/BudgetStatementPager/BudgetStatementPager';
import Container from '@/components/Container/Container';
import PageContainer from '@/components/Container/PageContainer';
import Tabs from '@/components/Tabs/Tabs';
import TeamHeader from '@/components/TeamHeader/TeamHeader';
import type { Team } from '@/core/models/interfaces/team';
import { CommentActivityContext } from '../../core/context/CommentActivityContext';
import { toAbsoluteURL } from '../../core/utils/urls';
import { CustomLink } from '../../stories/components/CustomLink/CustomLink';
import { SEOHead } from '../../stories/components/SEOHead/SEOHead';
import CuHeadlineText from './components/CuHeadlineText/CuHeadlineText';
import ExpenseReport from './components/ExpenseReport/ExpenseReport';
import { TransparencyActuals } from './components/TransparencyActuals/TransparencyActuals';
import { TransparencyAudit } from './components/TransparencyAudit/TransparencyAudit';
import AuditorCommentsContainer from './components/TransparencyAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import { TransparencyForecast } from './components/TransparencyForecast/TransparencyForecast';
import { TransparencyMkrVesting } from './components/TransparencyMkrVesting/TransparencyMkrVesting';
import { TransparencyTransferRequest } from './components/TransparencyTransferRequest/TransparencyTransferRequest';
import { TRANSPARENCY_IDS_ENUM, useCoreUnitBudgetStatementView } from './useCoreUnitBudgetStatementView';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CoreUnitBudgetStatementViewProps {
  coreUnits: CoreUnit[];
  coreUnit: CoreUnit;
  expenseCategories: ExpenseCategory[];
  snapshotLimitPeriods?: SnapshotLimitPeriods;
}
export type TableItems = {
  item: string | JSX.Element;
  id: string;
};

const CoreUnitBudgetStatementView = ({
  coreUnits,
  coreUnit,
  expenseCategories,
  snapshotLimitPeriods,
}: CoreUnitBudgetStatementViewProps) => {
  const {
    isEnabled,
    tabItems,
    code,
    longCode,
    pagerRef,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    hasNextMonth,
    hasPreviousMonth,
    currentBudgetStatement,
    tabsIndex,
    lastUpdate,
    comments,
    showExpenseReportStatusCTA,
    lastVisitHandler,
    onTabsInit,
    onTabChange,
    onTabsExpand,
    compressedTabItems,
    setSnapshotCreated,
    pager,
  } = useCoreUnitBudgetStatementView(coreUnit, coreUnits, snapshotLimitPeriods);

  const headline = <CuHeadlineText cuLongCode={longCode} />;
  return (
    <PageContainer>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Finances`}
        description={`Learn about the ${coreUnit.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
        image={coreUnit.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={coreUnit.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.coreUnitReports(coreUnit.shortCode)}
      />

      <Breadcrumb
        items={[
          {
            label: 'Contributors',
            href: siteRoutes.contributors,
          },
          {
            label: 'Core Units',
            href: siteRoutes.coreUnitsOverview,
            number: coreUnits.length,
          },
          {
            label: coreUnit.name,
            href: siteRoutes.coreUnitAbout(coreUnit.shortCode),
          },
          {
            label: 'Budget Statements',
            href: '#',
          },
        ]}
        rightContent={
          <TeamBreadcrumbContent
            team={ResourceType.CoreUnit}
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
      <TeamHeader team={coreUnit as unknown as Team} />

      <PageSeparator>
        <Container>
          <BudgetStatementPager
            currentMonth={currentMonth}
            handleNext={handleNextMonth}
            handlePrevious={handlePreviousMonth}
            hasNext={hasNextMonth()}
            hasPrevious={hasPreviousMonth()}
            budgetStatus={currentBudgetStatement?.status}
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
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
                shortCode={coreUnit.shortCode}
                headline={headline}
                resource={ResourceType.CoreUnit}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.FORECAST && (
              <TransparencyForecast
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
                shortCode={coreUnit.shortCode}
                headline={headline}
                resource={ResourceType.CoreUnit}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.MKR_VESTING && (
              <TransparencyMkrVesting
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
                shortCode={coreUnit.shortCode}
                headline={headline}
                resource={ResourceType.CoreUnit}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS && (
              <TransparencyTransferRequest
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
                shortCode={coreUnit.shortCode}
                headline={headline}
                resource={ResourceType.CoreUnit}
              />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS && isEnabled('FEATURE_AUDIT_REPORTS') && (
              <TransparencyAudit budgetStatement={currentBudgetStatement} />
            )}
            {tabsIndex === TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS && (
              <AccountsSnapshotTabContainer
                snapshotOwner={`${code} Core Unit`}
                currentMonth={currentMonth}
                ownerId={coreUnit.id}
                longCode={coreUnit.code}
                shortCode={coreUnit.shortCode}
                resource={ResourceType.CoreUnit}
                setSnapshotCreated={setSnapshotCreated}
              />
            )}

            {tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS && (
              <CommentActivityContext.Provider value={{ lastVisitHandler }}>
                <AuditorCommentsContainer
                  budgetStatement={currentBudgetStatement}
                  comments={comments}
                  resource={ResourceType.CoreUnit}
                />
              </CommentActivityContext.Provider>
            )}
          </Container>

          {tabsIndex === TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT && (
            <ExpenseReport
              code={coreUnit.shortCode}
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              longCode={longCode}
              resource={ResourceType.CoreUnit}
            />
          )}

          <Container>
            <AdditionalNotesSection>
              <Title isTitleOfPage={false}>Additional Notes</Title>

              <Paragraph>
                {coreUnit.auditors.length === 0 ? (
                  <div>
                    Every month, the {coreUnit.shortCode} Core Unit submits an Expense Report to MakerDAO governance
                    with a detailed budget update. The Core Unit works <b>without auditor</b>, submitting its reports
                    directly to the community.
                  </div>
                ) : (
                  <div>
                    Every month, the {coreUnit.shortCode} Core Unit submits an Expense Report to MakerDAO governance
                    with a detailed budget update. The Core Unit's reports are reviewed{' '}
                    <b>
                      by auditor(s){' '}
                      {coreUnit.auditors.map((auditor, index, array) => (
                        <span key={auditor.id}>
                          <b>{auditor.username}</b>
                          {array.length > 1 && index !== array.length - 1
                            ? index !== array.length - 2
                              ? ', '
                              : ', and '
                            : ''}
                        </span>
                      ))}{' '}
                    </b>
                    before they are marked as final.
                  </div>
                )}

                {coreUnit.legacyBudgetStatementUrl && (
                  <LegacyReportParagraph>
                    <span>Legacy expense reports can be found</span>
                    <CustomLink
                      fontWeight={500}
                      href={coreUnit.legacyBudgetStatementUrl}
                      iconHeight={10}
                      iconWidth={10}
                      fontSize={16}
                      fontSizeMobile={14}
                      fontFamily={'Inter, sans-serif'}
                    >
                      here
                    </CustomLink>
                  </LegacyReportParagraph>
                )}
              </Paragraph>
            </AdditionalNotesSection>
          </Container>
        </ModalCategoriesProvider>
      </PageSeparator>
    </PageContainer>
  );
};

export default CoreUnitBudgetStatementView;

const PageSeparator = styled('div')(() => ({
  marginTop: 24,
}));

export const Title = styled('div')<{
  marginBottom?: number;

  fontSize?: string;
  responsiveMarginBottom?: number;
  isTitleOfPage?: boolean;
}>(({ marginBottom = 16, fontSize = '16px', theme, responsiveMarginBottom, isTitleOfPage = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: isTitleOfPage ? 500 : 600,
  fontStyle: 'normal',
  fontSize,
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
  marginBottom: `${marginBottom}px`,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },

  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    marginTop: '32px',
    fontWeight: 700,
  },
}));

const Paragraph = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '16px',
  },
}));

const TabsContainer = styled('div')(({ theme }) => ({
  margin: '32px 0 24px',

  [theme.breakpoints.up('tablet_768')]: {
    margin: '24px 0',
  },
}));

export const TableWrapper = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
  },
}));

export const CardsWrapper = styled('div')(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

export const ParenthesisNumber = styled('label')({
  cursor: 'pointer',

  '> span': {
    fontWeight: 'bold',
    marginLeft: '5px',
  },
});

const AdditionalNotesSection = styled('div')(({ theme }) => ({
  paddingBottom: 0,

  [theme.breakpoints.up('tablet_768')]: {
    paddingBottom: 0,
  },
}));

const LegacyReportParagraph = styled('div')({
  marginTop: 16,
  marginBottom: 0,
});
