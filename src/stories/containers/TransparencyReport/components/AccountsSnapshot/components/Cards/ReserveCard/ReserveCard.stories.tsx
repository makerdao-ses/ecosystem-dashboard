import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ReserveCard from './ReserveCard';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/CUTransparencyReport/Accounts Snapshot/Reserve Card',
  component: ReserveCard,
} as ComponentMeta<typeof ReserveCard>;

const variantsArgs = [
  {
    name: 'DSS Vest',
    isGroup: true,
    initialBalance: 100000,
    inflow: 300000,
    outflow: 300000,
    newBalance: 100000,
  },
];

export const [[GroupLightMode, GroupDarkMode]] = createThemeModeVariants(ReserveCard, variantsArgs);

GroupLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18675%3A213129',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -2,
            left: -6,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18595%3A253864',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: -21,
            left: -40,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A236029',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: -22,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A231259',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -22,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A222422',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -22,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
