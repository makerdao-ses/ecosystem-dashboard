import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import KeyStats from '../KeyStats/KeyStats';
import TotalExpenseReportCard from '../components/TotalExpenseReportCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

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
}) => {
  const { isLight } = useThemeContext();
  return (
    <BackgroundContainer isLight={isLight}>
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
};

export default TotalAndKeyStatsComponent;

const BackgroundContainer = styled.div<WithIsLight>(({ isLight }) => ({
  background: isLight ? '#F6F8F9' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25);',
  borderRadius: '6px',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
}));

const KeyContainer = styled.div({
  marginTop: 16,
});
