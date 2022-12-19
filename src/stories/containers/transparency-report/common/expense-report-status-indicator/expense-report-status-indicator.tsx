import React from 'react';
import styled from '@emotion/styled';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import ExpenseReportStatus from '../expense-report-status/expense-report-status';
import Link from 'next/link';

export type ExpenseReportStatusIndicatorProps = {
  budgetStatus: BudgetStatus;
  showCTA: boolean;
};

const ExpenseReportStatusIndicator: React.FC<ExpenseReportStatusIndicatorProps> = ({
  budgetStatus = BudgetStatus.Draft,
  showCTA,
}) => {
  return (
    <IndicatorContainer>
      <ExpenseReportStatus status={budgetStatus} />
      {showCTA && budgetStatus !== BudgetStatus.Final && (
        <Link href={'#comments'}>
          <StyledLink>Go to {budgetStatus}</StyledLink>
        </Link>
      )}
    </IndicatorContainer>
  );
};

export default ExpenseReportStatusIndicator;

const IndicatorContainer = styled.div({
  marginLeft: 16,
});

const StyledLink = styled.a({
  marginLeft: 8,
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '16px',
  color: '#447AFB',
  cursor: 'pointer',
});
