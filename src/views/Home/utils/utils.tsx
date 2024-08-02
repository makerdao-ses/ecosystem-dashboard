import { DateTime } from 'luxon';
import type { Team } from '@/core/models/interfaces/team';

export const getProfileUpdate = (contributor: Team) => {
  if (contributor.lastActivity?.update_at) {
    return DateTime.fromISO(contributor.lastActivity?.update_at);
  }
  if (contributor.lastActivity?.created_at) {
    return DateTime.fromISO(contributor.lastActivity?.created_at);
  }
  return undefined;
};
