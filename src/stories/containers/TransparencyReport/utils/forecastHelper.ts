import { percentageRespectTo } from '@ses/core/utils/math';
const COLORS_BAR = {
  COLOR_GREEN: '#B6EDE7',
  COLOR_GREEN_DARK: '#06554C',
  COLOR_GRAY: '#D1DEE6',
  COLOR_GRAY_STRONG: '#9FAFB9',
  COLOR_YELLOW: '#FEDB88',
  COLOR_RED: '#F77249',
};

export const getProgressiveBarColor = (value: number, valueRelative: number, isLight: boolean): string => {
  if (!valueRelative) return COLORS_BAR.COLOR_GRAY;
  if (!value) return COLORS_BAR.COLOR_GRAY_STRONG;
  let color = '';
  const percent = percentageRespectTo(value, valueRelative);
  if (percent > 0 && percent <= 90) {
    color = isLight ? COLORS_BAR.COLOR_GREEN : 'red';
  }

  if (percent > 90 && percent <= 100) {
    color = isLight ? COLORS_BAR.COLOR_YELLOW : 'red';
  }

  if (percent > 100) {
    color = isLight ? COLORS_BAR.COLOR_RED : 'red';
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
