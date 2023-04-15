import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';
import type { DelegateDataCard } from '@ses/core/utils/typesHelpers';

export const useRecognizedDelegates = () => {
  const totalDAI = 2130885;
  const expensesMock = [
    64523, 72053, 91478, 105432, 78823, 46823, 23456, 98765, 78964, 86543, 93021, 110540, 100032, 120032, 88023, 97321,
    120453, 105432, 87654, 99432, 65023, 100021, 89054, 105032, 78965, 93021,
  ];
  const months = ['N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J'];
  const startMonth = 'Nov 2021';
  const endMonth = 'Jun 2023';
  const totalDelegates = 23;
  const shadowTotal = 43;
  const mediaAnnual = 89928;
  const percent = 4.22;
  const delegatesExpenses = 2160000;
  const otherExpenses = 50500000;
  const amountDelegates = 21;
  const linksCardOne: LinkModel[] = [
    {
      linkType: LinkTypeEnum.Forum,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Twitter,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.Github,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.LinkedIn,
      href: '#',
    },
  ];
  const linksCardTwo: LinkModel[] = [
    {
      linkType: LinkTypeEnum.WWW,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Forum,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Discord,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Twitter,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.Github,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.Youtube,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.LinkedIn,
      href: '#',
    },
  ];

  const linksCardThree: LinkModel[] = [
    {
      linkType: LinkTypeEnum.Forum,
      href: '#',
    },
    {
      linkType: LinkTypeEnum.Discord,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.Github,
      href: '#',
    },
  ];

  const linksCardFour: LinkModel[] = [
    {
      linkType: LinkTypeEnum.Forum,
      href: '#',
    },

    {
      linkType: LinkTypeEnum.Github,
      href: '#',
    },
  ];

  const arrayOfDelegate: DelegateDataCard[] = [
    {
      imageUrl: 'https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg',
      walletName: 'Flip Flop Flap Delegate LLC',
      address: '0x86914...2e02',

      numberDai: 323434,
      links: linksCardOne,
    },
    {
      imageUrl: 'https://live.staticflickr.com/65535/52810223844_2d0373859d_m.jpg',
      walletName: 'GFX Labs',
      address: '0x86914...2e02',

      numberDai: 323434,
      links: linksCardTwo,
    },
    {
      imageUrl: 'https://live.staticflickr.com/65535/52810430960_7de9c1a7d6_m.jpg',
      walletName: 'Coldirion.eth',
      address: '0x86914...2e02',

      numberDai: 323434,
      links: linksCardThree,
    },
    {
      imageUrl: 'https://live.staticflickr.com/65535/52810223904_8919f81bef_m.jpg',
      walletName: 'Feedblack Loops LLC',
      address: '0x86914...2e02',

      numberDai: 323434,
      links: linksCardFour,
    },
  ];

  return {
    totalDAI,
    startMonth,
    endMonth,
    arrayOfDelegate,
    totalDelegates,
    shadowTotal,
    percent,
    mediaAnnual,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,

    expensesMock,
    months,
  };
};
