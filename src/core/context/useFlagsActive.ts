import { useContext } from 'react';
import { FeatureFlagsContext } from './FeatureFlagsContext';
import { FeatureFlags } from './flags';
export const useFlagsActive = () => {
  const { enabledFeatures } = useContext(FeatureFlagsContext);

  const isEnabled = (featureName: string) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!enabledFeatures.hasOwnProperty(featureName)) return false;
    return enabledFeatures[featureName as keyof FeatureFlags] === true;
  };
  return [isEnabled];
};
