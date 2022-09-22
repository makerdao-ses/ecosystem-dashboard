import { flagsDevelopment } from './feature-flags.development';
import { flagsProduction } from './feature-flags.production';
import { flagsStaging } from './feature-flags.staging';
import { FeatureFlagsInterface } from './feature-flags.interface';

export const featureFlags: { [id: string]: FeatureFlagsInterface } = {
  development: flagsDevelopment,
  staging: flagsStaging,
  production: flagsProduction,
};
