import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

import MedianAnnualDai from '../components/MedianAnnualDai';
import ShadowDelegatesCard from '../components/ShadowDelegatesCard';
import TotalRecognizedDelegatesCard from '../components/TotalRecognizedDelegatesCard';
import VisualizationCard from '../components/VisualizationCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Title isLight={isLight}>Key Stats</Title>
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
};

export default KeyStats;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#000000' : '#D2D4EF',
  padding: 0,
  marginTop: 0,
  marginBottom: 16,
  textAlign: 'center',
}));

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
