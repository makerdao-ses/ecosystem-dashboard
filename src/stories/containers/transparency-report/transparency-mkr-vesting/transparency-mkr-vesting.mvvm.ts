import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';
import _ from 'lodash';

export const useTransparencyMkrVesting = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const currentBudgetStatement = useMemo(() => {
    return budgetStatements.find(bs => bs.month === currentMonth.toFormat(API_MONTH_FORMAT));
  }, [currentMonth, budgetStatements]);

  const mkrVestings = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return currentBudgetStatement?.budgetStatementMKRVest ?? [];
  }, [currentMonth, budgetStatements]);

  const totalAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], mkr => mkr.mkrAmount);
  }, [currentMonth, budgetStatements]);

  const totalOldAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], mkr => mkr.mkrAmountOld);
  }, [currentMonth, budgetStatements]);

  const FTEs = useMemo(() => {
    console.log(currentBudgetStatement);
    return _.first(currentBudgetStatement?.budgetStatementFTEs)?.ftes ?? 0;
  }, [currentMonth, budgetStatements]);

  return {
    mkrVestings,
    totalAmount,
    totalOldAmount,
    FTEs
  };
};
