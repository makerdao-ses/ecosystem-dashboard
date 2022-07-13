// file: context/FeatureToggleContext.ts
import React from 'react';

export const FeatureToggleContext = React.createContext({
  // TypeScript will have hard time to determine its type,
  // if we don't cast this array to an array of strings.
  // Likely, we will end up with an array of never or any.
  enabledFeatures: [] as string[],
});
