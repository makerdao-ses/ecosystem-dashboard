import React from 'react';
import { FeatureFlagsInterface } from '../../../feature-flags/feature-flags.interface';
import { FeatureFlagsContext } from './FeatureFlagsContext';

type Props = {
  children: React.ReactNode | JSX.Element | JSX.Element[] | string;
  enabledFeatures: FeatureFlagsInterface;
};

export const FeatureFlagsProvider = ({ children, enabledFeatures }: Props) => {
  return <FeatureFlagsContext.Provider value={{ enabledFeatures }}>{children}</FeatureFlagsContext.Provider>;
};
