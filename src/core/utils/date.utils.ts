import { DateTime } from 'luxon';

export const API_MONTH_TO_FORMAT = 'yyyy-MM-01';
export const API_MONTH_FROM_FORMAT = 'yyyy-MM-dd';

// Expires date of cookies
export const daysToExpire = () => DateTime.utc().plus({ months: 10 }).toJSDate();

export const differenceDays = (date: DateTime) => date?.toRelative({ unit: 'days' }) ?? '';
