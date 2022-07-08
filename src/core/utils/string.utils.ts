export const getTwoInitials = (name: string) => {
  if (!name) { return ''; }

  name = name.toUpperCase().trim();

  const pieces = name.split(' ');

  return pieces.length > 1 ? pieces[0][0] + pieces[1][0] : pieces[0][0];
};

export const getMipTitle = (title: string) => {
  if (!title) return '';
  const pieces = title.trim().split(':');
  return pieces;
};

export const formatAddressForOutput = (address: string | undefined) => {
  if (!address) { return ''; }
  return `${address.slice(0, 5)}..${address.slice(address.length - 5, address.length - 1)}`;
};

export const capitalizeWord = (word: string) => {
  return word
    .toLowerCase()
    .replace(/\w/, firstLetter => firstLetter.toUpperCase());
};

export const capitalizeSentence = (sentence: string) => {
  const words = sentence.split(' ');

  return words.map(w => capitalizeWord(w)).join(' ');
};

export const formatNumber = (number: number) => {
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
};
