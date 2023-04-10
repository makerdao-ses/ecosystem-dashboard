import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import React from 'react';
import DelegateExpenseBreakdown from './DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';
import KeyStats from './KeyStats';
import TotalAndKeyStatsComponent from './TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';

const RecognizedDelegatesContainer: React.FC = () => {
  const { totalDAI, startMonth, endMonth } = useRecognizedDelegates();
  return (
    <PageContainer>
      <Container>
        <Title>Recognized Delegates</Title>
        <TotalAndKeyStatsComponent totalDAI={totalDAI} start={startMonth} end={endMonth} />
        <KeyStats />
        <DelegateExpenseTrend />
        <DelegateExpenseBreakdown />
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
