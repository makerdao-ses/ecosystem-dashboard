import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';
import _ from 'lodash';

export const useTransparencyMkrVesting = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const mkrVestings = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return budgetStatements.find(bs => bs.month === currentMonth.toFormat(API_MONTH_FORMAT))?.budgetStatementMKRVest ?? [];
  }, [currentMonth, budgetStatements]);

  const totalAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return _.sumBy(budgetStatements.find(bs => bs.month === currentMonth.toFormat(API_MONTH_FORMAT))?.budgetStatementMKRVest ?? [], mkr => mkr.mkrAmount);
  }, [currentMonth, budgetStatements]);

  const totalOldAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return _.sumBy(budgetStatements.find(bs => bs.month === currentMonth.toFormat(API_MONTH_FORMAT))?.budgetStatementMKRVest ?? [], mkr => mkr.mkrAmountOld);
  }, [currentMonth, budgetStatements]);

  return {
    mkrVestings,
    totalAmount,
    totalOldAmount
  };
};
