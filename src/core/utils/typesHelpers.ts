import type { ChangeTrackingEvent } from '../models/interfaces/activity';
import type { BudgetStatementComment } from '../models/interfaces/budgetStatementComment';
import type { DateTime } from 'luxon';

export type WithDate = {
  date: DateTime;
};

/**
 * @deprecated now should be used `theme.palette.mode` or `theme.palette.isLight`
 */
export type WithIsLight = {
  isLight: boolean;
};

export type WithLegacyBreakpoints = {
  legacyBreakpoints: boolean;
};

export interface CookiesInterface {
  allowsThemeTracking: boolean;
  allowsTimestampTracking: boolean;
  allowsAnalyticsTracking: boolean;
  themeModeCookie: string;
}

export function isActivity(activity: BudgetStatementComment | ChangeTrackingEvent): activity is ChangeTrackingEvent {
  return (activity as ChangeTrackingEvent).event !== undefined;
}

export type PopoverPaperType = {
  background: string;
  border: string;
  boxShadow: string;
  borderRadius: string;
};
export type TargetBalanceTooltipInformation = {
  balance: number;
  months: string;
  description: string;
  mipNumber: string;
  link: string;
  name: string;
};

export interface SVGIconProps {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

export interface SVGIconWithFillProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}
