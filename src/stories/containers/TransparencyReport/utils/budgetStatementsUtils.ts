import _ from 'lodash';
import type { BudgetStatementLineItemDto, BudgetStatementWalletDto } from '@ses/core/models/dto/coreUnitDTO';

export const hasWalletGroups = (wallet: BudgetStatementWalletDto) =>
  wallet.budgetStatementLineItem.some((item) => item.group && item.actual);

export const hasExpenses = (wallet: BudgetStatementWalletDto, month: string, isHeadcount = true) =>
  wallet.budgetStatementLineItem
    ?.filter((item) => item.headcountExpense === isHeadcount)
    .some((x) => (x.actual || x.forecast) && x.month === month);

export const getGroupActual = (group: BudgetStatementLineItemDto[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.actual ?? 0
  );

export const getWalletActual = (wallet: BudgetStatementWalletDto, month: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.actual ?? 0
  );

export const getGroupForecast = (group: BudgetStatementLineItemDto[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.forecast ?? 0
  );

export const getWalletForecast = (wallet: BudgetStatementWalletDto, month: string) =>
  _.sumBy(
    wallet.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.forecast ?? 0
  );

export const getGroupDifference = (group: BudgetStatementLineItemDto[], month: string) =>
  getGroupForecast(group, month) - getGroupActual(group, month);

export const getWalletDifference = (wallet: BudgetStatementWalletDto, month: string) =>
  getWalletForecast(wallet, month) - getWalletActual(wallet, month);

export const getGroupPayment = (group: BudgetStatementLineItemDto[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.payment ?? 0
  );

export const getWalletPayment = (wallet: BudgetStatementWalletDto, month: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.payment ?? 0
  );

export const getCommentsFromCategory = (group: BudgetStatementLineItemDto[], month: string) =>
  group
    .filter((item) => item.month === month && item.comments !== undefined)
    .reduce((current, next) => `${current} ${next.comments !== '' ? next.comments : ''}`, '');

export const getLineItemsSubtotal = (
  wallet: BudgetStatementWalletDto,
  isHeadcount: boolean,
  month: string,
  title: string
) => {
  const items = wallet.budgetStatementLineItem.filter((item) => item.headcountExpense === isHeadcount);
  const hasGroups = hasWalletGroups(wallet);

  return (
    items?.reduce(
      (prv, curr) =>
        curr.month === month
          ? {
              group: hasGroups ? title : '',
              budgetCategory: !hasGroups ? title : '',
              actual: prv.actual + curr.actual,
              forecast: (prv?.forecast ?? 0) + (curr?.forecast ?? 0),
              payment: (prv?.payment ?? 0) + (curr?.payment ?? 0),
              month,
            }
          : prv,
      {
        actual: 0,
        forecast: 0,
        payment: 0,
      }
    ) ?? {}
  );
};
