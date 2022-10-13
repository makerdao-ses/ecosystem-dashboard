import React from 'react';
import styled from '@emotion/styled';
import { Tabs } from '../../components/tabs/tabs';
import { CustomPager } from '../../components/custom-pager/custom-pager';
import { CustomLink } from '../../components/custom-link/custom-link';
import { TransparencyActuals } from './transparency-actuals/transparency-actuals';
import { TransparencyForecast } from './transparency-forecast/transparency-forecast';
import { TransparencyMkrVesting } from './transparency-mkr-vesting/transparency-mkr-vesting';
import { TransparencyTransferRequest } from './transparency-transfer-request/transparency-transfer-request';
import { TransparencyAudit } from './transparency-audit/transparency-audit';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { getShortCode } from '../../../core/utils/string.utils';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SEOHead } from '../../components/seo-head/seo-head';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import lightTheme from '../../../../styles/theme/light';
import { TransparencyActuals2 } from './transparency-actuals/transparency-actuals-2';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { TransparencyForecast2 } from './transparency-forecast/transparency-forecast-2';
import { TransparencyMkrVesting2 } from './transparency-mkr-vesting/transparency-mkr-vesting-2';
import { TransparencyTransferRequest2 } from './transparency-transfer-request/transparency-transfer-request-2';
import { useTransparencyReportViewModel } from './transparency-report.mvvm';
import { TransparencyComments } from './transparency-comments/transparency-comments';

interface TransparencyReportProps {
  coreUnits: CoreUnitDto[];
  coreUnit: CoreUnitDto;
}

export const TransparencyReport = ({ coreUnits, coreUnit }: TransparencyReportProps) => {
  const isLight = useThemeContext().themeMode === 'light';
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
    comments,
    lastUpdateForBudgetStatement,
    numbersComments,
    longCode,
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
          <Title isLight={isLight} isTitleOfPage={false}>
            Expense Reports
          </Title>

          <Paragraph isLight={isLight}>
            Every month, the {getShortCode(code)} Core Unit submits a transparency report for MakerDAO governance with a
            detailed budget update. If the core unit works with an auditor, the transparency report is reviewed by the
            auditor before the core unit's operational wallet is topped up to replenish its runway.
            <p style={{ marginBottom: 0 }}>
              <span>Is this your core unit? Learn</span>
              <CustomLink
                fontWeight={500}
                href={HOW_TO_SUBMIT_EXPENSES}
                iconHeight={10}
                iconWidth={10}
                fontSize={16}
                fontSizeMobile={14}
                fontFamily={'Inter, sans-serif'}
              >
                how to submit your expenses here
              </CustomLink>
            </p>
          </Paragraph>

          <PagerBar className="no-select" ref={transparencyTableRef}>
            <PagerBarLeft>
              <CustomPager
                label={currentMonth.toFormat('MMM yyyy').toUpperCase()}
                onPrev={handlePreviousMonth}
                onNext={handleNextMonth}
                hasNext={hasNextMonth()}
                hasPrevious={hasPreviousMonth()}
              />
              {currentBudgetStatement?.publicationUrl?.trim() && (
                <CustomLink
                  href={currentBudgetStatement?.publicationUrl ?? null}
                  style={{
                    margin: '4px 16px 0',
                    lineHeight: '19px',
                  }}
                  iconHeight={10}
                  iconWidth={10}
                  fontSize={16}
                  fontFamily="Inter, sans-serif"
                >
                  Source
                </CustomLink>
              )}
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
            currentIndex={tabsIndex}
            style={{
              margin: '32px 0',
            }}
          />
          {tabsIndex === 0 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyActuals2
              code={code}
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              longCode={longCode}
            />
          )}
          {tabsIndex === 0 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyActuals
              code={code}
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              longCode={longCode}
            />
          )}
          {tabsIndex === 1 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyForecast2
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              code={code}
              longCode={longCode}
            />
          )}
          {tabsIndex === 1 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyForecast
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              longCode={longCode}
            />
          )}
          {tabsIndex === 2 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyMkrVesting2
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              code={code}
              longCode={longCode}
            />
          )}
          {tabsIndex === 2 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyMkrVesting
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              longCode={longCode}
            />
          )}
          {tabsIndex === 3 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyTransferRequest2
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              code={code}
              longCode={longCode}
            />
          )}
          {tabsIndex === 3 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyTransferRequest
              currentMonth={currentMonth}
              budgetStatements={coreUnit?.budgetStatements}
              longCode={longCode}
            />
          )}
          {tabsIndex === 4 && <TransparencyAudit budgetStatement={currentBudgetStatement} />}
          {tabsIndex === 5 && isEnabled('FEATURE_TRANSPARENCY_COMMENTS') && (
            <TransparencyComments
              numberComments={numbersComments}
              comments={comments}
              code={code}
              currentMonth={currentMonth}
            />
          )}
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
  padding: '0 16px 128px',
  '@media (min-width: 834px)': {
    padding: '0 32px 128px',
  },
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const InnerPage = styled.div({
  display: 'block',
  margin: '32px auto 0',
  width: '100%',
  maxWidth: '1184px',
  textAlign: 'left',
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
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: '64px',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '22px',
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
  alignItems: 'center',
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
