import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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
      <DescriptionDelegatesExtended>Shadow Delegates</DescriptionDelegatesExtended>
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
    minWidth: 231.5,
    padding: '24px 16px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 142,
    fontWeight: 400,
    padding: '24px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 153.5,
    fontWeight: 500,
    padding: '24px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 209.5,
    padding: '24px 32px',
  },
});

const DescriptionDelegatesExtended = styled(DescriptionDelegates)({
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 400,
    height: 72,
  },
});
