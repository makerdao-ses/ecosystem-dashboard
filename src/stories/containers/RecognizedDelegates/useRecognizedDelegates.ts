import { ActivityBuilder } from '@ses/core/businessLogic/builders/activityBuilder';
import { CoreUnitsBuilder } from '@ses/core/businessLogic/builders/coreUnitsBuilder';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import type { LinkModel } from '@ses/components/CuTableColumnLinks/CuTableColumnLinks';
import type { DelegateDataCard } from '@ses/core/utils/typesHelpers';

export const useRecognizedDelegates = () => {
  const totalDAI = 17892312;
  const startMonth = 'Nov 2021';
  const endMonth = 'Jun 2023';
  const totalDelegates = 23;
  const shadowTotal = 43;
  const mediaAnnual = 89928;
  const percent = 4.22;
  const delegatesExpenses = 826359;
  const otherExpenses = 19581971;
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
  // TODO: Delete this to real Delegate in the filters
  const activityFeed = [
    new ActivityBuilder()
      .withCreatedAt('2022-09-21T12:23:00Z')
      .withDescription(
        'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).'
      )
      .withParams({
        coreUnit: {
          shortCode: 'SES',
        },
        month: '2022-09',
      })
      .build(),
    new ActivityBuilder()
      .withCreatedAt('2022-09-10T12:23:00Z')
      .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
      .withParams({
        coreUnit: {
          shortCode: 'SES',
        },
        month: '2022-09',
      })
      .build(),
    new ActivityBuilder()
      .withCreatedAt('2022-08-20T12:23:00Z')
      .withDescription('Increase Headcount Expense Forecast Lorem Ipsum test some text.')
      .withParams({
        coreUnit: {
          shortCode: 'DUX',
        },
        month: '2022-08',
      })
      .build(),
  ];

  // TODO: Delete this to real Delegate in the filters
  const coreUnits = [
    new CoreUnitsBuilder()
      .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png')
      .withShortCode('SES')
      .withName('Sustainable Ecosystem Scaling')
      .build(),
    new CoreUnitsBuilder()
      .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/dux-001/dux_logo.png')
      .withShortCode('DUX')
      .withName('Development & UX')
      .build(),
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
    coreUnits,
    activityFeed,
  };
};
