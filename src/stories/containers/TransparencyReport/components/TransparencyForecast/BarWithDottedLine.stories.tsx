import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BarWithDottedLine from './BarWithDottedLine';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/BarWithDottedLine',
  component: BarWithDottedLine,
  parameters: {
    chromatic: {
      viewports: [1440],
    },
  },
} as ComponentMeta<typeof BarWithDottedLine>;
const variantsArgs = [
  {
    value: 58000,
    relativeValue: 856579,
  },
  {
    value: 846579,
    relativeValue: 856579,
  },
  {
    value: 70200,
    relativeValue: 55000,
  },
  {
    value: 43500,
    relativeValue: 0,
  },
  {
    value: 0,
    relativeValue: 10000,
  },
];

export const [
  [ProgressiveGreen, ProgressiveGreenDark],
  [ProgressiveYellow, ProgressiveYellowDark],
  [ProgressiveRed, ProgressiveRedDark],

  [ProgressiveGray, ProgressiveGrayDark],
  [ProgressiveGrayStrong, ProgressiveGrayStrongDark],
] = createThemeModeVariants(BarWithDottedLine, variantsArgs);

ProgressiveGreen.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=glCgbUhycsocnnqd-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
ProgressiveYellow.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=PI6pSxhgdF0jUODH-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
ProgressiveRed.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=PI6pSxhgdF0jUODH-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
ProgressiveYellow.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=PI6pSxhgdF0jUODH-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
ProgressiveGrayStrong.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=PI6pSxhgdF0jUODH-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

ProgressiveYellow.parameters = {};
