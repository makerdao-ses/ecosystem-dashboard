import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import IconTitle from './IconTitle';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/IconTitle/IconTitle',
  component: IconTitle,
  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof IconTitle>;

const variantsArgs = [
  {
    title: 'Endgame Atlas Budget',
    icon: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/sh-001/SH_logo.png',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(IconTitle, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21609:263019&mode=dev',
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
