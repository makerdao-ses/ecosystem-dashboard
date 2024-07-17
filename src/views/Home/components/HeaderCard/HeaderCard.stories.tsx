import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { headerCardData } from '@/views/Home/staticData';
import HeaderCard from './HeaderCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof HeaderCard> = {
  title: 'Fusion/Views/Home/HeaderCard',
  component: HeaderCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    headerCard: {
      title: headerCardData.title,
      description: headerCardData.description,
      buttonTexts: headerCardData.buttonTexts,
    },
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(HeaderCard, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=157-9174&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-37869&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-35709&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=6-33262&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=4864-10681&m=dev',
        options: {
          componentStyle: {},
          style: {},
        },
      },
    },
  } as FigmaParams,
};
