import React, { useState } from 'react';
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
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';

export const TransparencyReport = () => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const { data } = useTransparencyReportViewModel(code);

  const cu = data && data.coreUnit[0] as CoreUnitDto;

  const secondIndex = 1;
  const [thirdIndex, setThirdIndex] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());

  return <Container>
    <CoreUnitSummary trailingAddress={['Finances']}/>
    <InnerPage>
      <Tabs
        items={['Overview', 'Transparency Reports', 'Onchain Setup', 'Budget Governance']}
        currentIndex={secondIndex}
        style={{
          marginBottom: '64px',
          flex: '0'
        }}
      />
      <Title>Transparency Reports</Title>

      <Paragraph>
        Every month, the SES Core Unit submits a transparency report
        for MakerDAO governance with a detailed budget update.
        If the core unit works with an auditor, the transparency report
        is reviewed by the auditor before the core units operational
        wallet is topped up to replenish its runway.
      </Paragraph>

      <PagerBar>
        <CustomPager
          label={currentMonth.toFormat('MMM yyyy')}
          onPrev={() => setCurrentMonth(currentMonth.minus({ month: 1 })) }
          onNext={() => setCurrentMonth(currentMonth.plus({ month: 1 })) }
        />
        <Spacer/>
        <StatusTitle>Status</StatusTitle>
        <StatusValue>FINAL</StatusValue>
      </PagerBar>

      <CustomLink
        href="#"
        style={{ margin: '0' }}
        fontSize={16}
        fontFamily={'SF Pro Display, sans-serif'}
      >
        Source
      </CustomLink>

      <Tabs
        items={['Actuals', 'Forecast', 'MKR Vesting', 'Transfer Requests', 'Audit Reports']}
        currentIndex={thirdIndex}
        onChange={setThirdIndex}
        style={{
          margin: '32px 0',
        }}
      />
    {thirdIndex === 0 && <TransparencyActuals code={code} currentMonth={currentMonth} budgetStatements={cu?.budgetStatements} />}
    {thirdIndex === 1 && <TransparencyForecast currentMonth={currentMonth} budgetStatements={cu?.budgetStatements}/>}
    {thirdIndex === 2 && <TransparencyMkrVesting currentMonth={currentMonth} budgetStatements={cu?.budgetStatements}/>}
    {thirdIndex === 3 && <TransparencyTransferRequest currentMonth={currentMonth} budgetStatements={cu?.budgetStatements}/>}
    {thirdIndex === 4 && <TransparencyAudit/>}
    </InnerPage>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '64px',
  flex: 1,
  background: 'url(/assets/img/bg-page.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
});

const InnerPage = styled.div({
  display: 'block',
  margin: '0 auto',
  width: '100%',
  maxWidth: '1184px',
  textAlign: 'left',
});

export const Title = styled.div<{ marginBottom?: number }>(({ marginBottom = 16 }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#231536',
  marginBottom: `${marginBottom}px`
}));

const Paragraph = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000000',
  marginBottom: '64px',
});

const PagerBar = styled.div({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
});

const StatusTitle = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'black',
  margin: '3px 8px 0 0',
});

const StatusValue = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  letterSpacing: '0.4px',
  color: '#1AAB9B',
});

const Spacer = styled.div({
  flex: '1',
});
