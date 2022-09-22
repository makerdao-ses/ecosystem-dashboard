export const getTwoInitials = (name: string) => {
  const [, w1, w2] = /(\w+)[^a-zA-Z]*(\w*)?/.exec(name) ?? [];

  return `${(w1 && w1[0].toUpperCase()) ?? ''}${(w2 && w2[0].toUpperCase()) ?? ''}`;
};

export const getMipTitle = (title: string) => {
  if (!title) return '';
  const pieces = title.trim().split(':');
  return pieces;
};

export const formatAddressForOutput = (address: string | undefined) => {
  if (!address) {
    return '';
  }
  return `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length)}`;
};

export const capitalizeWord = (word: string) => {
  return word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

export const capitalizeSentence = (sentence: string) => {
  const words = sentence?.split(' ');

  return words?.map((w) => capitalizeWord(w)).join(' ');
};

export const formatNumber = (number: number) => {
  return number?.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
};

export const formatCode = (code: string) => {
  if (!code) return '';
  const parts = code.split('-');
  if (!parts.length) return code;

  return parts[0];
};
