import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import { DescriptionDelegates } from './TotalRecognizedDelegatesCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  annual: number;
}

const MedianAnnualDai: React.FC<Props> = ({ annual }) => {
  const { isLight } = useThemeContext();
  const formatted = usLocalizedNumber(annual, 2);

  return (
    <ExtendedGenericDelegate>
      <Annual isLight={isLight}>
        {`${formatted}`}
        <span>Dai</span>
      </Annual>

      <DescriptionDelegatesExtended>Median Annual Compensation / Delegate</DescriptionDelegatesExtended>
    </ExtendedGenericDelegate>
  );
};

export default MedianAnnualDai;

const ExtendedGenericDelegate = styled(GenericDelegateCard)({
  padding: '16px 26px',
  display: 'flex',
  minWidth: 311,
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  [lightTheme.breakpoints.up('table_834')]: {
    minWidth: 243,
    padding: '24px 16px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    minWidth: 216,
    fontWeight: 400,
    padding: '24px 16px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 188.67,
    padding: '24px 10px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 220.67,
    padding: '24px 16px',
  },
});

export const Annual = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9 : ' : '#EDEFFF',
  marginBottom: 4,
  textTransform: 'uppercase',
  '& span': {
    marginLeft: 4,
    color: isLight ? '#9FAFB9' : '#708390',
  },
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '36px',
    marginBottom: 8,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginBottom: -1,
    letterSpacing: '0.3px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    letterSpacing: '0.3px',
  },
}));

const DescriptionDelegatesExtended = styled(DescriptionDelegates)({
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: -8,
    textAlign: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1194')]: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'end',
    fontWeight: 400,
    height: 72,
    marginTop: -22,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginTop: -12,
    paddingLeft: 14,
    paddingRight: 14,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: -14,
    paddingLeft: 0,
    paddingRight: 0,
  },
});
