import { styled } from '@mui/material';
import React, { useMemo } from 'react';
import { BudgetStatus } from '@/core/models/interfaces/types';
import { getExpenseReportStatusColor } from '@/core/utils/colors';

export type ExpenseReportStatusProps = {
  status: BudgetStatus;
} & React.HTMLAttributes<HTMLDivElement>;

const ExpenseReportStatus: React.FC<ExpenseReportStatusProps> = ({ status = BudgetStatus.Draft, ...rest }) => {
  const variantColor = useMemo(() => getExpenseReportStatusColor(status), [status]);

  return (
    <ExpenseReportStatusStyled variantColorSet={variantColor} {...rest}>
      {status}
    </ExpenseReportStatusStyled>
  );
};

export default ExpenseReportStatus;

const ExpenseReportStatusStyled = styled('div')<{ variantColorSet: { [key: string]: string } }>(
  ({ theme, variantColorSet }) => ({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'none',
    padding: '1px 16px',
    borderRadius: 6,
    color: theme.palette.isLight ? variantColorSet.color : variantColorSet.darkColor,
    background: theme.palette.isLight ? variantColorSet.background : variantColorSet.darkBackground,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '22px',
  })
);
