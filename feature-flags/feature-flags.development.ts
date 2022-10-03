import { FeatureFlagsInterface } from './feature-flags.interface';

export const flagsDevelopment: FeatureFlagsInterface = {
  FEATURE_CARD_NAVIGATION: true,
  FEATURE_SITEMAP: process.env.ENABLE_SITEMAP === 'true',
  FEATURE_TRANSPARENCY_NEW_TABLE: true,
  FEATURE_CU_INDEX_NEW_TABLE: true,
  FEATURE_CU_ABOUT_NEW_CONTAINER: true,
  FEATURE_TRANSPARENCY_COMMENTS: false,
};
