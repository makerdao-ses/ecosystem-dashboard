import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import React from 'react';
import DelegateExpenseBreakdown from './DelegateExpenseBreakdown/DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';

import TotalAndKeyStatsComponent from './TotalAndKeyStatsComponent/TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';

const RecognizedDelegatesContainer: React.FC = () => {
  const { totalDAI, startMonth, endMonth, links } = useRecognizedDelegates();
  return (
    <PageContainer>
      <Container>
        <Title>Recognized Delegates</Title>
        <TotalAndKeyStatsComponent totalDAI={totalDAI} start={startMonth} end={endMonth} />
        <ContainerTrend>
          <DelegateExpenseTrend />
        </ContainerTrend>
        <ContainerBreakdown>
          <DelegateExpenseBreakdown
            imageUrl="https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg"
            walletName="Flip Flop Flap Delegate LLC"
            links={links}
          />
        </ContainerBreakdown>
      </Container>
    </PageContainer>
  );
};

export default RecognizedDelegatesContainer;

const Title = styled.h1({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: '#231536',
  marginTop: 32,
  marginBottom: 32,
});

const ContainerTrend = styled.div({
  marginTop: 40,
  marginBottom: 32,
  // TODO: Delete height when the chart is implemented
  height: 378,
});

const ContainerBreakdown = styled.div({});
