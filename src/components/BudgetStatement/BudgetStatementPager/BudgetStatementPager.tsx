import { styled } from '@mui/material';
import React, { forwardRef } from 'react';
import PagerArrows from '@/components/PagerArrows/PagerArrows';
import ExpenseReportStatusIndicator from '@/views/CoreUnitBudgetStatement/components/ExpenseReportStatusIndicator/ExpenseReportStatusIndicator';
import type { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
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
  ) => (
    <PagerBar className="no-select" ref={ref}>
      <PagerBarLeft>
        <ArrowContainer className={'no-select'}>
          <PagerArrowStyled
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
          <Label>{currentMonth.toFormat('MMM yyyy').toUpperCase()}</Label>
        </ArrowContainer>
        <ExpenseReportStatusIndicator budgetStatus={budgetStatus} showCTA={showExpenseReportStatusCTA} />
      </PagerBarLeft>

      <Spacer />
      {lastUpdate && (
        <LastUpdate>
          <Since>Last Update</Since>
          <SinceDate>{lastUpdate.setZone('UTC').toFormat('dd-LLL-y HH:mm ZZZZ')}</SinceDate>
        </LastUpdate>
      )}
    </PagerBar>
  )
);

export default BudgetStatementPager;

const PagerBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flex: 1,

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    height: 34,
  },
}));

const PagerBarLeft = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    alignItems: 'center',
    flexDirection: 'row',
  },
}));

const ArrowContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
});

const PagerArrowStyled = styled(PagerArrows)(({ theme }) => ({
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 8,
  },
}));

const Label = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],
  fontSize: 20,
  fontWeight: 700,
  lineHeight: '24px',
  marginLeft: 8,
}));

const Spacer = styled('div')({
  flex: '1',
});

const LastUpdate = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  fontFamily: 'Inter, sans-serif',
});

const Since = styled('div')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.slate[100],
  fontSize: 11,
  lineHeight: 'normal',
  fontStyle: 'normal',
  fontWeight: 600,
  textTransform: 'uppercase',

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 12,
    letterSpacing: 1,
  },
}));

const SinceDate = styled('div')(({ theme }) => ({
  fontFamily: 'OpenSansCondensed,san-serif',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[400],
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  letterSpacing: 1,
  textTransform: 'uppercase',
  marginTop: 4,

  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
  },
}));
