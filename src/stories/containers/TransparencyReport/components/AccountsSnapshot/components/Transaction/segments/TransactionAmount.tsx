import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface TransactionAmountProps {
  amount: number;
}

const TransactionAmount: React.FC<TransactionAmountProps> = ({ amount }) => {
  const { isLight } = useThemeContext();

  return (
    <Wrapper>
      <Title isLight={isLight}>Amount</Title>
      <Amount isLight={isLight}>
        <Sign>{amount < 0 ? '-' : '+'}</Sign>
        {Math.abs(amount)}
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
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#546978' : 'red',
}));

const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  gap: 4,
  fontSize: 14,
  lineHeight: '22px',

  '&, & > span:first-of-type': {
    color: isLight ? '#231536' : '#D2D4EF',
  },
}));

const Sign = styled.span({
  fontWeight: 700,
  fontSize: 14,
  lineHeight: '17px',
});

const Currency = styled.span<WithIsLight>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: isLight ? '#9FAFB9' : '#546978',
}));
