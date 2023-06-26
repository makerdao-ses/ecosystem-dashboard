import useMediaQuery from '@mui/material/useMediaQuery';
import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';
import { filteredActors } from './utils/utils';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

export const useActors = (actors: EcosystemActor[]) => {
  // Remove this after implementation
  console.log('actors', actors);
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const phone = useMediaQuery(lightTheme.breakpoints.up('desktop_1194'));
  const isLessPhone = useMediaQuery(lightTheme.breakpoints.down(376));
  const [readMore, setReadMore] = useState<boolean>(false);
  const showTextDesk = phone || readMore;
  const handleRead = () => {
    setReadMore(!readMore);
  };

  const selectElements = [] as MultiSelectItem[];

  const clearFilters = () => {
    setActiveElements([]);
  };

  const filtersActive = activeElements.length <= 0 ? actors : filteredActors(actors, activeElements);

  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };

  return {
    handleRead,
    readMore,
    showTextDesk,
    isLessPhone,
    selectElements,
    clearFilters,
    handleSelectChange,
    activeElements,
    filtersActive,
  };
};
