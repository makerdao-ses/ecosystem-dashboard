export const truncateDecimal = (num: number, places: number) => {
  const multiplier = Math.pow(10, places);
  return Math.trunc(num * multiplier) / multiplier;
};
