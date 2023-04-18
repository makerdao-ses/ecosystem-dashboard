import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';

import DelegateExpenseBreakdown from './DelegateExpenseBreakdown/DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';

import TotalAndKeyStatsComponent from './TotalAndKeyStatsComponent/TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';

const RecognizedDelegatesContainer: React.FC = () => {
  const {
    totalDAI,
    arrayOfDelegate,
    mediaAnnual,
    percent,
    shadowTotal,
    totalDelegates,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,
    expensesMock,
    startDate,
    endDate,
  } = useRecognizedDelegates();
  return (
    <PageContainer>
      <Container>
        <Title>Recognized Delegates</Title>
        <TotalAndKeyStatsComponent
          amountDelegates={amountDelegates}
          totalDAI={totalDAI}
          start={startDate}
          end={endDate}
          annual={mediaAnnual}
          percent={percent}
          shadowTotal={shadowTotal}
          totalDelegates={totalDelegates}
          delegatesExpenses={delegatesExpenses}
          otherExpenses={otherExpenses}
        />
        <ContainerTrend>
          <DelegateExpenseTrend expenses={expensesMock} endDate={endDate} startDate={startDate} />
        </ContainerTrend>
        <ContainerBreakdown>
          <DelegateExpenseBreakdown arrayOfDelegate={arrayOfDelegate} totalDai={totalDAI} />
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
  [lightTheme.breakpoints.up('table_834')]: {
    width: 690,
    margin: '0 auto',
    marginBottom: 62,
  },
});

const ContainerBreakdown = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});
