import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import KeyStats from '../KeyStats/KeyStats';
import TotalExpenseReportCard from '../components/TotalExpenseReportCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  totalDAI: number;
  start: DateTime;
  end: DateTime;
  totalDelegates: number;
  shadowTotal: number;
  annual: number;
  delegatesExpenses: number;
  otherExpenses: number;
}

export const TotalAndKeyStatsComponent: React.FC<Props> = ({
  totalDAI,
  start,
  end,
  annual,
  shadowTotal,
  totalDelegates,
  otherExpenses,
  delegatesExpenses,
}) => {
  const { isLight } = useThemeContext();
  return (
    <BackgroundContainer isLight={isLight}>
      <TotalExpenseReportCard end={end} start={start} totalDAI={totalDAI} />
      <KeyContainer>
        <KeyStats
          annual={annual}
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
  [lightTheme.breakpoints.up('table_834')]: {
    padding: '16px',
  },
}));

const KeyContainer = styled.div({
  marginTop: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 8,
  },
});
