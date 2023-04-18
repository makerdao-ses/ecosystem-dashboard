import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

import DelegateExpenseBreakdown from './DelegateExpenseBreakdown/DelegateExpenseBreakdown';
import DelegateExpenseTrend from './DelegateExpenseTrend';

import TotalAndKeyStatsComponent from './TotalAndKeyStatsComponent/TotalAndkeyStatusComponent';
import { useRecognizedDelegates } from './useRecognizedDelegates';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const RecognizedDelegatesContainer: React.FC = () => {
  const { isLight } = useThemeContext();
  const {
    totalDAI,
    startMonth,
    endMonth,
    arrayOfDelegate,
    mediaAnnual,
    percent,
    shadowTotal,
    totalDelegates,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,
  } = useRecognizedDelegates();
  return (
    <ExtendedPageContainer isLight={isLight}>
      <Container>
        <Title isLight={isLight}>Recognized Delegates</Title>
        <TotalAndKeyStatsComponent
          amountDelegates={amountDelegates}
          totalDAI={totalDAI}
          start={startMonth}
          end={endMonth}
          annual={mediaAnnual}
          percent={percent}
          shadowTotal={shadowTotal}
          totalDelegates={totalDelegates}
          delegatesExpenses={delegatesExpenses}
          otherExpenses={otherExpenses}
        />
        <ContainerTrend>
          <DelegateExpenseTrend />
        </ContainerTrend>
        <ContainerBreakdown>
          <DelegateExpenseBreakdown arrayOfDelegate={arrayOfDelegate} totalDai={totalDAI} />
        </ContainerBreakdown>
      </Container>
    </ExtendedPageContainer>
  );
};

export default RecognizedDelegatesContainer;

const Title = styled.h1<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 32,
  marginBottom: 32,
}));

const ExtendedPageContainer = styled(PageContainer)<WithIsLight>(({ isLight }) => ({
  backgroundColor: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
}));

const ContainerTrend = styled.div({
  marginTop: 40,
  marginBottom: 32,
  // TODO: Delete height when the chart is implemented
  height: 378,
});

const ContainerBreakdown = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});
