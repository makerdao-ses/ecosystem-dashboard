import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import Tabs from '@ses/components/Tabs/Tabs';
import { siteRoutes } from '@ses/config/routes';
import { ModalCategoriesProvider } from '@ses/core/context/CategoryModalContext';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { CommentActivityContext } from '../../../core/context/CommentActivityContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { BudgetStatus } from '../../../core/models/dto/coreUnitDTO';
import { toAbsoluteURL } from '../../../core/utils/urls';
import { CoreUnitSummary } from '../../components/CoreUnitSummary/CoreUnitSummary';
import { CustomLink } from '../../components/CustomLink/CustomLink';
import { CustomPager } from '../../components/CustomPager/CustomPager';
import { SEOHead } from '../../components/SEOHead/SEOHead';
import AccountsSnapshotTabContainer from './components/AccountsSnapshot/AccountsSnapshotTabContainer';
import ExpenseReport from './components/ExpenseReport/ExpenseReport';
import ExpenseReportStatusIndicator from './components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import { TransparencyActuals } from './components/TransparencyActuals/TransparencyActuals';

import { TransparencyAudit } from './components/TransparencyAudit/TransparencyAudit';
import AuditorCommentsContainer from './components/TransparencyAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import { TransparencyForecast } from './components/TransparencyForecast/TransparencyForecast';
import { TransparencyMkrVesting } from './components/TransparencyMkrVesting/TransparencyMkrVesting';
import { TransparencyTransferRequest } from './components/TransparencyTransferRequest/TransparencyTransferRequest';
import { TRANSPARENCY_IDS_ENUM, useTransparencyReport } from './useTransparencyReport';
import type { CoreUnitDto } from '../../../core/models/dto/coreUnitDTO';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';

interface TransparencyReportProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
  expenseCategories: ExpenseCategory[];
}
export type TableItems = {
  item: string | JSX.Element;
  id: string;
};

export const TransparencyReport = ({ coreUnits, coreUnit, expenseCategories }: TransparencyReportProps) => {
  const { isLight } = useThemeContext();
  const {
    tabItems,
    code,
    transparencyTableRef,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    hasNextMonth,
    hasPreviousMonth,
    currentBudgetStatement,
    tabsIndex,
    lastUpdateForBudgetStatement,
    longCode,
    comments,
    showExpenseReportStatusCTA,
    lastVisitHandler,
    onTabsInit,
    onTabChange,
    onTabsExpand,
    compressedTabItems,
  } = useTransparencyReport(coreUnit);
  const [isEnabled] = useFlagsActive();

  return (
    <Wrapper>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Finances`}
        description={`Learn about the ${coreUnit.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
        image={coreUnit.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={coreUnit.image ? 'summary' : 'summary_large_image'}
        canonicalURL={siteRoutes.coreUnitReports(coreUnit.shortCode)}
      />
      <CoreUnitSummary coreUnits={coreUnits} trailingAddress={['Expense Reports']} breadcrumbTitle="Expense Reports" />
      <PageContainer hasImageBackground={true}>
        <PageSeparator>
          <Container>
            <PagerBar className="no-select" ref={transparencyTableRef}>
              <PagerBarLeft>
                <CustomPager
                  label={currentMonth.toFormat('MMM yyyy').toUpperCase()}
                  onPrev={handlePreviousMonth}
                  onNext={handleNextMonth}
                  hasNext={hasNextMonth()}
                  hasPrevious={hasPreviousMonth()}
                />
                <ExpenseReportStatusIndicator
                  budgetStatus={currentBudgetStatement?.status || BudgetStatus.Draft}
                  showCTA={showExpenseReportStatusCTA}
                />
              </PagerBarLeft>

              <Spacer />
              {lastUpdateForBudgetStatement && (
                <LastUpdate>
                  <Since isLight={isLight}>Last Update</Since>
                  <SinceDate>{lastUpdateForBudgetStatement.setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}</SinceDate>
                </LastUpdate>
              )}
            </PagerBar>

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
                  code={code}
                  currentMonth={currentMonth}
                  budgetStatements={coreUnit?.budgetStatements}
                  longCode={longCode}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.FORECAST && (
                <TransparencyForecast
                  currentMonth={currentMonth}
                  budgetStatements={coreUnit?.budgetStatements}
                  code={code}
                  longCode={longCode}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.MKR_VESTING && (
                <TransparencyMkrVesting
                  currentMonth={currentMonth}
                  budgetStatements={coreUnit?.budgetStatements}
                  code={code}
                  longCode={longCode}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS && (
                <TransparencyTransferRequest
                  currentMonth={currentMonth}
                  budgetStatements={coreUnit?.budgetStatements}
                  code={code}
                  longCode={longCode}
                />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS && isEnabled('FEATURE_AUDIT_REPORTS') && (
                <TransparencyAudit budgetStatement={currentBudgetStatement} />
              )}
              {tabsIndex === TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS && isEnabled('FEATURE_ACCOUNTS_SNAPSHOT') && (
                <AccountsSnapshotTabContainer
                  snapshotOwner={`${code} Core Unit`}
                  currentMonth={currentMonth}
                  ownerId={coreUnit.id}
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
                code={code}
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
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

const PageSeparator = styled.div({
  marginTop: 32,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 32,
    marginTop: 0,
  },
});

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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
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

const PagerBar = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,
  '@media (min-width: 834px)': {
    alignItems: 'center',
    height: '34px',
  },
});

const PagerBarLeft = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const LastUpdate = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  fontFamily: 'Inter, sans-serif',
});

const Since = styled.div<{ isLight: boolean }>(({ isLight = true }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: '11px',
  lineHeight: '15px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  '@media (min-width: 834px)': {
    fontSize: '12px',
  },
}));

const SinceDate = styled.div({
  color: '#708390',
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  marginTop: '2px',
  textAlign: 'right',
  '@media (min-width: 834px)': {
    fontSize: '12px',
    marginTop: '4px',
  },
});

const Spacer = styled.div({
  flex: '1',
});

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
