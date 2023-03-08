export const isValidQuarterFormat = (quarter: string): boolean => /\d{4} [Qq][1-4]/.test(quarter);

export const parseQuarter = (quarter: string): [number, number] => {
  const [year, quarterNumber] = quarter.toLocaleLowerCase().trim().split('-');
  return [parseInt(year), parseInt(quarterNumber.replace('q', ''))];
};

export const formatQuarter = (quarter: string): string => {
  const [year, quarterNumber] = parseQuarter(quarter);
  return `Q${quarterNumber} ${year}`;
};

export const isQuarter1 = (quarter: string): boolean => parseQuarter(quarter)[1] === 1;

export const isQuarter4 = (quarter: string): boolean => parseQuarter(quarter)[1] === 4;
