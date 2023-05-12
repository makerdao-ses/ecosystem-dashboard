import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
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
      <Date isLight={isLight}>{DateTime.fromISO(date).toFormat('d MMM y')}</Date>

      <ContentWrapper>
        {hasEqualSign && (
          <EqualSignContainer>
            <EqualSign />
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
  padding: '23px 31px',
});

const Date = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#708390' : 'red',
  fontWeight: 600,
  fontSize: 12,
  lineHeight: '15px',
  letterSpacing: 1,
  textTransform: 'uppercase',
}));

const ContentWrapper = styled.div({
  display: 'flex',
  marginTop: 33,
});

const EqualSignContainer = styled.div({
  paddingTop: 7,
  marginRight: 16,
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'baseline',
  fontWeight: 500,
  fontSize: 30,
  lineHeight: '36px',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : 'red',

  '& > span': {
    marginLeft: 4,
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '19px',
    letterSpacing: 0.3,
    fontFeatureSettings: "'tnum' on, 'lnum' on",
    color: isLight ? '#9FAFB9' : 'red',
  },
}));

const Caption = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 16,
  lineHeight: '22px',
  color: isLight ? '#708390' : 'red',
  marginTop: 8,
}));
