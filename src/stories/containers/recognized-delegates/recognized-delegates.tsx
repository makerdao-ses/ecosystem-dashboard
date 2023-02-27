import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/custom-link/custom-link';
import { CustomPager } from '@ses/components/custom-pager/custom-pager';
import DelegateSummary from '@ses/components/delegate-summary/delegate-summary';
import { SEOHead } from '@ses/components/seo-head/seo-head';
import { Tabs } from '@ses/components/tabs/tabs';
import { CommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { BudgetStatus } from '@ses/core/models/dto/core-unit.dto';
import { toAbsoluteURL } from '@ses/core/utils/url.utils';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import ExpenseReportStatusIndicator from '../transparency-report/common/expense-report-status-indicator/expense-report-status-indicator';
import AuditorCommentsContainer from '../transparency-report/transparency-auditor-comments/comment-container/auditor-comments-container';
import DelegatesActuals from './delegates-actuals/delegates-actuals';
import DelegatesForecast from './delegates-forecast/delegates-forecast';
import useRecognizedDelegates, { DELEGATES_IDS_ENUM } from './useRecognizedDelegates.mvvm';
import type { DelegatesDto } from '@ses/core/models/dto/delegates.dto';

type RecognizedDelegatesProps = {
  delegates: DelegatesDto;
};

const RecognizedDelegatesContainer: React.FC<RecognizedDelegatesProps> = ({ delegates }) => {
  const {
    isLight,
    links,
    itemsBreadcrumb,
    isMobile,
    lastUpdateForBudgetStatement,
    showExpenseReportStatusCTA,
    tabItems,
    tabsIndexNumber,
    tabsIndex,
    lastVisitHandler,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    comments,
  } = useRecognizedDelegates(delegates);

  return (
    <Wrapper>
      <Container isLight={isLight}>
        <SEOHead
          title={'MakerDAO Recognized Delegates Expense Reports | Finances'}
          description={
            'MakerDAO Recognized Delegates Expenses Reports provides a transparent overview of recognized delegates expenses, compensations, and benefits'
          }
          image={{
            src: toAbsoluteURL('/assets/img/social-385x200.png'),
            width: 385,
            height: 200,
          }}
          twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
        />
        <DelegateSummary links={links} items={itemsBreadcrumb} />
        <ContainerInside>
          <ContainerPagerBar>
            <PagerBar className="no-select" ref={null}>
              <PagerBarLeft>
                <StyledPagerBar
                  className="styledPagerBar"
                  label={currentMonth.toFormat('MMM yyyy').toUpperCase()}
                  onPrev={handlePreviousMonth}
                  onNext={handleNextMonth}
                  hasNext={hasNextMonth()}
                  hasPrevious={hasPreviousMonth()}
                />
                <ContainerExpense>
                  <ExpenseReportStatusIndicator
                    budgetStatus={currentBudgetStatement?.status || BudgetStatus.Draft}
                    showCTA={showExpenseReportStatusCTA}
                  />
                </ContainerExpense>
              </PagerBarLeft>

              <Spacer />
              {lastUpdateForBudgetStatement && (
                <LastUpdate>
                  <Since isLight={isLight}>Last Update</Since>
                  <SinceDate>{lastUpdateForBudgetStatement.setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}</SinceDate>
                </LastUpdate>
              )}
            </PagerBar>
          </ContainerPagerBar>
          <ContainerTabs>
            <Tabs
              items={tabItems}
              currentIndex={tabsIndexNumber}
              style={{
                margin: '32px 0',
              }}
            />
          </ContainerTabs>
          {tabsIndex === DELEGATES_IDS_ENUM.ACTUALS && <DelegatesActuals />}
          {tabsIndex === DELEGATES_IDS_ENUM.FORECAST && <DelegatesForecast />}
          {tabsIndex === DELEGATES_IDS_ENUM.COMMENTS && (
            <CommentActivityContext.Provider value={{ lastVisitHandler }}>
              <AuditorCommentsContainer
                budgetStatement={currentBudgetStatement}
                comments={comments}
                mode={'Delegates'}
              />
            </CommentActivityContext.Provider>
          )}

          <ContainerAdditionalNotes>
            <TitleNotes isLight={isLight}>Additional Notes</TitleNotes>
            <Description isLight={isLight}>
              The expenses on this page are for all Recognized Delegates that receive compensation. To view all
              delegates visit
              <span>
                <CustomLink
                  iconWidth={10}
                  iconHeight={10}
                  children={'vote.makerdao.com/delegates'}
                  href="https://vote.makerdao.com/delegates"
                  marginLeft="7px"
                />
              </span>
            </Description>
            <Description isLight={isLight}>
              MakerDAO forum reports for delegate can be found
              <SpacerDescription style={{ width: 1 }} />
              <CustomLink
                iconWidth={10}
                iconHeight={10}
                children={'here'}
                href="https://forum.makerdao.com/tag/compensation"
                marginLeft="7px"
                style={{
                  marginLeft: isMobile ? '0px' : '4px',
                }}
              />
            </Description>
          </ContainerAdditionalNotes>
        </ContainerInside>
      </Container>
    </Wrapper>
  );
};

export default RecognizedDelegatesContainer;
const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  alignItems: 'center',
  marginTop: '64px',
  flexDirection: 'column',
  width: '100%',
  flex: 1,
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingBottom: '128px',
}));
const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
});

