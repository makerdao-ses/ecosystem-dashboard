import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransactionAmountProps {
  amount: number;
  highlightPositiveAmounts?: boolean;
}

const TransactionAmount: React.FC<TransactionAmountProps> = ({ amount, highlightPositiveAmounts }) => {
  const { isLight } = useThemeContext();

  return (
    <Wrapper>
      <Title isLight={isLight}>Amount</Title>
      <Amount isLight={isLight} isGreen={amount > 0 && !!highlightPositiveAmounts}>
        <Sign>{amount < 0 ? '-' : '+'}</Sign>
        {usLocalizedNumber(Math.abs(amount))}
        <Currency isLight={isLight}>DAI</Currency>
      </Amount>
    </Wrapper>
  );
};

export default TransactionAmount;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: 8,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: -1,
  },
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#546978' : '#708390',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 12,
    lineHeight: '15px',
  },
}));

const Amount = styled.div<WithIsLight & { isGreen: boolean }>(({ isLight, isGreen }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  lineHeight: '22px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
  },

  '&, & > span:first-of-type': {
    color: isGreen ? '#1AAB9B' : isLight ? '#231536' : '#D2D4EF',
  },
}));

const Sign = styled.span({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '19px',
  },
});

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
