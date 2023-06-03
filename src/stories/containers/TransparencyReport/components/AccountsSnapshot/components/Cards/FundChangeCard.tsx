import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
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
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <Card>
      <ChangeContainer>
        <LeftArrowContainer>
          {isMobile ? <MobileArrow isLight={isLight} position="top" /> : <Arrow isLight={isLight} direction="left" />}
        </LeftArrowContainer>
        <ChangeContent>
          <Value isLight={isLight}>
            {netChange > 0 && '+'}
            {usLocalizedNumber(Math.round(netChange))} <span>DAI</span>
          </Value>
          <NetChangeMessage isLight={isLight}>Net Change</NetChangeMessage>
        </ChangeContent>
        <RightArrowContainer>
          {isMobile ? (
            <MobileArrow isLight={isLight} position="bottom" />
          ) : (
            <Arrow isLight={isLight} direction="right" />
          )}
        </RightArrowContainer>
      </ChangeContainer>
      <ValuesContainer>
        <NumberWithSignCard
          value={leftValue}
          valueColor={leftValueColor}
          sign="positive"
          text={leftText}
          cardWidth={167}
        />
        <NumberWithSignCard
          value={rightValue}
          valueColor={rightValueColor}
          sign="negative"
          text={rightText}
          cardWidth={167}
        />
      </ValuesContainer>
    </Card>
  );
};

export default FundChangeCard;

const Card = styled(OutlinedCard)({
  padding: 15,
  display: 'flex',
  flexDirection: 'row-reverse',

  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: 579,
  },
});

const ChangeContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const LeftArrowContainer = styled.div({
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: 143,
    marginRight: 8,
    paddingBottom: 1,
  },
});

const RightArrowContainer = styled.div({
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    paddingRight: 113,
    marginLeft: 8,
    paddingBottom: 1,
  },
});

const MobileArrow = styled.div<WithIsLight & { position: 'top' | 'bottom' }>(({ isLight, position }) => {
  const borderStyle = `2px solid ${isLight ? '#ECEFF9' : 'red'}`;

  return {
    position: 'relative',
    height: position === 'top' ? 14 : 10,
    borderRight: borderStyle,
    marginLeft: 8,
    marginRight: 42,

    ...(position === 'top'
      ? {
          marginTop: 22,
          borderTop: borderStyle,
          borderTopRightRadius: 20,
        }
      : {
          marginBottom: 16,
          borderBottom: borderStyle,
          borderBottomRightRadius: 20,
        }),

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      ...(position === 'top' ? { top: -7.4 } : { bottom: -7.4 }),

      width: 13,
      height: 13,
      borderTop: borderStyle,
      borderLeft: borderStyle,
      borderTopLeftRadius: 1,
      transform: 'rotate(-45deg)',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      right: -10,
      ...(position === 'top' ? { bottom: 0 } : { top: 0 }),
      width: 20,
      height: 2,
      background: isLight ? '#ECEFF9' : 'red',
      borderRadius: 1,
    },
  };
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
          width: 'calc(100% - 25px)',
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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginTop: 2,

  [lightTheme.breakpoints.up('table_834')]: {
    paddingBottom: 16,
    textAlign: 'center',
    marginLeft: -25,
  },
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '17px',
  letterSpacing: 0.4,
  color: isLight ? '#9FAFB9' : 'red',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '19px',
  },

  '& > span': {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: isLight ? '#9FAFB9' : 'red',
    marginLeft: 4,

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '19px',
    },
  },
}));

const NetChangeMessage = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#D1DEE6' : 'red',
  margin: '4px 10px 3px 0',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 14,
    lineHeight: '17px',
  },
}));

const ValuesContainer = styled.div({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    gap: 24,
  },
});
