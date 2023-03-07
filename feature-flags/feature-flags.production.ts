import type { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsProduction: FeatureFlagsInterface = {
  FEATURE_CARD_NAVIGATION: true,
  FEATURE_SITEMAP: true,
  FEATURE_GLOBAL_ACTIVITIES: true,
  FEATURE_AUTH: true,
  FEATURE_MKR_VESTING: true,
  FEATURE_AUDIT_REPORTS: false,
  FEATURE_FINANCES_OVERVIEW: true,
  FEATURE_RECOGNIZED_DELEGATES: true,
};
