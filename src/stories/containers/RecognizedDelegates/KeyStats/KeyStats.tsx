import styled from '@emotion/styled';
import React from 'react';

import MedianAnnualDai from '../components/MedianAnnualDai';
import ShadowDelegatesCard from '../components/ShadowDelegatesCard';
import TotalRecognizedDelegatesCard from '../components/TotalRecognizedDelegatesCard';
import VisualizationCard from '../components/VisualizationCard';

interface Props {
  totalDelegates: number;
  shadowTotal: number;
  annual: number;
  percent: number;
  otherExpenses: number;
  delegatesExpenses: number;
  amountDelegates: number;
}

const KeyStats: React.FC<Props> = ({
  annual,
  shadowTotal,
  totalDelegates,
  delegatesExpenses,
  otherExpenses,
  amountDelegates,
}) => (
  <Container>
    <Title>Key Stats</Title>
    <ContainerCards>
      <CardRow>
        <TotalRecognizedDelegatesCard total={totalDelegates} />
        <ShadowDelegatesCard shadowTotal={shadowTotal} />
      </CardRow>
      <CardRow>
        <MedianAnnualDai annual={annual} />
      </CardRow>
      <CardRow>
        <VisualizationCard
          delegatesExpenses={delegatesExpenses}
          otherExpenses={otherExpenses}
          amountDelegates={amountDelegates}
        />
      </CardRow>
    </ContainerCards>
  </Container>
);

export default KeyStats;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#000000',
  padding: 0,
  marginTop: 0,
  marginBottom: 16,
  textAlign: 'center',
});

const ContainerCards = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const CardRow = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  gap: 24,
});
