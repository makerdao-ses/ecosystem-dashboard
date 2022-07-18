import React from 'react';
import { FeatureFlags } from '../../../feature-flags/interface-feature-flags';
import { FeatureFlagsContext } from './FeatureFlagsContext';

type Props = {
  children: React.ReactNode | JSX.Element | JSX.Element[] | string;
  enabledFeatures: FeatureFlags;
}

export const FeatureFlagsProvider = ({ children, enabledFeatures }: Props) => {
  return (
    <FeatureFlagsContext.Provider value={{ enabledFeatures }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};
