import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BarWithDottedLine from './BarWithDottedLine';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/BarWithDottedLine',
  component: BarWithDottedLine,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as ComponentMeta<typeof BarWithDottedLine>;
const variantsArgs = [
  {
    value: 7500,
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
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=MjSTXSOlnzAFP2Sr-4',
        options: {
          style: {
            left: 0,
            top: 22,
          },
          componentStyle: {
            width: 100,
          },
        },
      },
    },
  },
};
ProgressiveYellow.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=X5dl1EckgkoawGMb-4',
        options: {
          style: {
            left: 0,
            top: 22,
          },
          componentStyle: {
            width: 100,
          },
        },
      },
    },
  },
};
ProgressiveRed.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=X5dl1EckgkoawGMb-4',
        options: {
          style: {
            left: 0,
            top: 22,
          },
          componentStyle: {
            width: 100,
          },
        },
      },
    },
  },
};
ProgressiveYellow.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=X5dl1EckgkoawGMb-4',
        options: {
          style: {
            left: 0,
            top: 22,
          },
          componentStyle: {
            width: 100,
          },
        },
      },
    },
  },
};
ProgressiveGrayStrong.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=17273:217604&t=X5dl1EckgkoawGMb-4',
        options: {
          style: {
            left: 0,
            top: 22,
          },
          componentStyle: {
            width: 100,
          },
        },
      },
    },
  },
};

ProgressiveYellow.parameters = {};
