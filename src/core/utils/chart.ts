import type { DateTime } from 'luxon';

export const getMonthsBetweenDateDeskFormat = (startDate: DateTime, endDate: DateTime): string[] => {
  const months: string[] = [];

  let currentDate = startDate.startOf('month');

  while (currentDate <= endDate) {
    const monthName = currentDate.toFormat('LLL').toUpperCase();

    months.push(monthName);

    currentDate = currentDate.plus({ months: 1 });
  }

  return months;
};

export const getMonthsBetweenDatesMobileFormat = (startDate: DateTime, endDate: DateTime): string[] => {
  const months: string[] = [];

  let currentDate = startDate.startOf('month');

  while (currentDate <= endDate) {
    const monthName = currentDate.toFormat('LLL')[0].toUpperCase();

    months.push(monthName);

    currentDate = currentDate.plus({ months: 1 });
  }

  return months;
};
