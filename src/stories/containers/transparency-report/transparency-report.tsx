import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Tabs } from '../../components/tabs/tabs';
import { CustomPager } from '../../components/custom-pager/custom-pager';
import { CustomLink } from '../../components/custom-link/custom-link';
import { InnerTable } from '../../components/inner-table/inner-table';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';

const mainIndexItems = ['SES-Sustainable Ecosystem Scaling', 'Initiatives', 'Finances'];
const secondIndexItems = ['Overview', 'Transparency Reports', 'Onchain Setup', 'Budget Governance'];
const thirdIndexItems = ['Actuals', 'Forecast', 'MKR Vesting', 'Transfer Requests', 'Audit Reports'];

const TableCell = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontWeight: 400,
  fontSize: 16,
  padding: '24px 16px',
  color: '#25273D',
});

const firstTableItems = [
  [<TableCell key={1}>Permanent Team</TableCell>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<TableCell key={1}>Incubation Program</TableCell>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
  [<TableCell key={1}>Grants Program</TableCell>, <TableCell key={1}>134,468</TableCell>, <TableCell key={1}>132,897</TableCell>, <TableCell key={1}>1,571</TableCell>, <TableCell key={1}>138,754</TableCell>, <TableCell key={1}><CustomLink href={'#'} style={{ marginRight: '16px' }}>Etherscan</CustomLink><CustomLink href={'#'}>Gnosis</CustomLink></TableCell>],
];

export const TransparencyReport = () => {
  const [mainIndex, setMainIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);
  const [thirdIndex, setThirdIndex] = useState(0);

  return <Container>
    <Breadcrumbs items={[<>Core Units <b>(3)</b></>, 'SES - Sustainable Ecosystem Scaling ', 'Finances']}/>
    <Placeholder/>
    <InnerPage>
      <Tabs
        items={mainIndexItems}
        currentIndex={mainIndex}
        onChange={setMainIndex}
        style={{ marginBottom: '48px' }}
      />

      <Tabs
        items={secondIndexItems}
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
        items={thirdIndexItems}
        currentIndex={thirdIndex}
        onChange={setThirdIndex}
        style={{
          margin: '32px 0',
        }}
      />

      <Title style={{
        marginBottom: '32px'
      }}>
        May 2022 Total
      </Title>

      <InnerTable
        headers={['Budget', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
        items={firstTableItems}
        style={{ marginBottom: '62px' }}
      />

      <Title style={{
        marginBottom: '32px'
      }}>
        May 2022 Breakdown
      </Title>

      <Tabs
        items={['Permanent team', 'Incubation', 'Grants']}
        currentIndex={thirdIndex}
        onChange={setThirdIndex}
        style={{
          marginBottom: '32px',
        }}
      />

      <InnerTable
        headers={['Permanent', 'Forecast', 'Actuals', 'Difference', 'Payments', 'External Links']}
        items={firstTableItems}
        style={{ marginBottom: '62px' }}
      />
    </InnerPage>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '2000px',
  flex: 1,
});

const InnerPage = styled.div({
  display: 'block',
  margin: '0 auto',
  width: '100%',
  maxWidth: '1184px',
  textAlign: 'left',
});

const Title = styled.div({
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

const Placeholder = styled.div({
  borderBottom: '1px solid #B6EDE7',
  flex: 1,
  minHeight: '145px',
  width: '100%',
  marginBottom: '32px',
});
