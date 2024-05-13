import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import EndgameIntroductionBanner from './EndgameIntroductionBanner';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof EndgameIntroductionBanner> = {
  title: 'fusion/Components/Endgame/Endgame Introduction Banner',
  component: EndgameIntroductionBanner,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{ isKeyChanges: true }];

const [[KeyChangesLightMode, KeyChangesDarkMode]] = createThemeModeVariants(EndgameIntroductionBanner, variantsArgs);
export { KeyChangesLightMode, KeyChangesDarkMode };

KeyChangesLightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=219:46186&t=IuRS7Hl36vgB46Gj-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=208:28370&t=J1bUVKWZZViMDwMc-4',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=160:2893&t=J1bUVKWZZViMDwMc-4',
        options: {
          componentStyle: {
            width: 1024,
            paddingLeft: 32,
            paddingRight: 32,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=61:21882&t=J1bUVKWZZViMDwMc-4',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=61:17625&t=J1bUVKWZZViMDwMc-4',
        options: {
          componentStyle: {
            width: 1440,
          },
          style: {
            margin: 0,
            top: 16,
            left: 16,
          },
        },
      },
    },
  } as FigmaParams,
};
