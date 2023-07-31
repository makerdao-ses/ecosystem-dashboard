import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import _ from 'lodash';
import type { InnerTableColumn } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type {
  BudgetStatementLineItem,
  BudgetStatementTransferRequest,
  BudgetStatementWallet,
} from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

export const hasWalletGroups = (wallet: BudgetStatementWallet) =>
  wallet.budgetStatementLineItem.some((item) => item.group && item.actual);

export const hasGroupExpenses = (wallet: BudgetStatementWallet, group: string, month: string, isHeadcount = true) =>
  wallet.budgetStatementLineItem
    ?.filter((item) => !!item.headcountExpense === isHeadcount && (item.group === group || (!item.group && !group)))
    .some((x) => (x.actual || x.forecast) && x.month === month);

export const getGroupActual = (group: BudgetStatementLineItem[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.actual ?? 0
  );

export const getWalletMonthlyBudget = (wallet: BudgetStatementWallet, month: string) =>
  _.sumBy(
    wallet.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.budgetCap ?? 0
  );

export const getWalletActual = (wallet: BudgetStatementWallet, month: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.actual ?? 0
  );

export const getGroupMonthlyBudget = (group: BudgetStatementLineItem[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.budgetCap ?? 0
  );

export const getGroupForecast = (group: BudgetStatementLineItem[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.forecast ?? 0
  );

export const getWalletForecast = (wallet: BudgetStatementWallet, month: string) =>
  _.sumBy(
    wallet.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.forecast ?? 0
  );

export const getGroupDifference = (group: BudgetStatementLineItem[], month: string) =>
  getGroupForecast(group, month) - getGroupActual(group, month);

export const getWalletDifference = (wallet: BudgetStatementWallet, month: string) =>
  getWalletForecast(wallet, month) - getWalletActual(wallet, month);

export const getGroupPayment = (group: BudgetStatementLineItem[], month: string) =>
  _.sumBy(
    group.filter((item) => item.month === month),
    (item) => item.payment ?? 0
  );

export const getWalletPayment = (wallet: BudgetStatementWallet, month: string) =>
  _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month),
    (i) => i.payment ?? 0
  );

export const getCommentsFromCategory = (group: BudgetStatementLineItem[], month: string) =>
  group
    .filter((item) => item.month === month && item.comments !== undefined)
    .reduce((current, next) => `${current} ${next.comments !== '' ? next.comments : ''}`, '');

export const reduceLineItemsToTotals = (lineItems: BudgetStatementLineItem[]) =>
  lineItems.reduce(
    (prv, curr) => ({
      group: curr.group,
      budgetCap: (prv.budgetCap ?? 0) + (curr.budgetCap ?? 0),
      actual: prv.actual + curr.actual,
      forecast: (prv.forecast ?? 0) + (curr.forecast ?? 0),
      payment: (prv.payment ?? 0) + (curr.payment ?? 0),
      month: curr.month,
    }),
    {
      budgetCap: 0,
      actual: 0,
      forecast: 0,
      payment: 0,
    }
  );

// forecast

export const hasExpensesInRange = (
  lineItems: BudgetStatementLineItem[],
  currentMonth: DateTime,
  months: DateTime[],
  isHeadcount = true
) => {
  const formattedCurrentMonth = currentMonth.toFormat(API_MONTH_TO_FORMAT);
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
  return lineItems.some((item) => {
    if (!!item.headcountExpense !== isHeadcount) return false;
    if (item.month === formattedCurrentMonth) return !!item.budgetCap;
    return formattedMonths.includes(item.month ?? '') && (item.budgetCap || item.forecast);
  });
};

export const getForecastForMonthOnWalletOnBudgetStatement = (
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
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
  budgetStatements: BudgetStatement[],
  months: DateTime[],
  wallets: BudgetStatementWallet[],
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
  budgetStatements: BudgetStatement[],
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

export const getLineItemForecastSumForMonth = (items: BudgetStatementLineItem[], month: DateTime) =>
  _.sumBy(
    items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (item) => item.forecast ?? 0
  );

export const getLineItemForecastSumForMonths = (items: BudgetStatementLineItem[], months: DateTime[]) => {
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
  return _.sumBy(
    items.filter((item) => formattedMonths.includes(item.month ?? '')),
    (item) => item.forecast ?? 0
  );
};

export const getBudgetCapForMonthOnLineItem = (items: BudgetStatementLineItem[], month: DateTime) =>
  _.sumBy(
    items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (item) => item.budgetCap ?? 0
  );

export const getTotalQuarterlyBudgetCapOnLineItem = (items: BudgetStatementLineItem[], months: DateTime[]) => {
  const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
  return _.sumBy(
    items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
    (item) => item.budgetCap ?? 0
  );
};

export const getExtraEmptyColumnsForHeaders = (breakdownColumns: InnerTableColumn[]) => [
  // column 0 would be the header column
  {
    column: breakdownColumns[1],
    value: '',
  },
  {
    column: breakdownColumns[2],
    value: '',
  },
  {
    column: breakdownColumns[3],
    value: '',
  },
  {
    column: breakdownColumns[4],
    value: '',
  },
  {
    column: breakdownColumns[5],
    value: '',
  },
  {
    column: breakdownColumns[6],
    value: '',
  },
];

export const getTransferRequestTargetBalanceColumn = (wallet: BudgetStatementWallet) => {
  const targetWithTimeSpan: Pick<BudgetStatementTransferRequest, 'target' | 'walletBalanceTimeStamp'> =
    {} as BudgetStatementTransferRequest;

  const lastIndex = (wallet?.budgetStatementTransferRequest ?? []).length - 1;
  if (wallet?.budgetStatementTransferRequest && wallet.budgetStatementTransferRequest.length > 0) {
    targetWithTimeSpan.target = wallet.budgetStatementTransferRequest[lastIndex].target;
    targetWithTimeSpan.walletBalanceTimeStamp =
      wallet.budgetStatementTransferRequest[lastIndex]?.walletBalanceTimeStamp;
  }

  return targetWithTimeSpan;
};
