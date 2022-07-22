import { useContext } from 'react';
import { FeatureFlagsInterface } from '../../../feature-flags/feature-flags.interface';
import { FeatureFlagsContext } from '../context/FeatureFlagsContext';

export const useFlagsActive = () => {
  const { enabledFeatures } = useContext(FeatureFlagsContext);

  const isEnabled = (featureName: string) => {
    if (!Object.prototype.hasOwnProperty.call(enabledFeatures, featureName)) return false;
    return enabledFeatures[featureName as keyof FeatureFlagsInterface] === true;
  };
  return [isEnabled];
};
