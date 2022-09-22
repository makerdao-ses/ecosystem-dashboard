import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useMemo } from 'react';
import { DateTime } from 'luxon';
import { capitalizeSentence } from '../../../../core/utils/string.utils';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date.utils';

export const useTransparencyActualsMvvm = (
  propsCurrentMonth: DateTime,
  budgetStatements: BudgetStatementDto[] | undefined,
  code: string
) => {
  const currentMonth = useMemo(() => propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT), [propsCurrentMonth]);

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWalletDto } = {};

    const budgetStatement = budgetStatements?.find(
      (bs) => bs.month === propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT)
    );

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return [];

    budgetStatement.budgetStatementWallet.forEach((wallet) => {
      if (wallet.address) {
        if (!dict[wallet.address.toLowerCase()]) {
          wallet.name = capitalizeSentence(wallet.name);
          dict[wallet.address.toLowerCase()] = wallet;
        }
      }
    });

    return _.sortBy(Object.values(dict), 'id');
  }, [propsCurrentMonth, budgetStatements, code]);

  const getWalletForecast = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (i) => i.forecast ?? 0
    );
  };

  const getWalletActual = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (i) => i.actual ?? 0
    );
  };

  const getWalletPayment = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (i) => i.payment ?? 0
    );
  };

  const getWalletDifference = (wallet: BudgetStatementWalletDto) => {
    return getWalletForecast(wallet) - getWalletActual(wallet);
  };

  const currentBudgetStatement = useMemo(() => {
    return budgetStatements?.find((x) => x.month === currentMonth) ?? null;
  }, [propsCurrentMonth, code, budgetStatements]);

  const breakdownTabs = useMemo(() => {
    return wallets.map((wallet) => wallet.name);
  }, [currentBudgetStatement, code]);

  const budgetTotalForecast = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
        (item) => item?.forecast ?? 0
      )
    );
  }, [currentBudgetStatement, code]);

  const budgetTotalActual = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
        (item) => item?.actual ?? 0
      )
    );
  }, [currentBudgetStatement, code]);

  const budgetTotalPayment = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
        (item) => item?.payment ?? 0
      )
    );
  }, [currentBudgetStatement, code]);

  const budgetTotalDifference = useMemo(() => {
    return budgetTotalForecast - budgetTotalActual;
  }, [currentBudgetStatement, code]);

  const getGroupForecast = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(
      group.filter((item) => item.month === currentMonth),
      (item) => item.forecast ?? 0
    );
  };

  const getGroupActual = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(
      group.filter((item) => item.month === currentMonth),
      (item) => item.actual ?? 0
    );
  };

  const getGroupDifference = (group: BudgetStatementLineItemDto[]) => {
    return getGroupForecast(group) - getGroupActual(group);
  };

  const getCommentsFromCategory = (group: BudgetStatementLineItemDto[]) => {
    return group
      .filter((item) => item.month === currentMonth)
      .reduce((current, next) => `${current} ${next.comments}`, '');
  };

  const getGroupPayment = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(
      group.filter((item) => item.month === currentMonth),
      (item) => item.payment ?? 0
    );
  };

  return {
    currentBudgetStatement,
    getWalletForecast,
    getWalletActual,
    getWalletDifference,
    getWalletPayment,
    budgetTotalForecast,
    budgetTotalActual,
    budgetTotalDifference,
    budgetTotalPayment,
    getGroupForecast,
    getGroupActual,
    getGroupDifference,
    getCommentsFromCategory,
    getGroupPayment,
    breakdownTabs,
    wallets,
  };
};
