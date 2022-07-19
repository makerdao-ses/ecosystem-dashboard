import React from 'react';
import { FeatureFlags } from '../../../feature-flags/interface-feature-flags';
export const FeatureFlagsContext = React.createContext({

  enabledFeatures: {} as FeatureFlags,
});
