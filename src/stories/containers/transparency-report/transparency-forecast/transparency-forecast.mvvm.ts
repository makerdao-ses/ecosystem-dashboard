import { DateTime } from 'luxon';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useMemo } from 'react';
import { capitalizeSentence } from '../../../../core/utils/string.utils';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';

export const useTransparencyForecastMvvm = (currentMonth: DateTime, propBudgetStatements: BudgetStatementDto[]) => {
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

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: {[id: string]: BudgetStatementWalletDto} = {};

    const budgetStatement = propBudgetStatements.find(bs => bs.month === currentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return [];

    budgetStatement.budgetStatementWallet.forEach(wallet => {
      if (wallet.address) {
        if (!dict[wallet.address.toLowerCase()]) {
          wallet.name = capitalizeSentence(wallet.name);
          dict[wallet.address.toLowerCase()] = wallet;
        }
      }
    });

    return Object.values(dict);
  }, [currentMonth, propBudgetStatements]);

  const getForecastForMonthOnWalletOnBudgetStatement = (budgetStatements: BudgetStatementDto[], walletAddress: string | undefined, currentMonth: DateTime, month: DateTime) => {
    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT)) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet = budgetStatement?.budgetStatementWallet?.find(x => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ?? null;

    if (!wallet) return 0;

    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === month.toFormat(API_MONTH_FORMAT)), i => i.forecast ?? 0);
  };

  const getBudgetCapForMonthOnWalletOnBudgetStatement = (budgetStatements: BudgetStatementDto[], walletAddress: string | undefined, currentMonth: DateTime, month: DateTime) => {
    const budgetStatement = budgetStatements.find(x => x.month === currentMonth?.toFormat(API_MONTH_FORMAT)) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet = budgetStatement?.budgetStatementWallet?.find(x => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ?? null;

    if (!wallet) return 0;

    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === month?.toFormat(API_MONTH_FORMAT)), i => i.budgetCap ?? 0);
  };

  const getForecastSumOfMonthsOnWallet = (budgetStatements: BudgetStatementDto[], walletAddress: string | undefined, currentMonth: DateTime, months: DateTime[]) => {
    let result = 0;

    if (!walletAddress) return result;

    months.forEach(month => {
      result += getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
    });

    return result;
  };

  const getBudgetCapSumOfMonthsOnWallet = (budgetStatements: BudgetStatementDto[], walletAddress: string | undefined, currentMonth: DateTime, months: DateTime[]) => {
    let result = 0;

    if (!walletAddress) return result;

    months.forEach(month => {
      result += getBudgetCapForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
    });

    return result;
  };

  const getForecastSumForMonth = (budgetStatements: BudgetStatementDto[], currentMonth: DateTime, month: DateTime) => {
    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT)) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet?.budgetStatementLineItem?.filter(item => item.month === month.toFormat(API_MONTH_FORMAT)), item => item.forecast ?? 0));
  };

  const getForecastSumForMonths = (budgetStatements: BudgetStatementDto[], currentMonth: DateTime, months: DateTime[]) => {
    let result = 0;

    months.forEach(month => {
      result += getForecastSumForMonth(budgetStatements, currentMonth, month);
    });

    return result;
  };

  const getBudgetCapForMonthOnBudgetStatement = (budgetStatements: BudgetStatementDto[], currentMonth: DateTime, month: DateTime) => {
    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT)) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet?.budgetStatementLineItem?.filter(item => item.month === month.toFormat(API_MONTH_FORMAT)), item => item.budgetCap ?? 0));
  };

  const getTotalQuarterlyBudgetCapOnBudgetStatement = (budgetStatements: BudgetStatementDto[], months: DateTime[]) => {
    let result = 0;

    wallets.forEach(wallet => {
      result += getBudgetCapSumOfMonthsOnWallet(budgetStatements, wallet?.address?.toLowerCase() || '', currentMonth, months);
    });

    return result;
  };

  const breakdownTabs = useMemo(() => {
    if (!propBudgetStatements || propBudgetStatements.length === 0) return [];
    return wallets?.map(wallet => wallet.name);
  }, [propBudgetStatements, currentMonth]);

  const getLineItemsForWalletOnMonth = (budgetStatements: BudgetStatementDto[], currentMonth: DateTime, month: DateTime, walletAddress: string) => {
    const budgetStatement = budgetStatements?.find(bs => bs.month === currentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement) return [];

    return budgetStatement.budgetStatementWallet?.find(wallet => wallet.address?.toLowerCase() === walletAddress?.toLowerCase())?.budgetStatementLineItem.filter(item => item.month === month.toFormat(API_MONTH_FORMAT)) ?? [];
  };

  const getLineItemForecastSumForMonth = (items: BudgetStatementLineItemDto[], month: DateTime) => {
    return _.sumBy(items.filter(item => item.month === month.toFormat(API_MONTH_FORMAT)), item => item.forecast ?? 0);
  };

  const getLineItemForecastSumForMonths = (items: BudgetStatementLineItemDto[], months: DateTime[]) => {
    const formattedMonths = months.map(x => x.toFormat(API_MONTH_FORMAT));
    return _.sumBy(items.filter(item => formattedMonths.indexOf(item.month ?? '') > -1), item => item.forecast ?? 0);
  };

  const getBudgetCapForMonthOnLineItem = (items: BudgetStatementLineItemDto[], month: DateTime) => {
    return _.sumBy(items.filter(item => item.month === month.toFormat(API_MONTH_FORMAT)), item => item.budgetCap ?? 0);
  };

  const getTotalQuarterlyBudgetCapOnLineItem = (items: BudgetStatementLineItemDto[], months: DateTime[]) => {
    const formattedMonths = months.map(x => x.toFormat(API_MONTH_FORMAT));
    return _.sumBy(items.filter(item => formattedMonths.indexOf(item.month ?? '') > -1), item => item.budgetCap ?? 0);
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
    breakdownTabs,
    getLineItemsForWalletOnMonth,
    getLineItemForecastSumForMonth,
    getLineItemForecastSumForMonths,
    getBudgetCapForMonthOnLineItem,
    getTotalQuarterlyBudgetCapOnLineItem,
    wallets
  };
};
