import { useContext } from 'react';
import { FeatureFlags } from '../../../feature-flags/interface-feature-flags';
import { FeatureFlagsContext } from '../context/FeatureFlagsContext';

export const useFlagsActive = () => {
  const { enabledFeatures } = useContext(FeatureFlagsContext);

  const isEnabled = (featureName: string) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!enabledFeatures.hasOwnProperty(featureName)) return false;
    return enabledFeatures[featureName as keyof FeatureFlags] === true;
  };
  return [isEnabled];
};
