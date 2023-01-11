import React from 'react';
import type { FeatureFlagsInterface } from '../../../feature-flags/feature-flags.interface';

export const FeatureFlagsContext = React.createContext({
  enabledFeatures: {} as FeatureFlagsInterface,
});
