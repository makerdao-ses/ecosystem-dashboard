import styled from '@emotion/styled';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import { DescriptionDelegates } from './TotalRecognizedDelegatesCard';

interface Props {
  annual: number;
}

const MedianAnnualDai: React.FC<Props> = ({ annual }) => {
  const formatted = usLocalizedNumber(annual);
  return (
    <ExtendedGenericDelegate>
      <Annual>{`${formatted} dai`}</Annual>
      <DescriptionDelegates>{'Median Annual Compensation / Delegate'}</DescriptionDelegates>
    </ExtendedGenericDelegate>
  );
};

export default MedianAnnualDai;

const ExtendedGenericDelegate = styled(GenericDelegateCard)({
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
