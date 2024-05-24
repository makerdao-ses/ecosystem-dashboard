import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import LinkList from './LinkList';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof LinkList> = {
  title: 'Fusion/Components/LinkList',
  component: LinkList,
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(LinkList, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  chromatic: {
    viewports: [768],
    pauseAnimationAtEnd: true,
  },
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=20:16275&t=iffHOQmTvQxnqqxc-4',
        options: {
          componentStyle: {
            width: 200,
          },
          style: {
            top: -12,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
