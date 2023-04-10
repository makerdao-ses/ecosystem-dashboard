import styled from '@emotion/styled';
import React from 'react';
import KeyStatsCard from './KeyStatsCard';
import { DescriptionDelegates } from './TotalRecognizedDelegatesCard';

interface Props {
  percent: string;
}

const PercentageTotalCard: React.FC<Props> = ({ percent }) => (
  <ExtendedKeyCard>
    <Annual>{percent}</Annual>
    <DescriptionDelegatesExtended>{'Percentage of Total DAO Expense Nov 2021 - Jun 2023'}</DescriptionDelegatesExtended>
  </ExtendedKeyCard>
);

export default PercentageTotalCard;

const ExtendedKeyCard = styled(KeyStatsCard)({
  padding: '8px 18.5px',
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

const DescriptionDelegatesExtended = styled(DescriptionDelegates)({
  width: 110,
});
