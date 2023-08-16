import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import EndgameIntroductionBanner from './EndgameIntroductionBanner';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Endgame/Endgame Introduction Banner',
  component: EndgameIntroductionBanner,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof EndgameIntroductionBanner>;

const variantsArgs = [{}, { isKeyChanges: true }];

export const [[IntroductionLightMode, IntroductionDarkMode], [KeyChangesLightMode, KeyChangesDarkMode]] =
  createThemeModeVariants(EndgameIntroductionBanner, variantsArgs);

IntroductionLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20682:254222',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -50,
            left: -66,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20804:267336',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -61,
            left: -84,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20677:245729',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20677:243932',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20677:238297',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1920: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20677:241116',
        options: {
          style: {
            margin: 0,
          },
        },
      },
    },
  } as FigmaParams,
};

KeyChangesLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20979:251300',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -50,
            left: -66,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21235:239060',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -61,
            left: -84,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20872:240015',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20872:235804',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20804:270107',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1920: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20804:273271',
        options: {
          style: {
            margin: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
