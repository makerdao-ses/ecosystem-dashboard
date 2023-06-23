import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import ActorsContainer from './ActorsContainer';
import type { EcosystemActor } from '@ses/core/models/dto/teamsDTO';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Actors',
  component: ActorsContainer,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/ecosystem-actors',
    },
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ActorsContainer>;

const variantsArgs = [
  {
    actors: [] as EcosystemActor[],
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <ActorsContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20207:261115&mode=design&t=ALuMnY1kY1FDcgbg-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:229765&t=hZK6atDM9zUQz9LQ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 834,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:230493&t=hZK6atDM9zUQz9LQ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1194,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:230150&t=hZK6atDM9zUQz9LQ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1280,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20187:234480&t=hZK6atDM9zUQz9LQ-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: 1440,
          },
        },
      },
    },
  } as FigmaParams,
};
