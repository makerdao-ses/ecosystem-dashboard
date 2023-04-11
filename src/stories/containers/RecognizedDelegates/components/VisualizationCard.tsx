import styled from '@emotion/styled';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import GenericDelegateCard from './GenericDelegateCard';
import LegendItem from './LegendItem';
import { RelativeDelegateBar } from './RelativeDelegateBar';

interface Props {
  percent: number;
  totalDai: number;
  recognizedNumberDelegate?: number;
}

const VisualizationCard: React.FC<Props> = ({ percent, recognizedNumberDelegate, totalDai }) => {
  const totalDaiFormatted = usLocalizedNumber(totalDai);
  return (
    <ExtendedKeyStatsCard>
      <Legend>
        <LegendItem color="#ECF1F3" description="Other Expenses" />
        <LegendItem color="#447AFB" description={`Recognized Delegates (${recognizedNumberDelegate})`} />
      </Legend>
      <ContainerBar>
        <BarPercent>
          <RelativeDelegateBar otherExpenses={90} recognizedDelegates={15} />
        </BarPercent>
        <BarDescription>
          <NumberPercent>{`${percent}%`}</NumberPercent>
          <Total>
            {totalDaiFormatted}
            <span>DAI</span>
          </Total>
        </BarDescription>
      </ContainerBar>
    </ExtendedKeyStatsCard>
  );
};

export default VisualizationCard;

const ExtendedKeyStatsCard = styled(GenericDelegateCard)({
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const Legend = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const ContainerBar = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const BarPercent = styled.div({
  width: 122,
  height: 24,
});
const BarDescription = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 157,
});

const NumberPercent = styled.div({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: ' 0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#243465',
  marginRight: 9,
});

const Total = styled.div({
  fontFamily: 'Inter,san-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: '#243465',
  marginTop: 1,
  '& > span': {
    fontWeight: 600,
    color: '#9FAFB9',
    fontFeatureSettings: "'tnum' on, 'lnum' on",
  },
});
