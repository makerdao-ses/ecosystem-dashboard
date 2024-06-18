import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import DefaultCountUp from '../DefaultCountUp/DefaultCountUp';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type ValueColor = 'normal' | 'green';

interface NumberWithSignCardProps {
  value?: number;
  text: string;
  sign: 'positive' | 'negative';
  valueColor?: ValueColor;
  cardWidth?: string | number;
  dynamicChanges?: boolean;
}

const NumberWithSignCard: React.FC<NumberWithSignCardProps> = ({
  value,
  sign,
  text,
  valueColor = 'normal',
  dynamicChanges = false,
}) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      <SignContainer>
        {sign === 'positive' ? (
          <PlusSVG viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" width="4" height="24" rx="2" fill={isLight ? '#ADAFD4' : '#48495F'} />
            <rect
              y="14"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 14)"
              fill={isLight ? '#ADAFD4' : '#48495F'}
            />
          </PlusSVG>
        ) : (
          <MinusSVG viewBox="0 0 24 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              y="4"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 4)"
              fill={isLight ? '#ADAFD4' : '#48495F'}
            />
          </MinusSVG>
        )}
      </SignContainer>
      <Card isLight={isLight} sign={sign}>
        <Value isLight={isLight} valueColor={valueColor}>
          {value !== undefined ? (
            <>
              {dynamicChanges ? (
                <DefaultCountUp end={Math.round(value)} formattingFn={usLocalizedNumber} />
              ) : (
                usLocalizedNumber(Math.round(value))
              )}
              <div>DAI</div>
            </>
          ) : (
            'N/A'
          )}
        </Value>
        <Text isLight={isLight}>{text}</Text>
      </Card>
    </Container>
  );
};

export default NumberWithSignCard;

const Container = styled.div({
  display: 'flex',
  width: '100%',
});

const SignContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: 4,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginRight: 8,
  },
});

const PlusSVG = styled.svg({
  width: 16,
  height: 16,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 24,
    height: 24,
  },
});

const MinusSVG = styled.svg({
  width: 16,
  height: 4,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 24,
    height: 4,
  },
});

const Card = styled.div<WithIsLight & { sign: 'positive' | 'negative' }>(({ isLight, sign }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 167,
  width: '100%',
  padding: 8,
  background: isLight ? 'rgba(236, 239, 249, 0.5)' : 'rgba(72, 73, 95, 0.25)',
  borderRadius: 6,

  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: sign === 'positive' ? 159 : 167,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: sign === 'positive' ? 224 : 235,
  },
}));

const Value = styled.div<WithIsLight & { valueColor: ValueColor }>(({ isLight, valueColor }) => {
  let color = isLight ? '#231536' : '#EDEFFF'; // normal
  if (valueColor === 'green') {
    color = isLight ? '#1AAB9B' : '#2DC1B1';
  }

  return {
    display: 'flex',
    alignItems: 'baseline',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color,
    textAlign: 'center',

    [lightTheme.breakpoints.up('table_834')]: {
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: 0.4,
      fontFeatureSettings: 'normal',
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      fontWeight: 500,
      fontSize: 30,
      lineHeight: '36px',
    },

    '& div': {
      marginLeft: 4,
      fontWeight: 700,
      fontSize: 12,
      lineHeight: '15px',
      letterSpacing: 0.3,
      fontFeatureSettings: "'tnum' on, 'lnum' on",
      color: isLight ? '#9FAFB9' : '#708390',

      [lightTheme.breakpoints.up('table_834')]: {
        fontSize: 16,
        lineHeight: '19px',
      },
    },
  };
});

const Text = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#708390' : '#708390',
  marginTop: 4,

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
}));
