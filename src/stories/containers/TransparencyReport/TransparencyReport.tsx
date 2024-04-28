import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import Tabs from '@ses/components/Tabs/Tabs';
import BudgetStatementPager from '@ses/components/TransparencyReporting/BudgetStatementPager/BudgetStatementPager';
import { siteRoutes } from '@ses/config/routes';
import { ModalCategoriesProvider } from '@ses/core/context/CategoryModalContext';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { ResourceType } from '@ses/core/models/interfaces/types';
import React, { useRef } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { CommentActivityContext } from '../../../core/context/CommentActivityContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { toAbsoluteURL } from '../../../core/utils/urls';
import { CoreUnitSummary } from '../../components/CoreUnitSummary/CoreUnitSummary';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { SEOHead } from '../../components/SEOHead/SEOHead';
import AccountsSnapshotTabContainer from './components/AccountsSnapshot/AccountsSnapshotTabContainer';
import CuHeadlineText from './components/CuHeadlineText/CuHeadlineText';
import ExpenseReport from './components/ExpenseReport/ExpenseReport';
import { TransparencyActuals } from './components/TransparencyActuals/TransparencyActuals';
import { TransparencyAudit } from './components/TransparencyAudit/TransparencyAudit';
import AuditorCommentsContainer from './components/TransparencyAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import { TransparencyForecast } from './components/TransparencyForecast/TransparencyForecast';
import { TransparencyMkrVesting } from './components/TransparencyMkrVesting/TransparencyMkrVesting';
import { TransparencyTransferRequest } from './components/TransparencyTransferRequest/TransparencyTransferRequest';
import { TRANSPARENCY_IDS_ENUM, useTransparencyReport } from './useTransparencyReport';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface TransparencyReportProps {
  coreUnits: CoreUnit[];
  coreUnit: CoreUnit;
  expenseCategories: ExpenseCategory[];
  snapshotLimitPeriods?: SnapshotLimitPeriods;
}
export type TableItems = {
  item: string | JSX.Element;
  id: string;
};

export const TransparencyReport = ({
  coreUnits,
  coreUnit,
  expenseCategories,
  snapshotLimitPeriods,
}: TransparencyReportProps) => {
  const { isLight } = useThemeContext();
  const {
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
  } = useTransparencyReport(coreUnit, snapshotLimitPeriods);
  const [isEnabled] = useFlagsActive();
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, code);
  const headline = <CuHeadlineText cuLongCode={longCode} />;

  return (
    <Wrapper>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Finances`}
        description={`Learn about the ${coreUnit.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
        image={coreUnit.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={coreUnit.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.coreUnitReports(coreUnit.shortCode)}
      />
      <CoreUnitSummary
        coreUnits={coreUnits}
        trailingAddress={['Expense Reports']}
        breadcrumbTitle="Expense Reports"
        showHeader={showHeader}
        ref={ref}
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
                <Title isLight={isLight} isTitleOfPage={false}>
                  Additional Notes
                </Title>

                <Paragraph isLight={isLight}>
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
    </Wrapper>
  );
};

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

export const Title = styled.div<{
  marginBottom?: number;
  isLight: boolean;
  fontSize?: string;
  responsiveMarginBottom?: number;
  isTitleOfPage?: boolean;
}>(({ marginBottom = 16, fontSize = '16px', isLight, responsiveMarginBottom, isTitleOfPage = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: isTitleOfPage ? 500 : 600,
  fontStyle: 'normal',
  fontSize,
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: `${marginBottom}px`,
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    marginTop: '32px',
    fontWeight: 700,
  },
}));

const Paragraph = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',

  '@media (min-width: 834px)': {
    fontSize: '16px',
  },
}));

const TabsContainer = styled.div({
  margin: '32px 0 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    margin: '32px 0',
  },
});

export const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block',
  },
});

export const CardsWrapper = styled.div({
  display: 'block',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

export const ParenthesisNumber = styled.label({
  cursor: 'pointer',
  '> span': {
    fontWeight: 'bold',
    marginLeft: '5px',
  },
});

const AdditionalNotesSection = styled.div({
  paddingBottom: 0,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingBottom: 0,
  },
});

const LegacyReportParagraph = styled.div({
  marginTop: 16,
  marginBottom: 0,
});
