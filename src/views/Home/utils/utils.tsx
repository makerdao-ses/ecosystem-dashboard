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

const tooltipLabels: { [key: string]: string } = {
  psm: 'PSM',
  liquidationIncome: 'Liquidation Income',
  fees: 'Fees',
  daiSpent: 'DAI Spent',
  mkrVesting: 'MKR Vesting',
};

export const getCorrectLabelForToolTip = (label: string): string => tooltipLabels[label] || '';
