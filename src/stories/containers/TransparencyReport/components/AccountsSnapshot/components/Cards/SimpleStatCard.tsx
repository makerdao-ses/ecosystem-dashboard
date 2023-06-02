import styled from '@emotion/styled';
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

  return (
    <Card>
      <Date isLight={isLight} align={hasEqualSign ? 'right' : 'left'}>
        {DateTime.fromISO(date).toFormat('d MMM y')}
      </Date>

      <ContentWrapper>
        {hasEqualSign && (
          <EqualSignContainer>
            <EqualSign width={16} height={10} />
          </EqualSignContainer>
        )}
        <Wrapper>
          <Value isLight={isLight}>
            {usLocalizedNumber(Math.round(value))} <span>DAI</span>
          </Value>
          <Caption isLight={isLight}>{caption}</Caption>
        </Wrapper>
      </ContentWrapper>
    </Card>
  );
};

export default SimpleStatCard;

const Card = styled(OutlinedCard)({
  padding: '7px 15px 16px',

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '23px 31px',
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
  },
}));

const ContentWrapper = styled.div({
  display: 'flex',
  marginTop: 16,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 33,
  },
});

const EqualSignContainer = styled.div({
  marginTop: -3,
  marginRight: 6,

  [lightTheme.breakpoints.up('table_834')]: {
    marginRight: 16,
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
    fontWeight: 500,
    fontSize: 30,
    lineHeight: '36px',
    letterSpacing: 0.4,
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
  },
}));

const Caption = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 11,
  lineHeight: '13px',
  color: isLight ? '#708390' : 'red',
  marginTop: 4,

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
    lineHeight: '22px',
    marginTop: 8,
  },
}));
