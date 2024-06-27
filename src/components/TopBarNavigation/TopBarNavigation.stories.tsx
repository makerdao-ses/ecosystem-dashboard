import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import TopBarNavigation from './TopBarNavigation';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TopBarNavigation> = {
  title: 'Fusion/Components/TopBarNavigation',
  component: TopBarNavigation,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1920, 1440],
      pauseAnimationAtEnd: true,
    },
    nextjs: {
      router: {
        pathname: '/contributors',
      },
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  TopBarNavigation,

  variantsArgs
);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=142:229&t=pe1fVI3DderPnVw1-4',
        options: {
          style: {
            left: -30,
            top: -28,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2:1415&t=ajLTBo9VnKC0lToE-4',
        options: {
          style: {
            left: 0,
            top: -10,
          },
          componentStyle: {
            width: 724,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2:1417&t=pe1fVI3DderPnVw1-4',
        options: {
          style: {
            left: 2,
            top: -10,
          },
          componentStyle: {
            width: 980,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2:1418&t=FaDSDTCuQY6aC62v-4',
        options: {
          style: {
            left: 8,
            top: -10,
          },
          componentStyle: {
            width: 1220,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2:1419&t=FaDSDTCuQY6aC62v-4',
        options: {
          style: {
            left: 32,
            top: -10,
          },
          componentStyle: {
            width: 1332,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1996:36323&t=ajLTBo9VnKC0lToE-4',
        options: {
          style: {
            left: 4,
            top: -10,
          },
          componentStyle: {
            width: 1876,
          },
        },
      },
    },
  },
};
