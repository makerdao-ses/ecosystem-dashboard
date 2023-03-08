import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import lightTheme from '../../../../../../styles/theme/light';
import { BudgetStatus } from '../../../../../core/models/dto/coreUnitDTO';
import ExpenseReportStatus from '../ExpenseReportStatus/ExpenseReportStatus';

export type ExpenseReportStatusIndicatorProps = {
  budgetStatus: BudgetStatus;
  showCTA: boolean;
};

const ExpenseReportStatusIndicator: React.FC<ExpenseReportStatusIndicatorProps> = ({
  budgetStatus = BudgetStatus.Draft,
  showCTA,
}) => (
  <IndicatorContainer>
    <ExpenseReportStatus status={budgetStatus} />
    {showCTA && budgetStatus !== BudgetStatus.Final && (
      <Link href={'#comments'}>
        <StyledLink>Go to {budgetStatus}</StyledLink>
      </Link>
    )}
  </IndicatorContainer>
);

export default ExpenseReportStatusIndicator;

const IndicatorContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginTop: 8,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
    marginLeft: 16,
  },
});

const StyledLink = styled.a({
  marginLeft: 8,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '18px',
  color: '#447AFB',
  cursor: 'pointer',
  minWidth: 'fit-content',

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
});
