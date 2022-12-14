import { useContext, createContext } from 'react';
import { CoreUnitDto } from '../models/dto/core-unit.dto';

export type CoreUnitContextValues = {
  coreUnits?: CoreUnitDto[];
  currentCoreUnit?: CoreUnitDto;
};

export const CoreUnitContext = createContext<CoreUnitContextValues>({});

export const useCoreUnitContext = () => useContext(CoreUnitContext);
