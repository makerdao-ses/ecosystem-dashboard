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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A140501&t=V1pxP4kAG5abeRm8-4',
        options: {
          style: {
            top: -36,
            left: -42,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A148510&t=V1pxP4kAG5abeRm8-4',
        options: {
          style: {
            top: -36,
            left: -51,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A134704&t=V1pxP4kAG5abeRm8-4',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A140501&t=V1pxP4kAG5abeRm8-4',
        options: {
          style: {
            top: -36,
            left: -56,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A148510&t=V1pxP4kAG5abeRm8-4',
        options: {
          style: {
            top: -36,
            left: -56,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13307%3A134704&t=V1pxP4kAG5abeRm8-4',
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
