// File for calc
import _ from 'lodash';
import { API_MONTH_TO_FORMAT } from './date';
import { capitalizeSentence } from './string';
import type {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '../models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

export const getAllWallets = (propBudgetStatements: BudgetStatementDto[] | undefined, currentMonth: DateTime) => {
  const dict: { [id: string]: BudgetStatementWalletDto } = {};

  const budgetStatement = propBudgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

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
};

export const getWalletForecast = (wallet: BudgetStatementWalletDto, currentMonth: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
    (i) => i.forecast ?? 0
  );

export const getWalletActual = (wallet: BudgetStatementWalletDto, currentMonth: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
    (i) => i.actual ?? 0
  );
export const getWalletPayment = (wallet: BudgetStatementWalletDto, currentMonth: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
    (i) => i.payment ?? 0
  );

export const getWalletDifference = (wallet: BudgetStatementWalletDto, currentMonth: string) =>
  getWalletForecast(wallet, currentMonth) - getWalletActual(wallet, currentMonth);

export const budgetTotalForecast = (currentBudgetStatement: BudgetStatementDto, currentMonth: string) =>
  _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
    _.sumBy(
      wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (item) => item?.forecast ?? 0
    )
  );

export const budgetTotalActual = (currentBudgetStatement: BudgetStatementDto, currentMonth: string) =>
  _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
    _.sumBy(
      wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (item) => item?.actual ?? 0
    )
  );

export const budgetTotalPayment = (currentBudgetStatement: BudgetStatementDto, currentMonth: string) =>
  _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
    _.sumBy(
      wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
      (item) => item?.payment ?? 0
    )
  );

export const budgetTotalDifference = (wallet: BudgetStatementDto, currentMonth: string) =>
  budgetTotalForecast(wallet, currentMonth) - budgetTotalActual(wallet, currentMonth);

export const getGroupForecast = (group: BudgetStatementLineItemDto[], currentMonth: string) =>
  _.sumBy(
    group.filter((item) => item.month === currentMonth),
    (item) => item.forecast ?? 0
  );

export const getGroupActual = (group: BudgetStatementLineItemDto[], currentMonth: string) =>
  _.sumBy(
    group.filter((item) => item.month === currentMonth),
    (item) => item.actual ?? 0
  );

export const currentBudgetStatementWorking = (
  budgetStatement: BudgetStatementDto[] | undefined,
  currentMonth: string
) => budgetStatement?.find((x) => x.month === currentMonth) ?? null;
