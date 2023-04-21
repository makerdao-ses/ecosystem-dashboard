import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
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
  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: 235.33,
    padding: '24px 16px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 235.33,
    padding: '24px 16px',
  },
});
