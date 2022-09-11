import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { Tabs } from '../../components/tabs/tabs';
import { CustomPager } from '../../components/custom-pager/custom-pager';
import { CustomLink } from '../../components/custom-link/custom-link';
import { TransparencyActuals } from './transparency-actuals/transparency-actuals';
import { TransparencyForecast } from './transparency-forecast/transparency-forecast';
import { TransparencyMkrVesting } from './transparency-mkr-vesting/transparency-mkr-vesting';
import { TransparencyTransferRequest } from './transparency-transfer-request/transparency-transfer-request';
import { TransparencyAudit } from './transparency-audit/transparency-audit';
import { useRouter } from 'next/router';
import { DateTime } from 'luxon';
import {
  BudgetStatementDto,
  CoreUnitDto,
} from '../../../core/models/dto/core-unit.dto';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { API_MONTH_FORMAT } from '../../../core/utils/date.utils';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { formatCode } from '../../../core/utils/string.utils';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SEOHead } from '../../components/seo-head/seo-head';
import { useUrlAnchor } from '../../../core/hooks/useUrlAnchor';
import {
  getCurrentOrLastMonthWithData,
  getLastMonthWithActualOrForecast,
} from '../../../core/business-logic/core-units';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import lightTheme from '../../../../styles/theme/light';
import { SummarizedCoreUnit } from '../../components/core-unit-summary/core-unit-summary.mvvm';
import { TransparencyActuals2 } from './transparency-actuals/transparency-actuals-2';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { TransparencyForecast2 } from './transparency-forecast/transparency-forecast-2';
import { TransparencyMkrVesting2 } from './transparency-mkr-vesting/transparency-mkr-vesting-2';

const colors: { [key: string]: string } = {
  Draft: '#7C6B95',
  Final: '#1AAB9B',
  AwaitingCorrections: '#FDC134',
  SubmittedToAuditor: '#FF78F2',
};

const colorsDarkColors: { [key: string]: string } = {
  Draft: '#9055AF',
  Final: '#2DC1B1',
  AwaitingCorrections: '#FDC134',
  SubmittedToAuditor: '#FF78F2',
};

const TRANSPARENCY_IDS = [
  'actuals',
  'forecast',
  'mkr-vesting',
  'transfer-requests',
  'audit-reports',
];

interface TransparencyReportProps {
  coreUnits: SummarizedCoreUnit[];
  coreUnit: CoreUnitDto;
}

