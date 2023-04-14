import styled from '@emotion/styled';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import Range from './Range';

interface Props {
  start: string;
  end: string;
  totalDAI: number;
}

const TotalExpenseReportCard: React.FC<Props> = ({ start, end, totalDAI }) => {
  const formatted = usLocalizedNumber(totalDAI);
  return (
    <ExtendedGenericDelegate>
      <Text>Total Reported Expenses</Text>
      <RangeContainer>
        <Range start={start} end={end} />
      </RangeContainer>
      <Annual>
        {`${formatted}`}
        <Coin>DAI</Coin>
      </Annual>
    </ExtendedGenericDelegate>
  );
};

export default TotalExpenseReportCard;
const ExtendedGenericDelegate = styled(GenericDelegateCard)({
  padding: '24px 32px',
  height: 138,
  flexDirection: 'column',
  alignItems: 'center',
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

const Annual = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#231536',
  marginBottom: 4,
  textTransform: 'uppercase',
  textAlign: 'center',
});

const Coin = styled.span({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#9FAFB9',
  marginLeft: 6,
  textTransform: 'uppercase',
});

const RangeContainer = styled.div({
  marginBottom: 16,
});
