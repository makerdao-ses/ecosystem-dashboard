import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import BudgetStatementsPlaceholder from './BudgetStatementsPlaceholder';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BudgetStatementsPlaceholder> = {
  title: 'Fusion/Components/BudgetStatementsPlaceholder',
  component: BudgetStatementsPlaceholder,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    longCode: 'SES-001',
    // eslint-disable-next-line spellcheck/spell-checker
    shortCode: 'Lorem Ipsum Apsum',
    resource: 'CoreUnit',
    // eslint-disable-next-line spellcheck/spell-checker
    titleStory: 'No data reported by Lorem Ipsum Apsum',
  },
];

const [[Actors, ActorsDark]] = createThemeModeVariants(
  BudgetStatementsPlaceholder,

  variantsArgs
);
export { Actors, ActorsDark };

Actors.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2560:15597&m=dev',
        options: {
          style: {
            left: -12,
            top: -22,
          },
          componentStyle: {
            width: 343,
            height: 300,
            maxHeight: 300,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2560:15425&m=dev',
        options: {
          style: {
            left: -12,
            top: -22,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2560:15411&t=xhd82AyPMOAfGjjH-4',
        options: {
          style: {
            left: -12,
            top: -22,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2560:15397&t=xhd82AyPMOAfGjjH-4',
        options: {
          style: {
            left: -2,
            top: -20,
          },
          componentStyle: {
            width: 1200,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2551:30815&t=xhd82AyPMOAfGjjH-4',
        options: {
          style: {
            left: -14,
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

ActorsDark.parameters = {};
