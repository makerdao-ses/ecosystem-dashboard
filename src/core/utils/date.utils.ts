import { DateTime } from 'luxon';

export const API_MONTH_TO_FORMAT = 'yyyy-MM-01';
export const API_MONTH_FROM_FORMAT = 'yyyy-MM-dd';

// Expires date of cookies
export const daysToExpire = new Date(DateTime.now().plus({ months: 10 }).toString());
export const daysToDeleteCookie = new Date(DateTime.now().minus({ year: 2 }).toString());
