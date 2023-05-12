import { ExpenditureLevel } from '@ses/core/enums/expenditureLevelEnum';
import { percentageRespectTo } from '@ses/core/utils/math';
const COLORS_BAR = {
  COLOR_GREEN: '#B6EDE7',
  COLOR_GREEN_DARK: '#06554C',
  COLOR_GREEN_HOVER: '#1AAB9B',
  COLOR_GRAY: '#D1DEE6',
  COLOR_GRAY_STRONG: '#9FAFB9',
  COLOR_YELLOW: '#FEDB88',
  COLOR_YELLOW_DARK: '#FDC134',
  COLOR_YELLOW_HOVER: '#FDC134',
  COLOR_RED: '#F77249',
  COLOR_RED_DARK: '#EB4714',
  COLOR_RED_HOVER: '#EB4714',
};

const COLORS_BORDERS_POPOVER = {
  COLOR_GREEN: '#6EDBD0',
  COLOR_GREEN_DARK: 'rgba(0, 237, 24, 0.4)',
  COLOR_GRAY: '#D1DEE6',
  COLOR_GRAY_STRONG: '#708390',
  COLOR_YELLOW: '#FEDB88',
  COLOR_YELLOW_DARK: 'rgba(255, 130, 55, 0.4)',
  COLOR_RED: '#F99374',
  COLOR_RED_DARK: 'rgba(255, 64, 133, 0.4)',
};

export const getProgressiveBarColor = (
  value: number,
  valueRelative: number,
  isLight: boolean,
  isHover: boolean
): string => {
  if (!valueRelative) return COLORS_BAR.COLOR_GRAY;
  if (!value) return COLORS_BAR.COLOR_GRAY_STRONG;
  let color = '';
  const percent = percentageRespectTo(value, valueRelative);
  if (percent > 0 && percent <= 90) {
    color = isLight
      ? isHover
        ? COLORS_BAR.COLOR_GREEN_HOVER
        : COLORS_BAR.COLOR_GREEN
      : isHover
      ? 'red'
      : COLORS_BAR.COLOR_GREEN_DARK;
  }

  if (percent > 90 && percent <= 100) {
    color = isLight
      ? isHover
        ? COLORS_BAR.COLOR_YELLOW_HOVER
        : COLORS_BAR.COLOR_YELLOW
      : isHover
      ? 'red'
      : COLORS_BAR.COLOR_YELLOW_DARK;
  }

  if (percent > 100) {
    color = isLight
      ? isHover
        ? COLORS_BAR.COLOR_RED_HOVER
        : COLORS_BAR.COLOR_RED
      : isHover
      ? 'red'
      : COLORS_BAR.COLOR_RED_DARK;
  }
  return color;
};

export const getDisplacementDashLine = (value: number, valueRelative: number): number => {
  if (valueRelative === 0) return 0;
  const percentToMove = percentageRespectTo(value, valueRelative);
  if (percentToMove < 100) {
    return 0;
  } else {
    const displacementPercent = Math.max(percentToMove - 100, 0);
    const displacement = displacementPercent / 2;
    return displacement;
  }
};

export const getExpenditureLevelForecast = (valueActual: number, budgetCapActual: number): string => {
  if (budgetCapActual === 0) return '0';
  if (valueActual === 0) return 'NO FORECAST';
  const percent = (valueActual * 100) / budgetCapActual;
  let expenditureLevel = '';
  if (percent > 0 && percent <= 75) {
    expenditureLevel = ExpenditureLevel.LOW;
  }

  if (percent > 75 && percent <= 90) {
    expenditureLevel = ExpenditureLevel.OPTIMAL;
  }

  if (percent > 90 && percent <= 100) {
    expenditureLevel = ExpenditureLevel.STRETCHED;
  }
  if (percent > 100) {
    expenditureLevel = ExpenditureLevel.OVERBUDGET;
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
    color = isLight ? COLORS_BORDERS_POPOVER.COLOR_YELLOW : COLORS_BORDERS_POPOVER.COLOR_YELLOW_DARK;
  }

  if (percent > 100) {
    color = isLight ? COLORS_BORDERS_POPOVER.COLOR_RED : COLORS_BORDERS_POPOVER.COLOR_RED_DARK;
  }
  return color;
};
