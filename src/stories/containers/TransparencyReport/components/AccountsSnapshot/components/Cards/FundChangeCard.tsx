import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import DefaultCountUp from '../DefaultCountUp/DefaultCountUp';
import NumberWithSignCard from '../NumberWithSignCard/NumberWithSignCard';
import OutlinedCard from './OutlinedCard';
import type { ValueColor } from '../NumberWithSignCard/NumberWithSignCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface FundChangeCardProps {
  netChange?: number;
  leftValue?: number;
  leftValueColor?: ValueColor;
  leftText: string;
  rightValue?: number;
  rightValueColor?: ValueColor;
  rightText: string;
  dynamicChanges?: boolean;
}

const FundChangeCard: React.FC<FundChangeCardProps> = ({
  netChange,
  leftValue,
  leftValueColor = 'normal',
  leftText,
  rightValue,
  rightValueColor = 'normal',
  rightText,
  dynamicChanges = false,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  return (
    <Card>
      <ChangeContainer>
        <LeftArrowContainer>
          <FillSpace position="left" />
          {isMobile ? <MobileArrow isLight={isLight} position="top" /> : <Arrow isLight={isLight} direction="left" />}
        </LeftArrowContainer>
        <ChangeContent>
          <Value isLight={isLight}>
            {netChange !== undefined ? (
              <>
                {netChange > 0 && '+'}
                {dynamicChanges ? (
                  <DefaultCountUp end={Math.round(netChange)} formattingFn={usLocalizedNumber} />
                ) : (
                  usLocalizedNumber(Math.round(netChange))
                )}
                <div>DAI</div>
              </>
            ) : (
              'N/A'
            )}
          </Value>
          <NetChangeMessage isLight={isLight}>Net Change</NetChangeMessage>
        </ChangeContent>
        <RightArrowContainer>
          {isMobile ? (
            <MobileArrow isLight={isLight} position="bottom" />
          ) : (
            <Arrow isLight={isLight} direction="right" />
          )}
          <FillSpace position="right" />
        </RightArrowContainer>
      </ChangeContainer>
      <ValuesContainer>
        <NumberWithSignCard
          dynamicChanges={dynamicChanges}
          value={leftValue}
          valueColor={leftValueColor}
          sign="positive"
          text={leftText}
        />
        <NumberWithSignCard
          dynamicChanges={dynamicChanges}
          value={rightValue}
          valueColor={rightValueColor}
          sign="negative"
          text={rightText}
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
    minWidth: 390,
    padding: 7,
    flexDirection: 'column',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 579,
    padding: '16px 15px 15px',
  },
});

const ChangeContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
  },
});

const LeftArrowContainer = styled.div({
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 8,
    paddingBottom: 1,
    display: 'flex',
  },
});

const RightArrowContainer = styled.div({
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    marginLeft: 8,
    paddingBottom: 1,
    display: 'flex',
  },
});

const FillSpace = styled.div<{ position: 'left' | 'right' }>(({ position }) => ({
  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: position === 'left' ? 100 : 84,
    height: '100%',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: position === 'left' ? 141 : 112,
  },
}));

const MobileArrow = styled.div<WithIsLight & { position: 'top' | 'bottom' }>(({ isLight, position }) => {
  const borderStyle = `2px solid ${isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)'}`;

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
      background: isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)',
      borderRadius: 1,
    },
  };
});

const Arrow = styled.div<WithIsLight & { direction: 'left' | 'right' }>(({ isLight, direction }) => {
  const margin = 16;
  const borderStyle = `2px solid ${isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)'}`;

  return {
    position: 'relative',
    height: `calc(100% - ${margin}px)`,
    marginTop: margin,
    borderTop: borderStyle,
    width: '100%',

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
      background: isLight ? '#ECEFF9' : 'rgba(72, 73, 95, 0.3)',
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
    marginTop: 0,
    paddingBottom: 8,
    alignItems: 'center',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    paddingBottom: 16,
  },
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '17px',
  letterSpacing: 0.4,
  color: isLight ? '#9FAFB9' : '#546978',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '19px',
  },

  '& > div': {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '17px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: isLight ? '#9FAFB9' : '#31424E',
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
  color: isLight ? '#D1DEE6' : '#405361',
  margin: '4px 10px 3px 0',
  whiteSpace: 'nowrap',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 14,
    lineHeight: '17px',
    margin: 0,
  },
}));

const ValuesContainer = styled.div({
  display: 'flex',
  gap: 8,
  flexDirection: 'column',
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    flexDirection: 'row',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    gap: 24,
  },
});
