import { DateTime } from 'luxon';
import type { Maybe } from '@/core/models/interfaces/generics';
import type { Progress } from '@/core/models/interfaces/roadmaps';
import { isPercentage } from '@/core/models/interfaces/roadmaps';
import { percentageRespectTo } from '@/core/utils/math';

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

export const progressPercentage = (progress: Maybe<Progress>): number => {
  if (!progress) {
    return 0;
  } else if (isPercentage(progress)) {
    return progress.value;
  } else {
    if (!progress.completed || !progress.total) {
      return 0;
    }
    return percentageRespectTo(progress.completed, progress.total) / 100;
  }
};
