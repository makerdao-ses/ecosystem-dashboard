import React from 'react';
import { FeatureFlags } from './flags';

export const FeatureFlagsContext = React.createContext({

  enabledFeatures: {} as FeatureFlags,
});
