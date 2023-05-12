import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type ValueColor = 'normal' | 'green';

interface NumberWithSignCardProps {
  value: number;
  text: string;
  sign: 'positive' | 'negative';
  valueColor?: ValueColor;
  width?: string | number;
}

const NumberWithSignCard: React.FC<NumberWithSignCardProps> = ({ value, sign, text, valueColor = 'normal', width }) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <SignContainer>
        {sign === 'positive' ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" width="4" height="24" rx="2" fill="#ADAFD4" />
            <rect y="14" width="4" height="24" rx="2" transform="rotate(-90 0 14)" fill="#ADAFD4" />
          </svg>
        ) : (
          <svg width="24" height="4" viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="4" width="4" height="24" rx="2" transform="rotate(-90 0 4)" fill="#ADAFD4" />
          </svg>
        )}
      </SignContainer>
      <Card isLight={isLight} width={width ?? 'auto'}>
        <Value isLight={isLight} valueColor={valueColor}>
          {usLocalizedNumber(Math.round(value))} <span>DAI</span>
        </Value>
        <Text isLight={isLight}>{text}</Text>
      </Card>
    </Container>
  );
};

export default NumberWithSignCard;

const Container = styled.div({
  display: 'flex',
});

const SignContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: 8,
});

const Card = styled.div<WithIsLight & { width: string | number }>(({ isLight, width }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width,
  padding: 8,
  background: isLight ? 'rgba(236, 239, 249, 0.5)' : 'red',
  borderRadius: 6,
}));

const Value = styled.div<WithIsLight & { valueColor: ValueColor }>(({ isLight, valueColor }) => {
  let color = isLight ? '#231536' : 'red'; // normal
  if (valueColor === 'green') {
    color = isLight ? '#1AAB9B' : 'green';
  }

  return {
    display: 'flex',
    alignItems: 'baseline',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: '36px',
    letterSpacing: 0.4,
    color,

    '& span': {
      marginLeft: 4,
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '19px',
      letterSpacing: 0.3,
      fontFeatureSettings: "'tnum' on, 'lnum' on",
      color: isLight ? '#9FAFB9' : 'red',
    },
  };
});

const Text = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#708390' : 'red',
  marginTop: 4,
}));
