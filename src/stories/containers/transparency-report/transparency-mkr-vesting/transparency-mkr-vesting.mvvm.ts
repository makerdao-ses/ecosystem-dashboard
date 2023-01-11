import _ from 'lodash';
import { useMemo } from 'react';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date.utils';
import type { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

export const useTransparencyMkrVesting = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const currentBudgetStatement = useMemo(
    () => budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
    [currentMonth, budgetStatements]
  );

  const mkrVestings = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return currentBudgetStatement?.budgetStatementMKRVest ?? [];
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const totalAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmount);
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const totalOldAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) return [];

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmountOld);
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const FTEs = useMemo(
    () => _.first(currentBudgetStatement?.budgetStatementFTEs)?.ftes ?? 'N/A',
    [currentBudgetStatement?.budgetStatementFTEs]
  );

  return {
    mkrVestings,
    totalAmount,
    totalOldAmount,
    FTEs,
  };
};
