import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import TeamTypeCard from './TeamTypeCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof TeamTypeCard> = {
  title: 'Fusion/Teams/TeamTypeCard',
  component: TeamTypeCard,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    name: 'Ecosystem Actors',
    teams: 21,
    href: '/teams/ecosystem-actors',
    description:
      // text is as it was provided
      // eslint-disable-next-line spellcheck/spell-checker
      'Ecosystem Actors are contributor teams that perform essential tasks to benefit the MakerDAO ecosystem. They are divided into two categories: Advisory Council Members and Active Ecosystem Actors. Here, we are refering to the Active Ecosystem Actors who carry out specific projects such as feature development, data collection, marketing, legal work, and other operational activities that benefit the Maker Ecosystem, following the specifications of Scope Alignment Artifacts.',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(TeamTypeCard, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2778-39548',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2778-37236',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2778-35809',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2778-33587',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
