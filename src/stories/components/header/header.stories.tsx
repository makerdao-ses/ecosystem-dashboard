import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Header from './header';
import { itemsWebSiteLinks } from './select-link-website/menu-items';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [1440, 834, 375],
      pauseAnimationAtEnd: true,
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
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4769%3A47888&t=8faDQ5tH3jpv3T5V-4',
        options: {
          style: {
            top: -36,
            left: -42,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A145097&t=8faDQ5tH3jpv3T5V-4',
        options: {
          style: {
            top: -36,
            left: 0,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13234%3A129691&t=533vG4NJVj6mlbo7-4',
        options: {
          style: {
            top: -36,
            left: -56,
          },
        },
      },
    },
  },
};

HeaderLightDarkMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4769%3A47888&t=8faDQ5tH3jpv3T5V-4',
        options: {
          style: {
            top: -36,
            left: -56,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4769%3A47888&t=8faDQ5tH3jpv3T5V-4',
        options: {
          style: {
            top: -36,
            left: -56,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13234%3A129691&t=8faDQ5tH3jpv3T5V-4',
        options: {
          style: {
            top: -36,
            left: -56,
          },
        },
      },
    },
  },
};
