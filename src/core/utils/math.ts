export const percentageRespectTo = (a: number, b: number): number => {
  if (!a || !b) return 0;
  return (a / b) * 100;
};
