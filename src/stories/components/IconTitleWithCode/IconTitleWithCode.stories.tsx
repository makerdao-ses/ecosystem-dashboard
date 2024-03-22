import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import IconTitleWithCode from './IconTitleWithCode';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof IconTitleWithCode> = {
  title: 'Components/IconTitleWithCode/IconTitleWithCode',
  component: IconTitleWithCode,
  parameters: {
    chromatic: {
      viewports: [375, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    title: 'Atlas Immutable Budget',
    icon: 'https://i.ibb.co/vXD0xDp/atlas.png',
    code: 'atlas/immutable ',
  },
  {
    title: 'Endgame Atlas Budget',
    icon: 'https://i.ibb.co/vXD0xDp/atlas.png',
    code: 'EAB ',
  },
];

const [[LightMode, DarkMode], [ShortCodeLightMode, ShortCodeDarkMode]] = createThemeModeVariants(
  IconTitleWithCode,
  variantsArgs
);
export { LightMode, DarkMode, ShortCodeLightMode, ShortCodeDarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-339634&mode=design&t=brXc1OfBUUtZbv8V-4',
        options: {
          style: {
            top: -2,
            left: -4,
          },
        },
      },
    },
  } as FigmaParams,
};
DarkMode.parameters = {};

ShortCodeLightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=29796-278907&mode=design&t=brXc1OfBUUtZbv8V-4',
        options: {
          style: {
            top: -2,
            left: -4,
          },
        },
      },
    },
  } as FigmaParams,
};
ShortCodeDarkMode.parameters = {};
