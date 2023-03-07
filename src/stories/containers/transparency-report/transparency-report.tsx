import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { CommentActivityContext } from '../../../core/context/CommentActivityContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { BudgetStatus } from '../../../core/models/dto/core-unit.dto';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import { CoreUnitSummary } from '../../components/CoreUnitSummary/CoreUnitSummary';
import { CustomLink } from '../../components/custom-link/custom-link';
import { CustomPager } from '../../components/custom-pager/custom-pager';
import { SEOHead } from '../../components/seo-head/seo-head';
import { Tabs } from '../../components/tabs/tabs';
import ExpenseReportStatusIndicator from './common/expense-report-status-indicator/expense-report-status-indicator';
import { TransparencyActuals } from './transparency-actuals/transparency-actuals';
import { TransparencyActuals2 } from './transparency-actuals/transparency-actuals-2';
import { TransparencyAudit } from './transparency-audit/transparency-audit';
import AuditorCommentsContainer from './transparency-auditor-comments/comment-container/auditor-comments-container';
import { TransparencyForecast } from './transparency-forecast/transparency-forecast';
import { TransparencyForecast2 } from './transparency-forecast/transparency-forecast-2';
import { TransparencyMkrVesting } from './transparency-mkr-vesting/transparency-mkr-vesting';
import { TransparencyMkrVesting2 } from './transparency-mkr-vesting/transparency-mkr-vesting-2';
import { TRANSPARENCY_IDS_ENUM, useTransparencyReportViewModel } from './transparency-report.mvvm';
import { TransparencyTransferRequest } from './transparency-transfer-request/transparency-transfer-request';
import { TransparencyTransferRequest2 } from './transparency-transfer-request/transparency-transfer-request-2';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

interface TransparencyReportProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
}
export type TableItems = {
  item: string | JSX.Element;
  id: string;
};

export const TransparencyReport = ({ coreUnits, coreUnit }: TransparencyReportProps) => {
  const { isLight } = useThemeContext();
  const [isEnabled] = useFlagsActive();
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
    tabsIndexNumber,
    lastUpdateForBudgetStatement,
    longCode,
    comments,
    showExpenseReportStatusCTA,
    lastVisitHandler,
  } = useTransparencyReportViewModel(coreUnit);

  return (
    <Wrapper>
      <SEOHead
        title={`${coreUnit.name} Core Unit | Finances`}
        description={`Learn about the ${coreUnit.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
        image={coreUnit.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={coreUnit.image ? 'summary' : 'summary_large_image'}
      />
      <CoreUnitSummary coreUnits={coreUnits} trailingAddress={['Expense Reports']} breadcrumbTitle="Expense Reports" />
      <Container isLight={isLight}>
        <InnerPage>
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

          <Tabs
            items={tabItems}
            currentIndex={tabsIndexNumber}
            style={{
              margin: '32px 0',
            }}
          />
          {tabsIndex === TRANSPARENCY_IDS_ENUM.ACTUALS &&
            (isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') ? (
              <TransparencyActuals2
                code={code}
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
              />
            ) : (
              <TransparencyActuals
                code={code}
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
              />
            ))}
          {tabsIndex === TRANSPARENCY_IDS_ENUM.FORECAST &&
            (isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') ? (
              <TransparencyForecast2
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                code={code}
                longCode={longCode}
              />
            ) : (
              <TransparencyForecast
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
              />
            ))}
          {tabsIndex === TRANSPARENCY_IDS_ENUM.MKR_VESTING &&
            isEnabled('FEATURE_MKR_VESTING') &&
            (isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') ? (
              <TransparencyMkrVesting2
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                code={code}
                longCode={longCode}
              />
            ) : (
              <TransparencyMkrVesting
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
              />
            ))}
          {tabsIndex === TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS &&
            (isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') ? (
              <TransparencyTransferRequest2
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                code={code}
                longCode={longCode}
              />
            ) : (
              <TransparencyTransferRequest
                currentMonth={currentMonth}
                budgetStatements={coreUnit?.budgetStatements}
                longCode={longCode}
              />
            ))}
          {tabsIndex === TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS && isEnabled('FEATURE_AUDIT_REPORTS') && (
            <TransparencyAudit budgetStatement={currentBudgetStatement} />
          )}

          {tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS && isEnabled('FEATURE_TRANSPARENCY_COMMENTS') && (
            <CommentActivityContext.Provider value={{ lastVisitHandler }}>
              <AuditorCommentsContainer budgetStatement={currentBudgetStatement} comments={comments} />
            </CommentActivityContext.Provider>
          )}

          <AdditionalNotesSection>
            <Title isLight={isLight} isTitleOfPage={false}>
              Additional Notes
            </Title>

            <Paragraph isLight={isLight}>
              {coreUnit.auditors.length === 0 ? (
                <div>
                  Every month, the {coreUnit.shortCode} Core Unit submits an Expense Report to MakerDAO governance with
                  a detailed budget update. The Core Unit works <b>without auditor</b>, submitting its reports directly
                  to the community.
                </div>
              ) : (
                <div>
                  Every month, the {coreUnit.shortCode} Core Unit submits an Expense Report to MakerDAO governance with
                  a detailed budget update. The Core Unit's reports are reviewed{' '}
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
        </InnerPage>
      </Container>
    </Wrapper>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  paddingBottom: '128px',
  flex: 1,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const InnerPage = styled.div({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  margin: '0 auto',
  paddingRight: '64px',
  paddingLeft: '64px',

  [lightTheme.breakpoints.up('desktop_1920')]: {
    maxWidth: '1312px',
    paddingRight: '0px',
    paddingLeft: '0px',
  },
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingRight: '48px',
    paddingLeft: '48px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1280')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    paddingTop: 32,
  },
  [lightTheme.breakpoints.down('table_834')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
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
    marginTop: '40px',
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
  paddingBottom: 113,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingBottom: 0,
  },
});

const LegacyReportParagraph = styled.div({
  marginTop: 16,
  marginBottom: 0,
});
