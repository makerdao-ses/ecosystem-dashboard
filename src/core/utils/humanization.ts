export type HumanizedNumber = {
  value: string;
  suffix: string;
};

export const threeDigitsPrecisionHumanization = (num: number): HumanizedNumber => {
  if (num >= 1000000) {
    return {
      value: (num / 1000000).toPrecision(3),
      suffix: 'M',
    };
  } else if (num >= 1000) {
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

export const usLocalizedNumber = (num: number, decimalPlace = 0): string =>
  num?.toLocaleString('en-US', {
    currency: 'USD',
    currencyDisplay: 'symbol',
    minimumFractionDigits: decimalPlace,
  });

export const deleteTwoDecimalPLace = (formattedNumber: string) => {
  if (!formattedNumber) return '';
  if (formattedNumber.slice(-2) === '00') {
    return formattedNumber.slice(0, -3);
  } else {
    return formattedNumber;
  }
};
