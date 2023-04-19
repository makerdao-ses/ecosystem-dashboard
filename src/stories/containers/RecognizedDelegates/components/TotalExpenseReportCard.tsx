import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import Range from './Range';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  start: DateTime;
  end: DateTime;
  totalDAI: number;
}

const TotalExpenseReportCard: React.FC<Props> = ({ start, end, totalDAI }) => {
  const { isLight } = useThemeContext();
  const formatted = usLocalizedNumber(totalDAI);

  return (
    <ExtendedGenericDelegate>
      <ContainerRangeText>
        <Text>Total Reported Expenses</Text>
        <RangeContainer>
          <Range start={start} end={end} />
        </RangeContainer>
      </ContainerRangeText>
      <Annual isLight={isLight}>
        {`${formatted}`}
        <Coin isLight={isLight}>DAI</Coin>
      </Annual>
    </ExtendedGenericDelegate>
  );
};

export default TotalExpenseReportCard;
const ExtendedGenericDelegate = styled(GenericDelegateCard)({
  padding: '24px 31.5px',
  height: 138,
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: 311,
});

const Text = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  color: '#708390',
  marginBottom: 8,
  textAlign: 'center',
});

const Annual = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#231536' : '#EDEFFF',
  marginBottom: 4,
  textTransform: 'uppercase',
  textAlign: 'center',
}));

const Coin = styled.span<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#9FAFB9' : '#708390',
  marginLeft: 6,
  textTransform: 'uppercase',
}));

const RangeContainer = styled.div({
  marginBottom: 16,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const ContainerRangeText = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
