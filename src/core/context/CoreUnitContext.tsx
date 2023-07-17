import { useContext, createContext } from 'react';
import type { CoreUnit } from '../models/interfaces/coreUnit';

export type CoreUnitContextValues = {
  coreUnits?: CoreUnit[];
  currentCoreUnit?: CoreUnit;
  setCurrentCoreUnit: (coreUnit: CoreUnit) => void;
};

export const CoreUnitContext = createContext<CoreUnitContextValues>({
  setCurrentCoreUnit: () => {
    throw new Error('Not implemented yet');
  },
});

export const useCoreUnitContext = () => useContext(CoreUnitContext);
