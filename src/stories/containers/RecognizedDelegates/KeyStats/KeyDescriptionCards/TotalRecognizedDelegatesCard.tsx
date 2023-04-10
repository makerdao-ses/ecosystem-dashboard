import styled from '@emotion/styled';
import React from 'react';
import KeyStatsCard from './KeyStatsCard';

interface Props {
  total: number;
}

const TotalRecognizedDelegates: React.FC<Props> = ({ total }) => (
  <ExtendedKeyCard>
    <TotalDelegates>{total}</TotalDelegates>
    <DescriptionDelegates>{'Recognized Delegates'}</DescriptionDelegates>
  </ExtendedKeyCard>
);

export default TotalRecognizedDelegates;

const ExtendedKeyCard = styled(KeyStatsCard)({
  padding: '8px 15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const TotalDelegates = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#243465',
  marginBottom: 4,
});

export const DescriptionDelegates = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',

  color: '#708390',
});
