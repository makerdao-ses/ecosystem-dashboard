import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateExpenseBreakdownCard from '../components/DelegateExpenseBreakdownCard';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/DelegateExpenseBreakdownCard',
  component: DelegateExpenseBreakdownCard,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as ComponentMeta<typeof DelegateExpenseBreakdownCard>;
const variantsArgs = [
  {
    delegateCard: {
      imageUrl: 'https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg',
      walletName: 'Flip Flop Flap Delegate LLC',
      links: [
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
      ],
      address: '0x86914...2e02',
      numberDai: 2325,
    },
    totalDai: 232325,
  },
];

export const [[BreakdownCard, BreakdownCardDark]] = createThemeModeVariants(DelegateExpenseBreakdownCard, variantsArgs);

BreakdownCard.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208199&t=SXR1v9cUgs1wOSb8-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {},
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:201374&t=d03O1KT2Nl8fpPce-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 770,
          },
        },
      },
    },
  },
};

BreakdownCardDark.parameters = {};
