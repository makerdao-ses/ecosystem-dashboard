export type HumanizedNumber = {
  value: string;
  suffix: string;
};

export const threeDigitsPrecisionHumanization = (num = 0, isHasAbsoluteValue = false): HumanizedNumber => {
  const absNum = isHasAbsoluteValue ? Math.abs(num) : num;

  if (absNum >= 1000000) {
    return {
      value: (num / 1000000).toPrecision(3),
      suffix: 'M',
    };
  } else if (absNum >= 1000) {
    return {
      value: (num / 1000).toPrecision(3),
      suffix: 'K',
    };
  } else {
    return {
      value: num.toPrecision(3),
      suffix: '',
    };
  }
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
