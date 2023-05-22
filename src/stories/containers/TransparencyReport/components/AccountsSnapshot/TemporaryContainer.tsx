import styled from '@emotion/styled';
import Container from '@ses/components/Container/Container';
import PageContainer from '@ses/components/Container/PageContainer';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import AccountsSnapshot from './AccountsSnapshot';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

const TemporaryContainer: React.FC = () => {
  const { isLight } = useThemeContext();

  return (
    <PageContainer hasImageBackground>
      <Container>
        <Title isLight={isLight}>Account Snapshot</Title>

        <AccountsSnapshot />
      </Container>
    </PageContainer>
  );
};

export default TemporaryContainer;

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

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 24,
    lineHeight: '29px',
    letterSpacing: '0.4px',
    marginTop: 34,
    marginBottom: 32,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 32,
  },
}));
