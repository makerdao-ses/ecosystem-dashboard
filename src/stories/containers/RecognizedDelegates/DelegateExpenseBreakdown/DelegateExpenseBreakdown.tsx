import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import DelegateExpenseBreakdownCard from '../components/DelegateExpenseBreakdownCard';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  delegates: RecognizedDelegatesDto[];
  totalDai: number;
  numbersDaiDelegate: number[];
}

const DelegateExpenseBreakdown: React.FC<Props> = ({ delegates, totalDai }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Title isLight={isLight}> Delegate Expense Breakdown</Title>
      <ContainerBreakdown>
        {delegates?.map((delegate) => (
          <DelegateExpenseBreakdownCard
            delegateCard={delegate}
            totalDai={totalDai}
            key={delegate.name}
            numberDaiDelegate={456}
          />
        ))}
      </ContainerBreakdown>
    </Container>
  );
};

export default DelegateExpenseBreakdown;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0.75px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 0,
  marginBottom: 24,
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: '0.4px',
  },
}));

const ContainerBreakdown = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});
