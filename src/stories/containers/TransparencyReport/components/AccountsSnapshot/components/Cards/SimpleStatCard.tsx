import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import React from 'react';
import EqualSign from '../SVG/Equals';
import OutlinedCard from './OutlinedCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface SimpleStatCardProps {
  date: string;
  value: number;
  caption: string;
  hasEqualSign?: boolean;
}

const SimpleStatCard: React.FC<SimpleStatCardProps> = ({ date, value, caption, hasEqualSign = false }) => {
  const { isLight } = useThemeContext();
  const isTablet = useMediaQuery(lightTheme.breakpoints.down('desktop_1194'));

  return (
    <Card>
      <Date isLight={isLight} align={hasEqualSign ? 'right' : 'left'}>
        {DateTime.fromISO(date).toFormat('d MMM y')}
      </Date>

      <ContentWrapper>
        {hasEqualSign && (
          <EqualSignContainer>
            <EqualSign width={isTablet ? 16 : 24} height={isTablet ? 10 : 15} />
          </EqualSignContainer>
        )}
        <Wrapper>
          <Value isLight={isLight}>
            {usLocalizedNumber(Math.round(value))} <span>DAI</span>
          </Value>
          <Caption isLight={isLight} position={hasEqualSign ? 'right' : 'left'}>
            {caption}
          </Caption>
        </Wrapper>
      </ContentWrapper>
    </Card>
  );
};

export default SimpleStatCard;

const Card = styled(OutlinedCard)({
  padding: '7px 15px 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '15px 11px 15px 15px',
    minWidth: 182,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    padding: '24px 15px 23px',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '24px 23px 23px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    padding: '24px 31px 23px',
  },
});

const Date = styled.div<WithIsLight & { align: 'right' | 'left' }>(({ isLight, align }) => ({
  color: isLight ? '#708390' : 'red',
  fontWeight: 600,
  fontSize: 11,
  lineHeight: '13px',
  textTransform: 'uppercase',
  textAlign: align,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 12,
    lineHeight: '15px',
    letterSpacing: 1,
    textAlign: 'left',
  },
}));

const ContentWrapper = styled.div({
  display: 'flex',
  marginTop: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 25,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 33,
  },
});

const EqualSignContainer = styled.div({
  marginTop: -3,
  marginRight: 6,

  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 'auto',
    marginTop: 0,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginRight: 16,
    marginTop: 7,
  },
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'baseline',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '19px',
  letterSpacing: 0.3,
  color: isLight ? '#231536' : 'red',
  fontFeatureSettings: "'tnum' on, 'lnum' on",

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

  '& > span': {
    marginLeft: 4,
    fontWeight: 700,
    fontSize: 12,
    lineHeight: '15px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: isLight ? '#9FAFB9' : 'red',

    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '19px',
    },

    [lightTheme.breakpoints.up('desktop_1194')]: {
      fontSize: 16,
    },
  },
}));

const Caption = styled.div<WithIsLight & { position: 'left' | 'right' }>(({ isLight, position }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#708390' : 'red',
  marginTop: 4,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 8,
    textAlign: position,
    ...(position === 'right' && { marginRight: 2 }),
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    fontSize: 16,
    lineHeight: '22px',
    textAlign: 'left',
  },
}));
