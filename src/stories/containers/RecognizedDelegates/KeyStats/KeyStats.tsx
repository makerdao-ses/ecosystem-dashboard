import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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
  otherExpenses: number;
  delegatesExpenses: number;
}

const KeyStats: React.FC<Props> = ({ annual, shadowTotal, totalDelegates, delegatesExpenses, otherExpenses }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Title isLight={isLight}>Key Stats</Title>
      <ContainerCards>
        <CardsRowsContainer>
          <CardRow>
            <TotalRecognizedDelegatesCard total={totalDelegates} />
            <ShadowDelegatesCard shadowTotal={shadowTotal} />
          </CardRow>
          <CardRow>
            <MedianAnnualDai annual={annual} />
          </CardRow>
        </CardsRowsContainer>

        <CardRow>
          <VisualizationCard
            delegatesExpenses={delegatesExpenses}
            otherExpenses={otherExpenses}
            totalDelegates={totalDelegates}
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
  [lightTheme.breakpoints.up('table_834')]: {
    textAlign: 'left',
    marginLeft: 10,
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 600,
    letterSpacing: '0.4px',
    marginBottom: 8,
  },
}));

const ContainerCards = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [lightTheme.breakpoints.up('desktop_1194')]: {
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 24,
  },
});

const CardRow = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  gap: 24,
  [lightTheme.breakpoints.up('table_834')]: {
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 24,
  },
});

const CardsRowsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
    flexDirection: 'row',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 24,
  },
});
