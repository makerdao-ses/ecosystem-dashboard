import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import { BudgetStatus } from '@/core/models/dto/coreUnitDTO';
import { getExpenseReportStatusColor } from '@/core/utils/colors';

export type ExpenseReportStatusProps = {
  status: BudgetStatus;
} & React.HTMLAttributes<HTMLDivElement>;

const ExpenseReportStatus: React.FC<ExpenseReportStatusProps> = ({ status = BudgetStatus.Draft, ...rest }) => {
  const { isLight } = useThemeContext();
  const variantColor = useMemo(() => getExpenseReportStatusColor(status), [status]);

  return (
    <ExpenseReportStatusStyled isLight={isLight} variantColorSet={variantColor} {...rest}>
      {status}
    </ExpenseReportStatusStyled>
  );
};

export default ExpenseReportStatus;

const ExpenseReportStatusStyled = styled.div<{ isLight: boolean; variantColorSet: { [key: string]: string } }>(
  ({ isLight, variantColorSet }) => ({
    display: 'inline-block',
    width: 98,
    textAlign: 'center',
    textTransform: 'none',
    padding: '3px 0',
    borderRadius: 12,
    border: `1px solid ${isLight ? variantColorSet.color : variantColorSet.darkColor}`,
    background: isLight ? variantColorSet.background : variantColorSet.darkBackground,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: isLight ? variantColorSet.color : variantColorSet.darkColor,
  })
);
