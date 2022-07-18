import { flagsDevelopment } from './feature-flags.development';
import { flagsProduction } from './feature-flags.production';
import { flagsStaging } from './feature-flags.staging';

export const features = {
  development: flagsDevelopment,
  staging: flagsStaging,
  production: flagsProduction,
};
