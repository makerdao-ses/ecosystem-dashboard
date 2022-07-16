import React from 'react';
import { FeatureFlagsContext } from './FeatureFlagsContext';
import { FeatureFlags } from './flags';

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
