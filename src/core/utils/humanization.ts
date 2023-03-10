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

export const usLocalizedNumber = (num: number): string =>
  num.toLocaleString('en-US', {
    currency: 'USD',
    currencyDisplay: 'symbol',
  });
