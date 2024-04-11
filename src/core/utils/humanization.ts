export type HumanizedNumber = {
  value: string;
  suffix: string;
};
export const formatValueScientificNotation = (value: number) => {
  const precisionValue = value.toPrecision(3);
  if (precisionValue.includes('e')) {
    // To avoid scientific notation, we use toFixed
    return parseFloat(precisionValue).toFixed(0);
  }
  return precisionValue;
};
export const threeDigitsPrecisionHumanization = (num = 0, isHasAbsoluteValue = false) => {
  const absNum = isHasAbsoluteValue ? Math.abs(num) : num;
  let value, suffix;

  if (absNum >= 1_000_000) {
    value = num / 1_000_000;
    suffix = 'M';
  } else if (absNum >= 1_000) {
    value = num / 1_000;
    suffix = 'K';
  } else {
    value = num;
    suffix = '';
  }

  // Formatter values for scientific notation
  const formattedValue = formatValueScientificNotation(value);

  return {
    value: formattedValue,
    suffix,
  };
};

export const twoSignificantDigitsHumanization = (num = 0, isHasAbsoluteValue = false) => {
  let value = Math.abs(num);

  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (Math.round(value) >= 100) {
    value /= 1000;
    suffixIndex++;
  }

  return {
    value: `${!isHasAbsoluteValue && num < 0 ? '-' : ''}${value.toPrecision(2)}`,
    suffix: suffixes[suffixIndex],
  };
};

export const usLocalizedNumber = (num: number, decimalPlace = 0): string => {
  const value = num?.toLocaleString('en-US', {
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace,
  });

  return value === '-0' ? '0' : value;
};

export const deleteTwoDecimalPLace = (formattedNumber: string) => {
  if (!formattedNumber) return '';
  if (formattedNumber.slice(-2) === '00') {
    return formattedNumber.slice(0, -3);
  } else {
    return formattedNumber;
  }
};
