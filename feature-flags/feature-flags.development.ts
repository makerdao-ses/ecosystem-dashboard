import type { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsDevelopment: FeatureFlagsInterface = {
  FEATURE_CARD_NAVIGATION: true,
  FEATURE_SITEMAP: process.env.ENABLE_SITEMAP === 'true',
  FEATURE_TRANSPARENCY_NEW_TABLE: true,
  FEATURE_CU_INDEX_NEW_TABLE: true,
  FEATURE_CU_ABOUT_NEW_CONTAINER: true,
  FEATURE_TRANSPARENCY_COMMENTS: true,
  FEATURE_GLOBAL_ACTIVITIES: true,
  FEATURE_AUTH: true,
  FEATURE_MKR_VESTING: true,
  FEATURE_AUDIT_REPORTS: false,
  FEATURE_FINANCES_OVERVIEW: true,
  FEATURE_RECOGNIZED_DELEGATES: true,
};
