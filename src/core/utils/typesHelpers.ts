import type { ActivityFeedDto, CommentsBudgetStatementDto } from '../models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

export type WithDate = {
  date: DateTime;
};

export type WithIsLight = {
  isLight: boolean;
};

export interface CookiesInterface {
  allowsThemeTracking: boolean;
  allowsTimestampTracking: boolean;
  allowsAnalyticsTracking: boolean;
  themeModeCookie: string;
}

export function isActivity(activity: CommentsBudgetStatementDto | ActivityFeedDto): activity is ActivityFeedDto {
  return (activity as ActivityFeedDto).event !== undefined;
}

export type PopoverPaperType = {
  background: string;
  border: string;
  boxShadow: string;
  borderRadius: string;
};
export type TargetBalanceTooltipInformation = {
  balance: number;
  targetBalanceFirstMonth: DateTime;
  targetBalanceSecondMonth: DateTime;
};
