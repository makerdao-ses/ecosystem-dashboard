import useMediaQuery from '@mui/material/useMediaQuery';

import { SortEnum } from '@ses/core/enums/sortEnum';
import lightTheme from '@ses/styles/theme/light';
import { useState } from 'react';

import type { ActorTableHeader } from './components/ActorHeader/ActorsHeaderTable';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';

export const useActors = (actors: EcosystemActor[], stories = false) => {
  const isLessPhone = useMediaQuery(lightTheme.breakpoints.down(376));
  const [readMore, setReadMore] = useState<boolean>(stories);
  const showTextDesk = readMore;
  const handleRead = () => {
    setReadMore(!readMore);
  };
  const columns: ActorTableHeader[] = [
    {
      header: 'Ecosystem Actor',
      styles: {
        boxSizing: 'border-box',
        [lightTheme.breakpoints.up('desktop_1194')]: {
          minWidth: 359,
          paddingLeft: 16,
        },
      },
      sort: SortEnum.Neutral,
    },
    {
      header: 'Role',
      styles: {
        width: 232,
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 18,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 60,
        },
      },
      sort: SortEnum.Neutral,
    },
    {
      header: 'Scope',
      sort: SortEnum.Neutral,
      styles: {
        width: 232,
        [lightTheme.breakpoints.up('desktop_1280')]: {
          paddingLeft: 36,
        },
        [lightTheme.breakpoints.up('desktop_1440')]: {
          paddingLeft: 52,
          justifyContent: 'center',
        },
      },
    },
    {
      header: 'Last Modified',
      sort: SortEnum.Neutral,
      hidden: true,
    },
  ];

  // TODO: Remove this add new search when filter is add
  const filtersActive = actors;

  return {
    handleRead,
    readMore,
    showTextDesk,
    isLessPhone,
    filtersActive,
    columns,
  };
};
