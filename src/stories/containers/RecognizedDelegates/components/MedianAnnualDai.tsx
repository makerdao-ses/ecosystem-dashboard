import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import { DescriptionDelegates } from './TotalRecognizedDelegatesCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  annual: number;
}

const MedianAnnualDai: React.FC<Props> = ({ annual }) => {
  const { isLight } = useThemeContext();
  const formatted = usLocalizedNumber(annual);

  return (
    <ExtendedGenericDelegate>
      <Annual isLight={isLight}>
        {`${formatted}`}
        <span>Dai</span>
      </Annual>

      <DescriptionDelegates>Median Annual Compensation / Delegate</DescriptionDelegates>
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
});

export const Annual = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#24346 : ' : '#EDEFFF',
  marginBottom: 4,
  textTransform: 'uppercase',
  '& span': {
    marginLeft: 2,
    color: isLight ? '#243465' : '#708390',
  },
}));
