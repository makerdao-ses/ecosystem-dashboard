import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  total: number;
}

const TotalRecognizedDelegates: React.FC<Props> = ({ total }) => {
  const { isLight } = useThemeContext();
  return (
    <ExtendedGenericDelegate>
      <TotalDelegates isLight={isLight}>{total}</TotalDelegates>
      <DescriptionDelegates>Recognized Delegates</DescriptionDelegates>
    </ExtendedGenericDelegate>
  );
};

export default TotalRecognizedDelegates;

const ExtendedGenericDelegate = styled(GenericDelegateCard)({
  padding: '16px 13.25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 143.5,
  flex: 1,
});

export const TotalDelegates = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#243465' : '#EDEFFF',
  marginBottom: 4,
}));

export const DescriptionDelegates = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#708390',
});
