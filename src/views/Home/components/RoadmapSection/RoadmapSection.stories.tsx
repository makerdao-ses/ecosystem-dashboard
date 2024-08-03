import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import RoadmapSection from './RoadmapSection';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof RoadmapSection> = {
  title: 'Fusion/Views/Home/RoadmapSection',
  component: RoadmapSection,
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
    roadmaps: [],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(RoadmapSection, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-32716&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-30498&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-27749&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-24915&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5809-32681&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
    },
  } as FigmaParams,
};
