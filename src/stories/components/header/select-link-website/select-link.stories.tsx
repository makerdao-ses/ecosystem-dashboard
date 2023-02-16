import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { itemsWebSiteLinks } from './menu-items';
import SelectLink from './select-link';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/General/SelectLink',
  component: SelectLink,
  chromatic: {
    viewports: [375],
    pauseAnimationAtEnd: true,
  },
} as ComponentMeta<typeof SelectLink>;

const args = [
  {
    links: itemsWebSiteLinks,
    popupDefault: true,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(SelectLink, args, false);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14298%3A260357',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -16,
            left: -18,
          },
        },
      },
    },
  } as FigmaParams,
};
