import styled from '@emotion/styled';
import React from 'react';
import KeyStatsCard from '../../GenericDelegateCard';
import { DescriptionDelegates, TotalDelegates } from './TotalRecognizedDelegatesCard';

interface Props {
  shadowTotal: string;
}

const ShadowDelegates: React.FC<Props> = ({ shadowTotal }) => (
  <ExtendedGenericDelegate>
    <TotalDelegates>{shadowTotal}</TotalDelegates>
    <DescriptionDelegates>{'Shadow Delegates'}</DescriptionDelegates>
  </ExtendedGenericDelegate>
);

export default ShadowDelegates;

const ExtendedGenericDelegate = styled(KeyStatsCard)({
  padding: '8px 24.5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
