import AtlasIcon from '@ses/containers/EndgameAtlasBudget/components/AtlasIcon';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import IconTitle from './IconTitle';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/IconTitle/IconTitle',
  component: IconTitle,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof IconTitle>;

const variantsArgs = [
  {
    title: 'Endgame Atlas Budget',
    icon: <AtlasIcon />,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(IconTitle, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21609:263019&mode=dev',
        options: {
          style: {
            top: -15,
            left: -15,
          },
        },
      },
    },
  } as FigmaParams,
};
DarkMode.parameters = {};
