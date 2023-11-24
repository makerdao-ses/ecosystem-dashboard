import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import EndgameIntroductionBanner from './EndgameIntroductionBanner';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof EndgameIntroductionBanner> = {
  title: 'Components/Endgame/Endgame Introduction Banner',
  component: EndgameIntroductionBanner,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}, { isKeyChanges: true }];

const [[IntroductionLightMode, IntroductionDarkMode], [KeyChangesLightMode, KeyChangesDarkMode]] =
  createThemeModeVariants(EndgameIntroductionBanner, variantsArgs);
export { IntroductionLightMode, IntroductionDarkMode, KeyChangesLightMode, KeyChangesDarkMode };

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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21089:238100',
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
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:204940',
        options: {
          componentStyle: {
            width: 768,
          },
          style: {
            top: -61,
            left: -100,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:210984',
        options: {
          componentStyle: {
            width: 1024,
          },
          style: {
            top: -60,
            left: -84,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=23817:107416',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=23817:105537',
        options: {
          style: {
            margin: 0,
          },
        },
      },
      1920: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=23817:103657',
        options: {
          style: {
            margin: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
