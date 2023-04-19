import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import { DescriptionDelegates, TotalDelegates } from './TotalRecognizedDelegatesCard';

interface Props {
  shadowTotal: number;
}

const ShadowDelegates: React.FC<Props> = ({ shadowTotal }) => {
  const { isLight } = useThemeContext();
  return (
    <ExtendedGenericDelegate>
      <TotalDelegates isLight={isLight}>{shadowTotal}</TotalDelegates>
      <DescriptionDelegates>Shadow Delegates</DescriptionDelegates>
    </ExtendedGenericDelegate>
  );
};

export default ShadowDelegates;

const ExtendedGenericDelegate = styled(GenericDelegateCard)({
  padding: '16px 22.75px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 143.5,
  flex: 1,
});
