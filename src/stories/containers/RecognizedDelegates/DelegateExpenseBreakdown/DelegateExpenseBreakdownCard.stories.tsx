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
    walletName: 'Flip Flop Flap Delegate LLC',
    imageUrl: 'https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg',
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
  },
];

export const [[BreakdownCard, BreakdownCardDark]] = createThemeModeVariants(DelegateExpenseBreakdownCard, variantsArgs);

BreakdownCard.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16411:176227&t=7GidtstNwOjeimn4-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {},
        },
      },
    },
  },
};

BreakdownCardDark.parameters = {};
