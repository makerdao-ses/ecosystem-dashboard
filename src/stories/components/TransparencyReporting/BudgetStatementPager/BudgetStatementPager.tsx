import styled from '@emotion/styled';
import { CustomPager } from '@ses/components/CustomPager/CustomPager';
import ExpenseReportStatusIndicator from '@ses/containers/TransparencyReport/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { forwardRef } from 'react';
import type { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface BudgetStatementPagerProps {
  currentMonth: DateTime;
  handlePrevious: () => void;
  handleNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  budgetStatus?: BudgetStatus;
  showExpenseReportStatusCTA: boolean;
  lastUpdate?: DateTime;
}

const BudgetStatementPager = forwardRef<HTMLDivElement, BudgetStatementPagerProps>(
  (
    {
      currentMonth,
      handleNext,
      handlePrevious,
      hasNext,
      hasPrevious,
      budgetStatus,
      showExpenseReportStatusCTA,
      lastUpdate,
    },
    ref
  ) => {
    const { isLight } = useThemeContext();

    return (
      <PagerBar className="no-select" ref={ref}>
        <PagerBarLeft>
          <CustomPager
            label={currentMonth.toFormat('MMM yyyy').toUpperCase()}
            onPrev={handlePrevious}
            onNext={handleNext}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
          />
          <ExpenseReportStatusIndicator budgetStatus={budgetStatus} showCTA={showExpenseReportStatusCTA} />
        </PagerBarLeft>

        <Spacer />
        {lastUpdate && (
          <LastUpdate>
            <Since isLight={isLight}>Last Update</Since>
            <SinceDate>{lastUpdate.setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}</SinceDate>
          </LastUpdate>
        )}
      </PagerBar>
    );
  }
);

export default BudgetStatementPager;

const PagerBar = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,

  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    height: '34px',
  },
});

const PagerBarLeft = styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('table_834')]: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const Spacer = styled.div({
  flex: '1',
});

const LastUpdate = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  fontFamily: 'Inter, sans-serif',
});

const Since = styled.div<WithIsLight>(({ isLight = true }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: '11px',
  lineHeight: '15px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '12px',
  },
}));

const SinceDate = styled.div({
  color: '#708390',
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '1px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  marginTop: '2px',
  textAlign: 'right',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: '12px',
    marginTop: '4px',
  },
});
