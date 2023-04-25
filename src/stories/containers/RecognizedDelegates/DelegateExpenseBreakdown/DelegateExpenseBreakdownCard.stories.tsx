import { RecognizedDelegatesBuilder } from '@ses/core/businessLogic/builders/recognizedDelegatesBuilder';
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
    delegateCard: new RecognizedDelegatesBuilder()
      .withName('Flip Flop Flap Delegate LLC')
      .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
      .withSocials({
        twitter: '#',
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
      })
      .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
      .withNumberDai(2325)
      .build(),

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
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:196096&t=BNZ9FlhQrwKTnYGZ-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1130,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:193440&t=h6cNElW1YXydT6mT-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:190013&t=h6cNElW1YXydT6mT-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

BreakdownCardDark.parameters = {};
