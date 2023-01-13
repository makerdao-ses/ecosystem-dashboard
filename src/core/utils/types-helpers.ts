import type { ActivityFeedDto, CommentsBudgetStatementDto } from '../models/dto/core-unit.dto';
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
}

export function isActivity(activity: CommentsBudgetStatementDto | ActivityFeedDto): activity is ActivityFeedDto {
  return (activity as ActivityFeedDto).event !== undefined;
}
