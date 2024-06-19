import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import CardProjects from './CardProjects';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CardProjects> = {
  title: 'Fusion/ActorAbout/CardProjects',
  component: CardProjects,
  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    actorName: 'Powerhouse',
    shortCode: 'Powerhouse',
  },
];

const [[CardProject, CardDarkProject]] = createThemeModeVariants(
  CardProjects,

  variantsArgs
);
export { CardProject, CardDarkProject };

CardProject.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1271:49269&t=FMD7BT51d5ZtPVvU-4',

        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 340,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1271:47599&t=FMD7BT51d5ZtPVvU-4',
        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 386,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1271:46900&t=FMD7BT51d5ZtPVvU-4',
        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 379,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1258:37556&t=FMD7BT51d5ZtPVvU-4',
        options: {
          style: {
            left: -12,
            top: 0,
          },
          componentStyle: {
            width: 416,
          },
        },
      },
    },
  },
};

CardDarkProject.parameters = {};