export const TransparencyReport = ({
  coreUnits,
  coreUnit: cu,
}: TransparencyReportProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [isEnabled] = useFlagsActive();

  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const viewMonthStr = query.viewMonth;
  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);

  const [tabsIndex, setTabsIndex] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());

  useEffect(() => {
    if (anchor) {
      const index = TRANSPARENCY_IDS.findIndex((id) => anchor.indexOf(id) > -1);
      setTabsIndex(index);
    }
  }, [anchor]);

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (anchor === '') {
      setScrolled(true);
    }
    if (!scrolled && anchor && TRANSPARENCY_IDS.includes(anchor)) {
      setScrolled(true);
      let offset = (transparencyTableRef?.current?.offsetTop || 0) - 280;
      const windowsWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      if (windowsWidth < 834) {
        offset += 100;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor]);

  useEffect(() => {
    if (viewMonthStr) {
      const month = DateTime.fromFormat(viewMonthStr as string, 'LLLyyyy');
      setCurrentMonth(month);
    } else {
      const month = getCurrentOrLastMonthWithData(cu.budgetStatements);

      if (month) {
        setCurrentMonth(month);
      }
    }
  }, [router.route, router.query]);

  const replaceViewMonthRoute = (viewMonth: string) => {
    router.replace(
      {
        hash: anchor,
        query: {
          ...router.query,
          viewMonth,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handlePreviousMonth = useCallback(() => {
    const month = currentMonth.minus({ month: 1 });
    replaceViewMonthRoute(month.toFormat('LLLyyyy'));
    setCurrentMonth(month);
  }, [setCurrentMonth, currentMonth]);

  const hasNextMonth = () => {
    const limit = getLastMonthWithActualOrForecast(cu.budgetStatements).plus({
      month: 1,
    });
    return currentMonth.startOf('month') < limit.startOf('month');
  };

  const handleNextMonth = useCallback(() => {
    if (hasNextMonth()) {
      const month = currentMonth.plus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [setCurrentMonth, currentMonth]);

  const currentBudgetStatement = useMemo(() => {
    return cu?.budgetStatements?.find(
      (bs: BudgetStatementDto) =>
        bs.month === currentMonth.toFormat(API_MONTH_FORMAT)
    );
  }, [cu, currentMonth]);

  return (
    <Wrapper>
      <SEOHead
        title={`${cu.name} Core Unit | Finances`}
        description={`Learn about the ${cu.name} Core Unit at MakerDAO: their finances, expense reports, and more.`}
        image={cu.image || toAbsoluteURL('/assets/img/social-1200x630.png')}
        twitterCard={cu.image ? 'summary' : 'summary_large_image'}
      />
      <CoreUnitSummary
        coreUnits={coreUnits}
        trailingAddress={['Expense Reports']}
        breadcrumbTitle="Expense Reports"
      />
      <Container isLight={isLight}>
        <InnerPage>
          <Title isLight={isLight}>Expense Reports</Title>

          <Paragraph isLight={isLight}>
            Every month, the {formatCode(code)} Core Unit submits a transparency
            report for MakerDAO governance with a detailed budget update. If the
            core unit works with an auditor, the transparency report is reviewed
            by the auditor before the core unit's operational wallet is topped
            up to replenish its runway.
            <p style={{ marginBottom: 0 }}>
              <span>Is this your core unit? Learn</span>
              <CustomLink
                href={HOW_TO_SUBMIT_EXPENSES}
                iconHeight={10}
                iconWidth={10}
                fontSize={16}
                fontSizeMobile={14}
                fontFamily={'SF Pro Display, sans-serif'}
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
                  fontFamily={'SF Pro Display, sans-serif'}
                >
                  Source
                </CustomLink>
              )}
            </PagerBarLeft>
            <Spacer />
            <StatusBar>
              <StatusTitle isLight={isLight}>Status</StatusTitle>
              <StatusValue
                color={
                  isLight
                    ? colors[currentBudgetStatement?.budgetStatus ?? '']
                    : colorsDarkColors[
                      currentBudgetStatement?.budgetStatus ?? ''
                    ]
                }
              >
                {currentBudgetStatement?.budgetStatus ?? '-'}
              </StatusValue>
            </StatusBar>
          </PagerBar>

          <Tabs
            items={[
              {
                item: 'Actuals',
                id: TRANSPARENCY_IDS[0],
              },
              {
                item: 'Forecast',
                id: TRANSPARENCY_IDS[1],
              },
              {
                item: 'MKR Vesting',
                id: TRANSPARENCY_IDS[2],
              },
              {
                item: 'Transfer Requests',
                id: TRANSPARENCY_IDS[3],
              },
              {
                item: 'Audit Reports',
                id: TRANSPARENCY_IDS[4],
              },
            ]}
            currentIndex={tabsIndex}
            style={{
              margin: '32px 0',
            }}
          />
          {tabsIndex === 0 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyActuals2
              code={code}
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 0 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyActuals
              code={code}
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 1 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyForecast2
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 1 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyForecast
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 2 && isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyMkrVesting2
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 2 && !isEnabled('FEATURE_TRANSPARENCY_NEW_TABLE') && (
            <TransparencyMkrVesting
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 3 && (
            <TransparencyTransferRequest
              currentMonth={currentMonth}
              budgetStatements={cu?.budgetStatements}
            />
          )}
          {tabsIndex === 4 && (
            <TransparencyAudit budgetStatement={currentBudgetStatement} />
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
  backgroundImage: isLight
    ? 'url(/assets/img/bg-page.png)'
    : 'url(/assets/img/bg-page-dark.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  padding: '0 16px',
  '@media (min-width: 834px)': {
    padding: '0 32px 128px',
  },
  '@media (max-width: 833px)': {
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
}>(
  ({
    marginBottom = 16,
    fontSize = '16px',
    isLight,
    responsiveMarginBottom,
  }) => ({
    fontFamily: 'FT Base, sans-serif',
    fontWeight: 700,
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
    },
  })
);

const Paragraph = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: '64px',
  '@media (min-width: 834px)': {
    fontSize: '16px',
    lineHeight: '19px',
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

const StatusBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  visibility: 'hidden',
});

const StatusTitle = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#D2D4EF',
  margin: '3px 8px 0 0',
}));

const StatusValue = styled.div<{ color: string }>(({ color }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  textTransform: 'uppercase',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: color ?? '#1AAB9B',
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

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
