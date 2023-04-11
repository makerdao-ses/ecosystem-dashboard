import styled from '@emotion/styled';
import React from 'react';
import MedianAnnualDai from '../components/MedianAnnualDai';
import PercentageTotalCard from '../components/PercentageTotalCard';
import ShadowDelegatesCard from '../components/ShadowDelegatesCard';
import TotalRecognizedDelegatesCard from '../components/TotalRecognizedDelegatesCard';
import VisualizationCard from '../components/VisualizationCard';

interface Props {
  totalDelegates: number;
  shadowTotal: number;
  annual: number;
  percent: number;
}

const KeyStats: React.FC<Props> = ({ annual, percent, shadowTotal, totalDelegates }) => (
  <Container>
    <Title>Key Stats</Title>
    <ContainerCards>
      <CardRow>
        <TotalRecognizedDelegatesCard total={totalDelegates} />
        <ShadowDelegatesCard shadowTotal={shadowTotal} />
      </CardRow>
      <CardRow>
        <MedianAnnualDai annual={annual} />
        <PercentageTotalCard percent={percent} />
      </CardRow>

      <VisualizationCard percent={percent} totalDai={4353453453} recognizedNumberDelegate={21} />
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
  marginBottom: 24,
  textAlign: 'center',
});

const ContainerCards = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const CardRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 17,
});
