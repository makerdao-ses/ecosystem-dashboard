import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
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
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '30px',
    lineHeight: '36px',
    fontWeight: 500,
    marginBottom: 8,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 4,
  },
}));

export const DescriptionDelegates = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '13px',
  color: '#708390',
  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: 500,
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    alignItems: 'center',
    display: 'flex',
    textAlign: 'center',
    height: 72,
    fontWeight: 400,
  },
});
