import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { ExpenseReportStatus, getExpenseReportStatusLabel } from '../../../../core/enums/expense-reports-status.enum';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { getExpenseReportStatusColor } from '../../../../core/utils/color.utils';

export type ExpenseReportStatusBtnProps = {
  variant: ExpenseReportStatus;
};
const ExpenseReportStatusBtn: React.FC<ExpenseReportStatusBtnProps> = ({ variant = ExpenseReportStatus.Draft }) => {
  const { isLight } = useThemeContext();
  const label = useMemo(() => {
    return getExpenseReportStatusLabel(variant);
  }, [variant]);
  const variantColor = useMemo(() => {
    return getExpenseReportStatusColor(variant);
  }, [variant]);

  return (
    <ExpenseReportStatusStyled isLight={isLight} variantColorSet={variantColor}>
      {label}
    </ExpenseReportStatusStyled>
  );
};

export default ExpenseReportStatusBtn;

const ExpenseReportStatusStyled = styled.div<{ isLight: boolean; variantColorSet: { [key: string]: string } }>(
  ({ isLight, variantColorSet }) => ({
    display: 'inline-block',
    width: 98,
    textAlign: 'center',
    textTransform: 'none',
    padding: '4px 0',
    borderRadius: 12,
    border: `1px solid ${isLight ? variantColorSet.color : variantColorSet.darkColor}`,
    background: isLight ? variantColorSet.background : variantColorSet.darkBackground,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: isLight ? variantColorSet.color : variantColorSet.darkColor,
  })
);
