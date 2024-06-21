import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface InitialBalanceRow {
  initialBalance: number;
}

const InitialBalanceRow: React.FC<InitialBalanceRow> = ({ initialBalance }) => {
  const { isLight } = useThemeContext();
  return (
    <Wrapper isLight={isLight}>
      <Title isLight={isLight}>Initial Balance</Title>
      <Amount isLight={isLight}>
        {usLocalizedNumber(initialBalance)}
        <Currency isLight={isLight}>DAI</Currency>
      </Amount>
    </Wrapper>
  );
};

export default InitialBalanceRow;

const Wrapper = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'none',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 8,
  padding: '21px 32px 13px 20px',

  [lightTheme.breakpoints.up('table_834')]: {
    display: 'flex',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '16px 56px 14px 20px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 64px 14px 20px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '16px 80px 14px 20px',
  },

  '&:hover': {
    background: isLight ? '#F6F8F9' : '#1F2931',
  },
}));

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#546978' : '#708390',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 700,
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
  },
}));

const Currency = styled.span<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',

  [lightTheme.breakpoints.up('table_834')]: {
    color: '#9FAFB9',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));
