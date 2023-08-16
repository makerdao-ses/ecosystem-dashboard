import Container from '@ses/components/Container/Container';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import NavigationTabs from '../NavigationTabs/NavigationTabs';
import IntroductoryHeadline from './IntroductoryHeadline';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/Endgame/Introduction',
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  () => (
    <>
      <Container>
        <IntroductoryHeadline />
      </Container>
      <NavigationTabs />
    </>
  ),
  variantsArgs,
  false
);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21089:238084',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -26,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21235:239044',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -12,
            left: 32,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20947:243186',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            left: 1,
            top: -12,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20872:236716',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            left: 0,
            top: -12,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21089:241893',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            left: 0,
            top: -12,
          },
        },
      },
    },
  } as FigmaParams,
};
