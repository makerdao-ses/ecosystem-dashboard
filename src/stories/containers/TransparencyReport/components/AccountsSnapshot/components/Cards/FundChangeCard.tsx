import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import NumberWithSignCard from '../NumberWithSignCard/NumberWithSignCard';
import OutlinedCard from './OutlinedCard';
import type { ValueColor } from '../NumberWithSignCard/NumberWithSignCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface FundChangeCardProps {
  netChange: number;
  leftValue: number;
  leftValueColor?: ValueColor;
  leftText: string;
  rightValue: number;
  rightValueColor?: ValueColor;
  rightText: string;
}

const FundChangeCard: React.FC<FundChangeCardProps> = ({
  netChange,
  leftValue,
  leftValueColor = 'normal',
  leftText,
  rightValue,
  rightValueColor = 'normal',
  rightText,
}) => {
  const { isLight } = useThemeContext();

  return (
    <Card>
      <ChangeContainer>
        <LeftArrowContainer>
          <Arrow isLight={isLight} direction="left" />
        </LeftArrowContainer>
        <ChangeContent>
          <Value isLight={isLight}>
            {netChange > 0 && '+'}
            {usLocalizedNumber(Math.round(netChange))} <span>DAI</span>
          </Value>
          <NetChangeMessage isLight={isLight}>Net Change</NetChangeMessage>
        </ChangeContent>
        <RightArrowContainer>
          <Arrow isLight={isLight} direction="right" />
        </RightArrowContainer>
      </ChangeContainer>
      <ValuesContainer>
        <NumberWithSignCard value={leftValue} valueColor={leftValueColor} sign="positive" text={leftText} width={224} />
        <NumberWithSignCard
          value={rightValue}
          valueColor={rightValueColor}
          sign="negative"
          text={rightText}
          width={235}
        />
      </ValuesContainer>
    </Card>
  );
};

export default FundChangeCard;

const Card = styled(OutlinedCard)({
  padding: 15,
  minWidth: 579,
});

const ChangeContainer = styled.div({
  display: 'flex',
  width: '100%',
});

const LeftArrowContainer = styled.div({
  width: '100%',
  paddingLeft: 159,
  marginRight: 8,
  paddingBottom: 1,
});

const RightArrowContainer = styled.div({
  width: '100%',
  paddingRight: 129,
  marginLeft: 8,
  paddingBottom: 1,
});

const Arrow = styled.div<WithIsLight & { direction: 'left' | 'right' }>(({ isLight, direction }) => {
  const margin = 16;
  const borderStyle = `2px solid ${isLight ? '#ECEFF9' : 'red'}`;

  return {
    position: 'relative',
    height: `calc(100% - ${margin}px)`,
    marginTop: margin,
    borderTop: borderStyle,

    ...(direction === 'left'
      ? {
          borderLeft: borderStyle,
          borderTopLeftRadius: 20,
        }
      : {
          borderRight: borderStyle,
          borderTopRightRadius: 20,
        }),

    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: 1,
      ...(direction === 'left' ? { left: -7.4 } : { right: -7.4 }),

      width: 13,
      height: 13,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      borderTopLeftRadius: 1,
      transform: 'rotate(225deg)',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: -8,
      ...(direction === 'left' ? { right: 0 } : { left: 0 }),
      width: 2,
      height: 14,
      background: isLight ? '#ECEFF9' : 'red',
      borderRadius: 1,
    },
  };
});

const ChangeContent = styled.div({
  paddingBottom: 16,
  textAlign: 'center',
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '19px',
  letterSpacing: 0.4,
  color: isLight ? '#9FAFB9' : 'red',

  '& > span': {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: isLight ? '#9FAFB9' : 'red',
    marginLeft: 4,
  },
}));

const NetChangeMessage = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 14,
  lineHeight: '17px',
  color: isLight ? '#D1DEE6' : 'red',
}));

const ValuesContainer = styled.div({
  display: 'flex',
  gap: 24,
});
