import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Container from '@/components/Container/Container';
import { NavigationTabEnum } from '../../useEndgameView';
import NavigationTabs from '../NavigationTabs/NavigationTabs';
import IntroductoryHeadline from './IntroductoryHeadline';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta = {
  title: 'Fusion/Views/Endgame/Introduction Endgame',
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [{}];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  () => (
    <>
      <Container>
        <IntroductoryHeadline />
      </Container>
      <NavigationTabs activeTab={NavigationTabEnum.KEY_CHANGES} />
    </>
  ),
  variantsArgs,
  false
);
export { LightMode, DarkMode };

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
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:204924',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -12,
            left: 32,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:210968',
        options: {
          componentStyle: {
            width: 960,
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
