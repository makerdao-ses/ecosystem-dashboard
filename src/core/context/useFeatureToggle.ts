import React, { useContext } from 'react';
import { FeatureToggleContext } from '../context/FeatureToggleContext';

export const useFeatureToggle = () => {
  // we need to read values defined in the FeatureToggleContext.
  // In this case, we'll take only the array of enabled features.
  const { enabledFeatures } = useContext(FeatureToggleContext);

  const isEnabled = (featureName: string) => {
    return enabledFeatures.includes(featureName);
  };

  // For consistency, We return an array of helpers,
  // so we follow the pattern defined by the useState hook.
  // It makes the code open for extensions,
  // so no need to refactor the app when a new helper is added here.
  return [
    isEnabled,
  ];
};
