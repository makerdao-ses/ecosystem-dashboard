import React, { useMemo, useState } from 'react';
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
import { useTransparencyReportViewModel } from './transparency-report.mvvm';
import { DateTime } from 'luxon';
import { BudgetStatementDto, CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { API_MONTH_FORMAT } from '../../../core/utils/date.utils';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { formatCode } from '../../../core/utils/string.utils';
import { useThemeContext } from '../../../core/context/ThemeContext';
import Head from 'next/head';

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

export const TransparencyReport = () => {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const { data } = useTransparencyReportViewModel(code);

  const cu = data && data.coreUnit[0] as CoreUnitDto;

  const [thirdIndex, setThirdIndex] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());

  const currentBudgetStatement = useMemo(() => {
    return cu?.budgetStatements?.find((bs: BudgetStatementDto) => bs.month === currentMonth.toFormat(API_MONTH_FORMAT));
  }, [cu, currentMonth]);

  return <Wrapper>
    <Head>
      <title>Sustainable Ecosystem Scaling Core Unit I Finances</title>
      <link rel="icon" href="/favicon.png" />
      <meta name="description" content="MakerDAO Ecosystem Performance Dashboard provides a transparent analysis of Core Unit teams' finances, projects, and their position in the DAO." />
      <meta name="robots" content="index,follow"/>
    </Head>
    <CoreUnitSummary trailingAddress={['Expense Reports']} />
    <Container isLight={isLight}>

      <InnerPage>
        <Title isLight={isLight}>Expense Reports</Title>

        <Paragraph isLight={isLight}>
          Every month, the {formatCode(code)} Core Unit submits a transparency report for MakerDAO governance with a detailed budget update.
          If the core unit works with an auditor, the transparency report is reviewed by the auditor before the core unit's operational
          wallet is topped up to replenish its runway.
          <p style={{ marginBottom: 0 }}>
            <span>Is this your core unit? Learn</span>
            <CustomLink
              href={HOW_TO_SUBMIT_EXPENSES}
              iconHeight={10}
              iconWidth={10}
              fontSize={16}
              fontSizeMobile={14}
              fontFamily={'SF Pro Display, sans-serif'}>
              how to submit your expenses here
            </CustomLink>
          </p>
        </Paragraph>

        <PagerBar className="no-select">
          <PagerBarLeft>
            <CustomPager
              label={currentMonth.toFormat('MMM yyyy').toUpperCase()}
              onPrev={() => setCurrentMonth(currentMonth.minus({ month: 1 }))}
              onNext={() => setCurrentMonth(currentMonth.plus({ month: 1 }))}
            />
            {currentBudgetStatement?.publicationUrl && <CustomLink
              href={currentBudgetStatement?.publicationUrl ?? null}
              style={{
                margin: '0 0 10px 0',
                alignSelf: 'flex-end',
                lineHeight: '19px',
              }}
              iconHeight={10}
              iconWidth={10}
              fontSize={16}
              fontFamily={'SF Pro Display, sans-serif'}
            >
              Source
            </CustomLink>}
          </PagerBarLeft>
          <Spacer />
          <StatusBar>
            <StatusTitle isLight={isLight}>Status</StatusTitle>
            <StatusValue color={isLight ? colors[currentBudgetStatement?.budgetStatus] : colorsDarkColors[currentBudgetStatement?.budgetStatus]}>{currentBudgetStatement?.budgetStatus ?? '-'}</StatusValue>
          </StatusBar>
        </PagerBar>

        <Tabs
          items={['Actuals', 'Forecast', 'MKR Vesting', 'Transfer Requests', 'Audit Reports']}
          currentIndex={thirdIndex}
          onChange={setThirdIndex}
          style={{
            margin: '32px 0',
          }}
        />
        {thirdIndex === 0 && <TransparencyActuals code={code} currentMonth={currentMonth} budgetStatements={cu?.budgetStatements} />}
        {thirdIndex === 1 && <TransparencyForecast currentMonth={currentMonth} budgetStatements={cu?.budgetStatements} />}
        {thirdIndex === 2 && <TransparencyMkrVesting currentMonth={currentMonth} budgetStatements={cu?.budgetStatements} />}
        {thirdIndex === 3 && <TransparencyTransferRequest currentMonth={currentMonth} budgetStatements={cu?.budgetStatements} />}
        {thirdIndex === 4 && <TransparencyAudit budgetStatement={currentBudgetStatement} />}
      </InnerPage>
    </Container>
  </Wrapper>;
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
  padding: '0 16px',
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

export const Title = styled.div<{ marginBottom?: number, isLight: boolean }>(({ marginBottom = 16, isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: `${marginBottom}px`,
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  }
}));

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
  }
}));

const PagerBar = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,
  '@media (min-width: 834px)': {
    alignItems: 'center',
  }
});

const PagerBarLeft = styled.div({
  display: 'block',
  '@media (min-width: 834px)': {
    display: 'flex',
  }
});

const StatusBar = styled.div({
  display: 'flex',
  alignItems: 'center'
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
  textDecoration: 'uppercase',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: color ?? '#1AAB9B',
  '@media (min-width: 834px)': {
    fontSize: '20px',
    lineHeight: '24px',
  }
}));

const Spacer = styled.div({
  flex: '1',
});

export const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block'
  }
});

export const CardsWrapper = styled.div({
  display: 'block',
  '@media (min-width: 834px)': {
    display: 'none'
  }
});
