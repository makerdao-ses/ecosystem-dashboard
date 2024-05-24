import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Footer from './Footer';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof Footer> = {
  title: 'Fusion/Components/Footer',
  component: Footer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = undefined;
const [[LightMode, DarkMode]] = createThemeModeVariants(Footer, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4338%3A48482',
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
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4308%3A55429',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=198-1841&m=dev',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
    },
  } as FigmaParams,
};
