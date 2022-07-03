import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useMemo } from 'react';

export const useTransparencyForecastMvvm = (currentMonth: DateTime) => {
  const firstMonth = useMemo(() => currentMonth.plus({ month: 1 }), [currentMonth]);
  const secondMonth = useMemo(() => currentMonth.plus({ month: 2 }), [currentMonth]);
  const thirdMonth = useMemo(() => currentMonth.plus({ month: 3 }), [currentMonth]);

  const forecastTableHeaders: string[] = useMemo(() => {
    const result = [];

    result.push('Wallet');
    result.push(firstMonth.toFormat('MMMM'));
    result.push(secondMonth.toFormat('MMMM'));
    result.push(thirdMonth.toFormat('MMMM'));
    result.push('3 months');
    result.push('Monthly Budget');
    result.push('Quarterly Budget Cap');
    result.push('External Links');

    return result;
  }, [currentMonth]);

  const getForecastForMonthOnWalletOnBudgetStatement = (budgetStatements: BudgetStatementDto[], walletAddress: string, month: DateTime) => {
    const budgetStatement = budgetStatements.find(x => x.month === month.toFormat('yyyy-MM-01')) ?? null;

    if (!budgetStatement) return 0;

    const wallet = budgetStatement?.budgetStatementWallet?.find(x => x.address === walletAddress) ?? null;

    if (!wallet) return 0;

    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === month.toFormat('yyyy-MM-01')), i => i.forecast ?? 0);
  };

  const getBudgetCapForMonthOnWalletOnBudgetStatement = (budgetStatements: BudgetStatementDto[], walletAddress: string, month: DateTime) => {
    const budgetStatement = budgetStatements.find(x => x.month === month.toFormat('yyyy-MM-01')) ?? null;

    if (!budgetStatement) return 0;

    const wallet = budgetStatement?.budgetStatementWallet?.find(x => x.address === walletAddress) ?? null;

    if (!wallet) return 0;

    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === month.toFormat('yyyy-MM-01')), i => i.budgetCap ?? 0);
  };

  const getForecastSumOfMonthsOnWallet = (budgetStatements: BudgetStatementDto[], walletAddress: string, months: DateTime[]) => {
    let result = 0;

    months.forEach(month => {
      result += getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, month);
    });

    return result;
  };

  const getBudgetCapSumOfMonthsOnWallet = (budgetStatements: BudgetStatementDto[], walletAddress: string, months: DateTime[]) => {
    let result = 0;

    months.forEach(month => {
      result += getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, month);
    });

    return result;
  };

  const getForecastSumForMonth = (budgetStatements: BudgetStatementDto[], month: DateTime) => {
    const formattedMonth = month.toFormat('yyyy-MM-01');
    const budgetStatement = budgetStatements.find(x => x.month === formattedMonth) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet?.budgetStatementLineItem?.filter(item => item.month === formattedMonth), item => item.forecast ?? 0));
  };

  const getForecastSumForMonths = (budgetStatements: BudgetStatementDto[], months: DateTime[]) => {
    let result = 0;

    months.forEach(month => {
      result += getForecastSumForMonth(budgetStatements, month);
    });

    return result;
  };

  const getBudgetCapForMonthOnBudgetStatement = (budgetStatements: BudgetStatementDto[], month: DateTime) => {
    const formattedMonth = month.toFormat('yyyy-MM-01');
    const budgetStatement = budgetStatements.find(x => x.month === formattedMonth) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet?.budgetStatementLineItem?.filter(item => item.month === formattedMonth), item => item.budgetCap ?? 0));
  };

  const getTotalQuarterlyBudgetCapOnBudgetStatement = (budgetStatements: BudgetStatementDto[], months: DateTime[]) => {
    let result = 0;

    budgetStatements[0].budgetStatementWallet.forEach(wallet => {
      result += getBudgetCapSumOfMonthsOnWallet(budgetStatements, wallet?.address || '', months);
    });

    return result;
  };

  return {
    getForecastForMonthOnWalletOnBudgetStatement,
    getBudgetCapForMonthOnWalletOnBudgetStatement,
    getForecastSumOfMonthsOnWallet,
    getBudgetCapSumOfMonthsOnWallet,
    getForecastSumForMonth,
    getForecastSumForMonths,
    getBudgetCapForMonthOnBudgetStatement,
    getTotalQuarterlyBudgetCapOnBudgetStatement,
    forecastTableHeaders,
    firstMonth,
    secondMonth,
    thirdMonth,
  };
};
