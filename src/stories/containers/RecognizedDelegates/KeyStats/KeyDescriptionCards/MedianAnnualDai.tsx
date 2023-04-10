import styled from '@emotion/styled';
import React from 'react';
import KeyStatsCard from './KeyStatsCard';
import { DescriptionDelegates } from './TotalRecognizedDelegatesCard';

interface Props {
  annual: string;
}

const MedianAnnualDai: React.FC<Props> = ({ annual }) => (
  <ExtendedKeyCard>
    <Annual>{`${annual} dai`}</Annual>
    <DescriptionDelegates>{'Median Annual Compensation / Delegate'}</DescriptionDelegates>
  </ExtendedKeyCard>
);

export default MedianAnnualDai;

const ExtendedKeyCard = styled(KeyStatsCard)({
  padding: '8px 26px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 147,
});

export const Annual = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#243465',
  marginBottom: 4,
  textTransform: 'uppercase',
});