const ContainerInside = styled.div({
  width: '343px',
  display: 'flex',
  margin: '0px auto',
  marginTop: 24,
  flexDirection: 'column',
  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: '770px',
    margin: '0px auto',
    marginTop: 37,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: '1130px',
    margin: '0px auto',
    marginTop: 32,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: '1184px',
    margin: '0px auto',
    marginTop: 32,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: '1312px',
    margin: '0px auto',
    marginTop: 32,
  },
});

const ContainerPagerBar = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: -3,
  },
});

const StyledPagerBar = styled(CustomPager)({
  '&.styledPagerBar': {
    'div:first-of-type': {
      gap: 24,
      [lightTheme.breakpoints.up('table_834')]: {
        gap: 8,
      },
    },
    '> div:last-of-type': {
      marginLeft: 8,
      letterSpacing: 0,
      [lightTheme.breakpoints.up('table_834')]: {
        letterSpacing: ' 0.4px',
      },
    },
  },
});

const PagerBar = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,
  marginTop: 2,
  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 2,
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

const Spacer = styled.div({
  flex: '1',
});

const LastUpdate = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  fontFamily: 'Inter, sans-serif',
  marginTop: -3,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
    marginRight: -2,
    marginLeft: 8,
  },
});

const Since = styled.div<{ isLight: boolean }>(({ isLight = true }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: '11px',
  lineHeight: '15px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '0px',
  textTransform: 'uppercase',
  '@media (min-width: 834px)': {
    fontSize: '12px',
    letterSpacing: '1px',
  },
}));

const SinceDate = styled.div({
  color: '#708390',
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  marginTop: '2px',
  textAlign: 'right',
  '@media (min-width: 834px)': {
    fontSize: '12px',
    marginTop: '4px',
    letterSpacing: '1px',
  },
});

const ContainerTabs = styled.div({
  'div:first-of-type > div:first-of-type > div': {
    paddingBottom: 8,
  },
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 2,
    'div:first-of-type > div:first-of-type > div': {
      paddingBottom: 14,
    },
  },
});

const ContainerExpense = styled.div({
  marginTop: -2,
  'div a': {
    marginLeft: 4,
    [lightTheme.breakpoints.up('table_834')]: {
      marginLeft: 8,
    },
  },
  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: -3,
  },
});

const ContainerAdditionalNotes = styled.div({
  marginTop: 40,
  marginBottom: 64,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Description = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  letterSpacing: 0,
  color: isLight ? '#231536' : '#d2d4ef',
  '> a': {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  '> span a': {
    fontSize: 14,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    '> a': {
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0,
    },
    '> span a': {
      fontSize: 16,
      lineHeight: '18px',
      letterSpacing: 0,
    },
  },
}));
const TitleNotes = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  display: 'flex',
  color: isLight ? '#231536' : '#d2d4ef',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    lineHeight: '24px',
  },
}));

const SpacerDescription = styled.div({
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'none',
  },
});
