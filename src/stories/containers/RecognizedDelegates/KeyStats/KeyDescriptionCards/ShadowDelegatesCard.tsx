import styled from '@emotion/styled';
import React from 'react';
import KeyStatsCard from './KeyStatsCard';
import { DescriptionDelegates, TotalDelegates } from './TotalRecognizedDelegatesCard';

interface Props {
  shadowTotal: string;
}

const ShadowDelegates: React.FC<Props> = ({ shadowTotal }) => (
  <ExtendedKeyCard>
    <TotalDelegates>{shadowTotal}</TotalDelegates>
    <DescriptionDelegates>{'Shadow Delegates'}</DescriptionDelegates>
  </ExtendedKeyCard>
);

export default ShadowDelegates;

const ExtendedKeyCard = styled(KeyStatsCard)({
  padding: '8px 24.5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
