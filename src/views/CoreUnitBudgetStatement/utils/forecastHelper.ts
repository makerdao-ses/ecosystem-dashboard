import { ExpenditureLevel } from '@ses/core/enums/expenditureLevelEnum';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { percentageRespectTo } from '@ses/core/utils/math';
import _ from 'lodash';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type {
  BudgetStatementLineItem,
  BudgetStatementWallet,
  Source,
} from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

const COLORS_BAR = {
  COLOR_GREEN: '#A6E3B6',
  COLOR_GREEN_HOVER: '#90DDA5',
  COLOR_GREEN_DARK: '#34A853',
  COLOR_GREEN_DARK_HOVER: '#3BBE5F',
  COLOR_GRAY: '#6F7A85',
  COLOR_GRAY_STRONG: '#8391A7',
  COLOR_ORANGE: '#FFD099',
  COLOR_ORANGE_HOVER: '#FFC480',
  COLOR_ORANGE_DARK: '#FF8A00',
  COLOR_ORANGE_DARK_HOVER: '#FF9619',
  COLOR_RED: '#F4A19A',
  COLOR_RED_HOVER: '#F28E86',
  COLOR_RED_DARK: '#EA4335',
  COLOR_RED_DARK_HOVER: '#EC5649',
};

const COLORS_BORDERS_POPOVER = {
  COLOR_GREEN: '#6EDBD0',
  COLOR_GREEN_DARK: 'rgba(0, 237, 24, 0.4)',
  COLOR_GRAY: '#D1DEE6',
  COLOR_GRAY_STRONG: '#708390',
  COLOR_ORANGE: '#FEDB88',
  COLOR_ORANGE_DARK: 'rgba(255, 130, 55, 0.4)',
  COLOR_RED: '#F99374',
  COLOR_RED_DARK: 'rgba(255, 64, 133, 0.4)',
};

export const getProgressiveBarColor = (
  value: number,
  valueRelative: number,
  isLight: boolean,
  isHover: boolean
): string => {
  if (!valueRelative) return COLORS_BAR.COLOR_GRAY_STRONG;
  if (!value) return COLORS_BAR.COLOR_GRAY;

  let color = '';
  const percent = percentageRespectTo(value, valueRelative);
  if (percent > 0 && percent <= 90) {
    color = isLight
      ? isHover
        ? COLORS_BAR.COLOR_GREEN_HOVER
        : COLORS_BAR.COLOR_GREEN
      : isHover
      ? COLORS_BAR.COLOR_GREEN_DARK_HOVER
      : COLORS_BAR.COLOR_GREEN_DARK;
  }

  if (percent > 90 && percent <= 100) {
    color = isLight
      ? isHover
        ? COLORS_BAR.COLOR_ORANGE_HOVER
        : COLORS_BAR.COLOR_ORANGE
      : isHover
      ? COLORS_BAR.COLOR_ORANGE_DARK_HOVER
      : COLORS_BAR.COLOR_ORANGE_DARK;
  }

  if (percent > 100) {
    color = isLight
      ? isHover
        ? COLORS_BAR.COLOR_RED_HOVER
        : COLORS_BAR.COLOR_RED
      : isHover
      ? COLORS_BAR.COLOR_RED_DARK_HOVER
      : COLORS_BAR.COLOR_RED_DARK;
  }
  return color;
};

export const getDisplacementDashLine = (value: number, valueRelative: number): number => {
  if (valueRelative === 0) return 0;
  if (value === valueRelative) return 0;

  const percentToMove = percentageRespectTo(value, valueRelative);
  if (percentToMove < 100) {
    return 0;
  } else {
    const percentToMove = percentageRespectTo(valueRelative, value);
    const minPercent = Math.min(percentToMove, 100);
    return minPercent === 100 ? 100 : 100 - minPercent;
  }
};

export const getExpenditureLevelForecast = (valueActual: number, budgetCapActual: number): string => {
  if (budgetCapActual === 0) return '0';
  if (valueActual === 0) return 'NO FORECAST';
  const percent = (valueActual * 100) / budgetCapActual;
  let expenditureLevel = '';
  if (percent > 0 && percent <= 75) {
    expenditureLevel = ExpenditureLevel.low;
  }

  if (percent > 75 && percent <= 90) {
    expenditureLevel = ExpenditureLevel.optimal;
  }

  if (percent > 90 && percent <= 100) {
    expenditureLevel = ExpenditureLevel.stretched;
  }
  if (percent > 100) {
    expenditureLevel = ExpenditureLevel.overBudget;
  }

  return expenditureLevel;
};

