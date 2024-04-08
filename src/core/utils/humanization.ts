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

  if (absNum >= 1000000) {
    value = num / 1000000;
    suffix = 'M';
  } else if (absNum >= 1000) {
    value = num / 1000;
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
