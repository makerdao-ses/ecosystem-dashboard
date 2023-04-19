import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { DelegateSocialDto } from '@ses/core/models/dto/delegatesDTO';

export const useRecognizedDelegates = () => {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };

  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const totalDAI = 2130885;
  const expensesMock = [
    64523, 72053, 91478, 105432, 78823, 46823, 23456, 98765, 78964, 86543, 93021, 110540, 100032, 120032, 88023, 97321,
    120453, 105432, 87654, 99432, 65023, 100021, 89054, 105032, 78965, 93021,
  ];
  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-06-01');
  const totalDelegates = 23;
  const shadowTotal = 43;
  const mediaAnnual = 89928;
  const percent = 4.22;
  const delegatesExpenses = 2160000;
  const otherExpenses = 50500000;
  const amountDelegates = 21;

  const linksCardOne: DelegateSocialDto[] = useMemo(
    () => [
      {
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
        votingPortal: '#',
        twitter: '#',
      },
    ],
    []
  );
  const linksCardTwo: DelegateSocialDto[] = useMemo(
    () => [
      {
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
        votingPortal: '#',
        twitter: '#',
      },
    ],
    []
  );

  const linksCardThree: DelegateSocialDto[] = useMemo(
    () => [
      {
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
        votingPortal: '#',
        twitter: '#',
      },
    ],
    []
  );
  const linksCardFour: DelegateSocialDto[] = useMemo(
    () => [
      {
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
        votingPortal: '#',
        twitter: '#',
      },
    ],
    []
  );

  const delegates = useMemo(
    () => [
      {
        image: 'https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg',
        name: 'Flip Flop Flap Delegate LLC',

        numberDai: 323434,
        socials: linksCardOne,

        latestVotingContract: '0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7',
      },
      {
        image: 'https://live.staticflickr.com/65535/52810223844_2d0373859d_m.jpg',
        name: 'GFX Labs',

        numberDai: 323434,
        socials: linksCardTwo,
        latestVotingContract: '0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7',
      },
      {
        image: 'https://live.staticflickr.com/65535/52810430960_7de9c1a7d6_m.jpg',
        name: 'Coldirion.eth',

        numberDai: 323434,
        socials: linksCardThree,
        latestVotingContract: '0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7',
      },
      {
        image: 'https://live.staticflickr.com/65535/52810223904_8919f81bef_m.jpg',
        name: 'Feedblack Loops LLC',

        numberDai: 323434,
        socials: linksCardFour,
        latestVotingContract: '0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7',
      },
    ],
    [linksCardFour, linksCardOne, linksCardThree, linksCardTwo]
  );

  const selectElements = useMemo(
    () =>
      sortBy(delegates, (del) => del.name).map((delegates) => ({
        id: delegates.name,
        content: delegates.name,
        params: {
          url: delegates.image,
        },
      })) as MultiSelectItem[],
    [delegates]
  );
  const filterCards = delegates.filter((delegate) => activeElements.includes(delegate.name));
  const CardsDelegateFiltered = activeElements.length === 0 ? delegates : filterCards;

  return {
    totalDAI,
    totalDelegates,
    shadowTotal,
    percent,
    mediaAnnual,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,
    expensesMock,
    startDate,
    endDate,
    selectElements,
    handleSelectChange,
    activeElements,
    handleResetFilter,
    filterCards,
    CardsDelegateFiltered,
    delegates,
  };
};