export const getBorderColor = (value: number, valueRelative: number, isLight: boolean): string => {
  if (!valueRelative) return COLORS_BORDERS_POPOVER.COLOR_GRAY;
  if (!value) return COLORS_BORDERS_POPOVER.COLOR_GRAY_STRONG;
  let color = '';
  const percent = percentageRespectTo(value, valueRelative);
  if (percent > 0 && percent <= 90) {
    color = isLight ? COLORS_BORDERS_POPOVER.COLOR_GREEN : COLORS_BORDERS_POPOVER.COLOR_GREEN_DARK;
  }

  if (percent > 90 && percent <= 100) {
    color = isLight ? COLORS_BORDERS_POPOVER.COLOR_ORANGE : COLORS_BORDERS_POPOVER.COLOR_ORANGE_DARK;
  }

  if (percent > 100) {
    color = isLight ? COLORS_BORDERS_POPOVER.COLOR_RED : COLORS_BORDERS_POPOVER.COLOR_RED_DARK;
  }
  return color;
};
export const getPercentFullBar = (forecast: number, budgetCap: number): number => {
  if (forecast && !budgetCap) return 100;
  if (budgetCap && !forecast) return 0;
  const percent = percentageRespectTo(forecast, budgetCap);
  return percent;
};

export const getTransferRequestSource = (wallet: BudgetStatementWallet): Source => {
  const resultDefault = {
    code: '',
    url: '',
    title: '',
  } as Source;
  const firstElementWithData = wallet?.budgetStatementTransferRequest?.find((item) => item.target.source);
  if (!firstElementWithData) return resultDefault;
  return firstElementWithData.target.source;
};
export const getWalletMonthlyBudgetForeCast = (wallet: BudgetStatementWallet, month: string) => {
  const itemsSum = wallet.budgetStatementLineItem.filter((item) => item.month === month);
  if (itemsSum.length === 0) return 'N/A';
  return _.sumBy(itemsSum, (i) => i.budgetCap ?? 0);
};

export const getForecastForMonthOnWalletOnBudgetStatementOrNA = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

  if (!budgetStatement || !walletAddress) return 'N/A';

  const wallet =
    budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
    null;

  if (!wallet) return 'N/A';
  const itemsToSum = wallet?.budgetStatementLineItem.filter(
    (item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)
  );
  if (itemsToSum.length === 0) return 'N/A';
  return _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
    (i) => i.forecast ?? 0
  );
};
export const sumAllMonths = (values: (number | string)[]) => {
  const noValues = 'N/A';
  let countMoreNA = 0;
  let sum = 0;
  values.forEach((value) => {
    if (typeof value === 'number') {
      sum += value;
      countMoreNA++;
    }
  });
  if (countMoreNA === 0 && sum === 0) {
    return noValues;
  } else {
    return sum;
  }
};

export const getForecastSumOfMonthsOnWalletForeCast = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  months: DateTime[]
) => {
  let result = 0;
  let countNumber = 0;

  if (!walletAddress) return 'N/A';

  months.forEach((month) => {
    const sumOneMonth = getForecastForMonthOnWalletOnBudgetStatementOrNA(
      budgetStatements,
      walletAddress,
      currentMonth,
      month
    );
    if (typeof sumOneMonth === 'number') {
      result += sumOneMonth;
      countNumber++;
    }
  });
  if (result === 0 && countNumber === 0) {
    return 'N/A';
  } else {
    return result;
  }
};

export const getBudgetCapForMonthOnBudgetStatementForeCast = (
  budgetStatements: BudgetStatement[],
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;
  let countNumber = 0;
  const sumTotal = _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
    _.sumBy(
      wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => {
        countNumber++;
        return item.budgetCap ?? 0;
      }
    )
  );

  if (sumTotal === 0 && countNumber === 0) {
    return 'N/A';
  } else {
    return sumTotal;
  }
};

export const getBudgetCapForMonthOnWalletOnBudgetStatementForeCast = (
  budgetStatements: BudgetStatement[],
  walletAddress: string | undefined,
  currentMonth: DateTime,
  month: DateTime
) => {
  const budgetStatement =
    budgetStatements?.find((x) => x.month === currentMonth?.toFormat(API_MONTH_TO_FORMAT)) ?? null;

  if (!budgetStatement || !walletAddress) return 'N/A';

  const wallet =
    budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
    null;

  if (!wallet) return 'N/A';
  const arrayItems = wallet?.budgetStatementLineItem.filter(
    (item) => item.month === month?.toFormat(API_MONTH_TO_FORMAT)
  );
  if (arrayItems.length === 0) return 'N/A';
  const moment = _.sumBy(
    wallet?.budgetStatementLineItem.filter((item) => item.month === month?.toFormat(API_MONTH_TO_FORMAT)),
    (i) => i.budgetCap ?? 9
  );

  return moment;
};

export const getBudgetCapForMonthOnLineItemForeCast = (
  items: BudgetStatementLineItem[],
  month: DateTime
): number | string => {
  let countNumber = 0;
  const itemsSum = items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT));
  if (itemsSum.length === 0) return 'N/A';
  const sumTotal = _.sumBy(itemsSum, (item) => {
    countNumber++;
    return item.budgetCap ?? 0;
  });
  if (sumTotal === 0 && countNumber === 0) {
    return 'N/A';
  } else {
    return sumTotal;
  }
};
