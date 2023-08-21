import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreakdownTableFinances from './BreakdownTableFinances';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/Section/BreakdownTableFinances',
  component: BreakdownTableFinances,

  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof BreakdownTableFinances>;

const args = [
  {
    metrics: [],
    activeItems: [],
    handleSelectChange: () => null,
    handleResetFilter: () => null,
    periodicSelectionFilter: ['Monthly', 'Quarterly', 'Annualy'],
    handleChange: () => null,
    onOpen: () => null,
    onClose: () => null,
    selectedValue: 'Quarterly',
    isOpen: false,
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(BreakdownTableFinances, args);

LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22581:78816&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
    },
  } as FigmaParams,
};
