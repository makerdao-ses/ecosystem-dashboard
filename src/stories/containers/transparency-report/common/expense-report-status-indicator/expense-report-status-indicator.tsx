import React from 'react';
import styled from '@emotion/styled';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import ExpenseReportStatus from '../expense-report-status/expense-report-status';

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
      {showCTA && budgetStatus !== BudgetStatus.Final && <StyledLink>Go to {budgetStatus}</StyledLink>}
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
});
