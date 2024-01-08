import type { DoughnutSeries } from '@ses/containers/Finances/utils/types';

export const chunkArray = (array: DoughnutSeries[], chunkSize: number): Map<number, DoughnutSeries[]> => {
  const result = new Map<number, DoughnutSeries[]>();

  for (let i = 0; i < array.length; i += chunkSize) {
    result.set(i / chunkSize, array.slice(i, i + chunkSize));
  }

  return result;
};
