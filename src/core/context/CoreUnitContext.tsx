import { useContext, createContext } from 'react';
import { CoreUnitDto } from '../models/dto/core-unit.dto';

export type CoreUnitContextValues = {
  coreUnits?: CoreUnitDto[];
  currentCoreUnit?: CoreUnitDto;
  setCurrentCoreUnit: (coreUnit: CoreUnitDto) => void;
};

export const CoreUnitContext = createContext<CoreUnitContextValues>({
  setCurrentCoreUnit: () => {
    throw new Error('Not implemented yet');
  },
});

export const useCoreUnitContext = () => useContext(CoreUnitContext);
