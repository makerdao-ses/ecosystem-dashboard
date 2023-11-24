import { RecognizedDelegatesBuilder } from '@ses/core/businessLogic/builders/recognizedDelegatesBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateExpenseBreakdownCard from '../components/DelegateExpenseBreakdownCard';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DelegateExpenseBreakdownCard> = {
  title: 'Components/Delegate/DelegateExpenseBreakdownCard',
  component: DelegateExpenseBreakdownCard,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    delegateCard: new RecognizedDelegatesBuilder()
      .withName('Feedblack Loops LLC')
      .withImage('https://live.staticflickr.com/65535/52832796763_a0e2339b3b_m.jpg')
      .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
      .withNumberDai(383)
      .withSocials({
        twitter: '#',
        forumProfile: '#',
        forumPlatform: '#',
        youtube: '#',
        votingPortal: '#',
      })
      .build(),
    totalDai: 232325,
    relativeValue: 213228,
  },
];

const [[BreakdownCard, BreakdownCardDark]] = createThemeModeVariants(DelegateExpenseBreakdownCard, variantsArgs);
export { BreakdownCard, BreakdownCardDark };

BreakdownCard.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=16759:208277&t=5RL0QVnNYAmUph4Q-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=16724:201431&t=5RL0QVnNYAmUph4Q-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17435:201128&t=5RL0QVnNYAmUph4Q-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17435:200448&t=5RL0QVnNYAmUph4Q-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17435:199452&t=5RL0QVnNYAmUph4Q-4',
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
