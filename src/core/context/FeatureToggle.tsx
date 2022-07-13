import React from 'react';
import { FeatureToggleContext } from '../context/FeatureToggleContext';

type Props = {
    children: any;
    enabledFeatures: string[];
}

export const FeatureToggle = ({ children, enabledFeatures }: Props) => {
  return (
        <FeatureToggleContext.Provider value={{ enabledFeatures }}>
            {children}
        </FeatureToggleContext.Provider>
  );
};
