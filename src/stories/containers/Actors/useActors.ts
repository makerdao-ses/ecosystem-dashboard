import useMediaQuery from '@mui/material/useMediaQuery';

import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';

import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

export const useActors = (actors: EcosystemActor[], stories = false) => {
  const isLessPhone = useMediaQuery(lightTheme.breakpoints.down(376));
  const [readMore, setReadMore] = useState<boolean>(stories);
  const showTextDesk = readMore;
  const handleRead = () => {
    setReadMore(!readMore);
  };

  // TODO: Remove this add new search when filter is add
  const filtersActive = actors;

  return {
    handleRead,
    readMore,
    showTextDesk,
    isLessPhone,
    filtersActive,
  };
};
