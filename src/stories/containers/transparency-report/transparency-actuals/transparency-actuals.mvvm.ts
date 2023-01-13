import _ from 'lodash';
import { useMemo } from 'react';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date.utils';
import { capitalizeSentence } from '../../../../core/utils/string.utils';
import type {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '../../../../core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

export const useTransparencyActualsMvvm = (
  propsCurrentMonth: DateTime,
  budgetStatements: BudgetStatementDto[] | undefined
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
  }, [propsCurrentMonth, budgetStatements]);

  const getWalletForecast = (wallet: BudgetStatementWalletDto) =>
    _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (i) => i.forecast ?? 0
    );

  const getWalletActual = (wallet: BudgetStatementWalletDto) =>
    _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (i) => i.actual ?? 0
    );

  const getWalletPayment = (wallet: BudgetStatementWalletDto) =>
    _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (i) => i.payment ?? 0
    );

  const getWalletDifference = (wallet: BudgetStatementWalletDto) => getWalletForecast(wallet) - getWalletActual(wallet);

  const currentBudgetStatement = useMemo(
    () => budgetStatements?.find((x) => x.month === currentMonth) ?? null,
    [budgetStatements, currentMonth]
  );

  const breakdownTabs = useMemo(() => wallets.map((wallet) => wallet.name), [wallets]);

  const budgetTotalForecast = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.forecast ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalActual = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.actual ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalPayment = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.payment ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalDifference = useMemo(
    () => budgetTotalForecast - budgetTotalActual,
    [budgetTotalForecast, budgetTotalActual]
  );

  const getGroupForecast = (group: BudgetStatementLineItemDto[]) =>
    _.sumBy(
      group.filter((item) => item.month === currentMonth),
      (item) => item.forecast ?? 0
    );

  const getGroupActual = (group: BudgetStatementLineItemDto[]) =>
    _.sumBy(
      group.filter((item) => item.month === currentMonth),
      (item) => item.actual ?? 0
    );

  const getGroupDifference = (group: BudgetStatementLineItemDto[]) => getGroupForecast(group) - getGroupActual(group);

  const getCommentsFromCategory = (group: BudgetStatementLineItemDto[]) =>
    group.filter((item) => item.month === currentMonth).reduce((current, next) => `${current} ${next.comments}`, '');

  const getGroupPayment = (group: BudgetStatementLineItemDto[]) =>
    _.sumBy(
      group.filter((item) => item.month === currentMonth),
      (item) => item.payment ?? 0
    );

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
