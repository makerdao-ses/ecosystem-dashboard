import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const DelegateExpenseTrendFinances: React.FC = () => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <InformationSection>
        <Title isLight={isLight}>Expense Reports</Title>
        <Description isLight={isLight}>Delegate Compensation / Month</Description>
      </InformationSection>
    </Container>
  );
};

export default DelegateExpenseTrendFinances;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
});

const InformationSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  marginBottom: 24,
  [lightTheme.breakpoints.up('table_834')]: {
    gap: 16,
  },
});

const Title = styled.h2<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 18,
  margin: 0,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '0.75px',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 32,
    letterSpacing: '0.4px',
  },
}));

const Description = styled.p<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 400,
  margin: 0,
  lineHeight: 'normal',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
