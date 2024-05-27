import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Footer from './Footer';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof Footer> = {
  title: 'Fusion/Footer',
  component: Footer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [1440, 1280, 1024, 768, 375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const [[LightMode, DarkMode]] = createThemeModeVariants(Footer, undefined, false);
export { LightMode, DarkMode };

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=198-1836&m=dev',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -16,
            left: -8,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=203-1880&m=dev',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 768,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=203-1759&m=dev',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 1024,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=198-1841&m=dev',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 1280,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20-17803&m=dev',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 1440,
          },
        },
      },
    },
  } as FigmaParams,
};
