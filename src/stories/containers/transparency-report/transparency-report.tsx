import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Tabs } from '../../components/tabs/tabs';
import { CustomPager } from '../../components/custom-pager/custom-pager';
import { CustomLink } from '../../components/custom-link/custom-link';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { CoreUnitSummary } from '../../components/core-unit-summary/core-unit-summary';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { LinkTypeEnum } from '../../../core/enums/link-type.enum';
import { TransparencyActuals } from './transparency-actuals/transparency-actuals';
import { TransparencyForecast } from './transparency-forecast/transparency-forecast';
import { TransparencyMkrVesting } from './transparency-mkr-vesting/transparency-mkr-vesting';
import { TransparencyTransferRequest } from './transparency-transfer-request/transparency-transfer-request';
import { TransparencyAudit } from './transparency-audit/transparency-audit';
import { useRouter } from 'next/router';
import { useTransparencyReportViewModel } from './transparency-report.mvvm';
import { getMipFromCoreUnit } from '../../../core/business-logic/core-units';

export const TransparencyReport = () => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const { data: cu, isLoading, error } = useTransparencyReportViewModel(code);

  console.log(cu);

  const [secondIndex, setSecondIndex] = useState(1);
  const [thirdIndex, setThirdIndex] = useState(0);

  return <Container>
    <BreadcrumbWrapper>
      <Breadcrumbs items={[<>Core Units <b>(3)</b></>, 'SES - Sustainable Ecosystem Scaling', 'Finances']}/>
      <CustomPager
        label={<BreadcrumbPagerLabel><b>1</b> of 3 Core Units </BreadcrumbPagerLabel>}
      />
    </BreadcrumbWrapper>
    <SummaryWrapper>
      {(!isLoading && cu) && <CoreUnitSummary
        title={cu.name}
        code={cu.code}
        categories={[
          CuCategoryEnum.Support,
          CuCategoryEnum.Business,
          CuCategoryEnum.Growth,
          CuCategoryEnum.Operational,
          CuCategoryEnum.Finance,
        ]}
        status={getMipFromCoreUnit(cu)?.mipStatus as CuStatusEnum}
        links={[
          {
            href: '#',
            linkType: LinkTypeEnum.WWW
          },
          {
            href: '#',
            linkType: LinkTypeEnum.Forum
          },
          {
            href: '#',
            linkType: LinkTypeEnum.Discord
          },
        ]}
        description={'The aim of SES is to sustainably grow the Maker Protocol\'s moats by systematically removing barriers between the decentralized workforce, capital, and work.'}
        imageUrl={'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/53/92/77/53927729-28a4-b94a-40d9-9abbc9583078/source/512x512bb.jpg'}
      />}
    </SummaryWrapper>
    <InnerPage>
      <Tabs
        items={['Overview', 'Transparency Reports', 'Onchain Setup', 'Budget Governance']}
        currentIndex={secondIndex}
        onChange={setSecondIndex}
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
        <CustomPager label="MAY 2022"/>
        <Spacer/>
        <StatusTitle>Status</StatusTitle>
        <StatusValue>FINAL</StatusValue>
      </PagerBar>

      <CustomLink
        href="#"
        style={{ margin: '0' }}>
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
    {thirdIndex === 0 && <TransparencyActuals/>}
    {thirdIndex === 1 && <TransparencyForecast/>}
    {thirdIndex === 2 && <TransparencyMkrVesting/>}
    {thirdIndex === 3 && <TransparencyTransferRequest/>}
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

export const Title = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#000000',
  marginBottom: '16px'
});

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

const SummaryWrapper = styled.div({
  borderBottom: '1px solid #B6EDE7',
  flex: 1,
  width: '100%',
  marginBottom: '32px',
});

const BreadcrumbWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  paddingRight: '22px',
});

const BreadcrumbPagerLabel = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#626472',
  b: {
    color: '#231536',
    fontWeight: 700,
  }
});
