import styled from '@emotion/styled';
import React from 'react';
import KeyStats from '../KeyStats/KeyStats';
import TotalExpenseReportCard from '../components/TotalExpenseReportCard';

interface Props {
  totalDAI: number;
  start: string;
  end: string;
  totalDelegates: number;
  shadowTotal: number;
  annual: number;
  percent: number;
  delegatesExpenses: number;
  otherExpenses: number;
  amountDelegates: number;
}

export const TotalAndKeyStatsComponent: React.FC<Props> = ({
  totalDAI,
  start,
  end,
  annual,
  percent,
  shadowTotal,
  totalDelegates,
  otherExpenses,
  delegatesExpenses,
  amountDelegates,
}) => (
  <BackgroundContainer>
    <TotalExpenseReportCard end={end} start={start} totalDAI={totalDAI} />
    <KeyContainer>
      <KeyStats
        amountDelegates={amountDelegates}
        annual={annual}
        percent={percent}
        shadowTotal={shadowTotal}
        totalDelegates={totalDelegates}
        delegatesExpenses={delegatesExpenses}
        otherExpenses={otherExpenses}
      />
    </KeyContainer>
  </BackgroundContainer>
);

export default TotalAndKeyStatsComponent;

const BackgroundContainer = styled.div({
  background: '#F6F8F9',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  padding: '24px 16px',
  maxWidth: 343,
});

const KeyContainer = styled.div({
  marginTop: 16,
});
