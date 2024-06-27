import { DateTime } from 'luxon';

export const formatDateStringToQuarter = (date: string, extended = false) => {
  if (!date) {
    return '';
  }

  // if it is in format dd/mm/yyyy
  if (/\d\d\/\d\d\/\d\d\d\d/g.test(date)) {
    const [, month, year] = date.split('/');
    return extended ? `Q${Math.ceil(Number(month) / 3)} ${year}` : `Q${Math.ceil(Number(month) / 3)}'${year.slice(-2)}`;
  }

  // if it is in ISO format
  const dateTimeDate = DateTime.fromISO(date);
  if (dateTimeDate.isValid) {
    const month = dateTimeDate.month;
    const year = dateTimeDate.year;
    return extended ? `Q${Math.ceil(month / 3)} ${year}` : `Q${Math.ceil(month / 3)}'${year.toString().slice(-2)}`;
  }

  return date;
};
