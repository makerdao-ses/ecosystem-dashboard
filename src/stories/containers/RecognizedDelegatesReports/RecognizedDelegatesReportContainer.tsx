import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/CustomLink/CustomLink';
import { CustomPager } from '@ses/components/CustomPager/CustomPager';
import DelegateSummary from '@ses/components/DelegateSummary/DelegateSummary';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import Tabs from '@ses/components/Tabs/Tabs';
import { siteRoutes } from '@ses/config/routes';
import { CommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { ResourceType } from '@ses/core/models/interfaces/types';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import React, { useRef } from 'react';
import ExpenseReportStatusIndicator from '../TransparencyReport/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import AuditorCommentsContainer from '../TransparencyReport/components/TransparencyAuditorComments/AuditorCommentsContainer/AuditorCommentsContainer';
import DelegatesActuals from './DelegatesActuals/DelegatesActuals';
import DelegatesForecast from './DelegatesForecast/DelegatesForecast';
import useRecognizedDelegatesReport, { DELEGATES_REPORT_IDS_ENUM } from './useRecognizedDelegatesReport';
import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';

type RecognizedDelegatesProps = {
  delegates: DelegatesDto;
};

const RecognizedDelegatesReportContainer: React.FC<RecognizedDelegatesProps> = ({ delegates }) => {
  const {
    isLight,
    links,
    itemsBreadcrumb,
    isMobile,
    lastUpdateForBudgetStatement,
    showExpenseReportStatusCTA,
    tabItems,
    lastVisitHandler,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    allBudgetStatement,
    comments,
    selectedTab,
    onTabChange,
    code,
  } = useRecognizedDelegatesReport(delegates);
  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, code);

  return (
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
        canonicalURL={siteRoutes.recognizedDelegateReport}
      />
      <DelegateSummary links={links} items={itemsBreadcrumb} ref={ref} showHeader={showHeader} />
      <ContainerInside marginTop={height}>
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
          <Tabs tabs={tabItems} onChange={onTabChange} tabQuery={'section'} />
        </ContainerTabs>

        {selectedTab === DELEGATES_REPORT_IDS_ENUM.ACTUALS && (
          <DelegatesActuals budgetStatement={allBudgetStatement} currentMonth={currentMonth} />
        )}
        {selectedTab === DELEGATES_REPORT_IDS_ENUM.FORECAST && (
          <DelegatesForecast budgetStatement={allBudgetStatement} currentMonth={currentMonth} />
        )}
        {selectedTab === DELEGATES_REPORT_IDS_ENUM.COMMENTS && (
          <CommentActivityContext.Provider value={{ lastVisitHandler }}>
            <AuditorCommentsContainer
              budgetStatement={currentBudgetStatement}
              comments={comments}
              resource={ResourceType.Delegates}
            />
          </CommentActivityContext.Provider>
        )}

        <ContainerAdditionalNotes>
          <TitleNotes isLight={isLight}>Additional Notes</TitleNotes>
          <Description isLight={isLight}>
            The expenses on this page are for all Recognized Delegates that receive compensation. To view all delegates
            visit
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
  );
};

export default RecognizedDelegatesReportContainer;

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  paddingTop: 64,
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

const ContainerInside = styled.div<{ marginTop: number }>(({ marginTop }) => ({
  display: 'block',
  textAlign: 'left',
  width: '100%',
  maxWidth: '1440px',
  marginBottom: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 22 + marginTop,
  paddingRight: '64px',
  paddingLeft: '64px',
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 45 + marginTop,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 40 + marginTop,
  },

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

  [lightTheme.breakpoints.down('table_834')]: {
    paddingRight: '16px',
    paddingLeft: '16px',
  },
}));

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
    height: '34px',
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
  margin: '32px 0',

  '& > div > div > a': {
    paddingBottom: 8,

    [lightTheme.breakpoints.up('table_834')]: {
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
