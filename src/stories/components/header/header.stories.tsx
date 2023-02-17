import { withFixedPositionRelative } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Header from './header';
import { itemsWebSiteLinks } from './select-link-website/menu-items';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/General/Header',
  component: Header,
  decorators: [withFixedPositionRelative],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    nextRouter: {
      pathname: '/core-unit',
    },
  },
} as ComponentMeta<typeof Header>;

const variantsArgs = [
  {
    links: itemsWebSiteLinks,
  },
];

export const [[HeaderLight, HeaderLightDarkMode]] = createThemeModeVariants(Header, variantsArgs);

HeaderLight.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A144905',
        options: {
          style: {
            top: -36,
            left: -42,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A149185',
        options: {
          componentStyle: {
            width: 803,
          },
          style: {
            top: -36,
            left: -57,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13399%3A144147',
        options: {
          componentStyle: {
            width: 1174,
          },
          style: {
            top: -36,
            left: -57,
          },
        },
      },
    },
  } as FigmaParams,
};
