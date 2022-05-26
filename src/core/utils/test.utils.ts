import { DateTime } from 'luxon';

export const CURRENT_MONTH = DateTime.now().toFormat('y-MM-dd');
export const CURRENT_MINUS_1_MONTH = DateTime.now().set({ day: 1 }).minus({ month: 1 }).toFormat('y-MM-dd');
export const CURRENT_MINUS_2_MONTH = DateTime.now().set({ day: 1 }).minus({ month: 2 }).toFormat('y-MM-dd');
export const CURRENT_MINUS_3_MONTH = DateTime.now().set({ day: 1 }).minus({ month: 3 }).toFormat('y-MM-dd');
export const CURRENT_PLUS_1_MONTH = DateTime.now().set({ day: 1 }).plus({ month: 1 }).toFormat('y-MM-dd');
