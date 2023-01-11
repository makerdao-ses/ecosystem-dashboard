import React from 'react';
import { FeatureFlagsContext } from './FeatureFlagsContext';
import type { FeatureFlagsInterface } from '../../../feature-flags/feature-flags.interface';

type Props = {
  children: React.ReactNode | JSX.Element | JSX.Element[] | string;
  enabledFeatures: FeatureFlagsInterface;
};

export const FeatureFlagsProvider = ({ children, enabledFeatures }: Props) => (
  <FeatureFlagsContext.Provider value={{ enabledFeatures }}>{children}</FeatureFlagsContext.Provider>
);
