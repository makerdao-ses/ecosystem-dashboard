import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import _ from 'lodash';
import type {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

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

export const getWalletMonthlyBudget = (wallet: BudgetStatementWalletDto, month: string) =>
  _.sumBy(
    wallet.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.budgetCap ?? 0
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

// forecast

export const getForecastForMonthOnWalletOnBudgetStatement = (
  budgetStatements: BudgetStatementDto[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

  if (!budgetStatement || !walletAddress) return 0;

  const wallet =
    budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
    null;

  if (!wallet) return 0;

  return _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (i) => i.forecast ?? 0
  );
};

export const getBudgetCapForMonthOnWalletOnBudgetStatement = (
  budgetStatements: BudgetStatementDto[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement =
    budgetStatements?.find((x) => x.month === currentMonth?.toFormat(API_MONTH_TO_FORMAT)) ?? null;

  if (!budgetStatement || !walletAddress) return 0;

  const wallet =
    budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
    null;

  if (!wallet) return 0;

  return _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month?.toFormat(API_MONTH_TO_FORMAT)),
    (i) => i.budgetCap ?? 0
  );
};

export const getForecastSumOfMonthsOnWallet = (
  budgetStatements: BudgetStatementDto[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  months: DateTime[]
) => {
  let result = 0;

  if (!walletAddress) return result;

  months.forEach((month) => {
    result += getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
  });

  return result;
};

export const getBudgetCapSumOfMonthsOnWallet = (
  budgetStatements: BudgetStatementDto[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  months: DateTime[]
) => {
  let result = 0;

  if (!walletAddress) return result;

  months.forEach((month) => {
    result += getBudgetCapForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
  });

  return result;
};

export const getForecastSumForMonth = (
  budgetStatements: BudgetStatementDto[],
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

  return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
    _.sumBy(
      wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => item.forecast ?? 0
    )
  );
};

export const getForecastSumForMonths = (
  budgetStatements: BudgetStatementDto[],
  currentMonth: DateTime,
  months: DateTime[]
) => {
  let result = 0;

  months.forEach((month) => {
    result += getForecastSumForMonth(budgetStatements, currentMonth, month);
  });

  return result;
};

export const getBudgetCapForMonthOnBudgetStatement = (
  budgetStatements: BudgetStatementDto[],
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

  return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
    _.sumBy(
      wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => item.budgetCap ?? 0
    )
  );
};

export const getTotalQuarterlyBudgetCapOnBudgetStatement = (
  budgetStatements: BudgetStatementDto[],
  months: DateTime[],
  wallets: BudgetStatementWalletDto[],
  currentMonth: DateTime
) => {
  let result = 0;

  wallets.forEach((wallet) => {
    result += getBudgetCapSumOfMonthsOnWallet(
      budgetStatements,
      wallet?.address?.toLowerCase() || '',
      currentMonth,
      months
    );
  });

  return result;
};

export const getLineItemsForWalletOnMonth = (
  budgetStatements: BudgetStatementDto[],
  currentMonth: DateTime,
  month: DateTime,
  walletAddress: string
) => {
  const budgetStatement = budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

  if (!budgetStatement) return [];

  return (
    budgetStatement.budgetStatementWallet
      ?.find((wallet) => wallet.address?.toLowerCase() === walletAddress?.toLowerCase())
      ?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)) ?? []
  );
};

export const getLineItemForecastSumForMonth = (items: BudgetStatementLineItemDto[], month: DateTime) =>
  _.sumBy(
    items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (item) => item.forecast ?? 0
  );

export const getLineItemForecastSumForMonths = (items: BudgetStatementLineItemDto[], months: DateTime[]) => {
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
  return _.sumBy(
    items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
    (item) => item.forecast ?? 0
  );
};

export const getBudgetCapForMonthOnLineItem = (items: BudgetStatementLineItemDto[], month: DateTime) =>
  _.sumBy(
    items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (item) => item.budgetCap ?? 0
  );

export const getTotalQuarterlyBudgetCapOnLineItem = (items: BudgetStatementLineItemDto[], months: DateTime[]) => {
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
  return _.sumBy(
    items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
    (item) => item.budgetCap ?? 0
  );
};
