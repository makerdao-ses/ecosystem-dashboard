import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import TotalAndKeyStatsComponent from './TotalAndkeyStatusComponent';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/TotalAndKeyStatsComponent',
  component: TotalAndKeyStatsComponent,
  parameters: {
    chromatic: {
      viewports: [375, 834],
    },
  },
} as ComponentMeta<typeof TotalAndKeyStatsComponent>;

const variantsArgs = [
  {
    totalDelegates: 23,
    shadowTotal: 43,
    annual: 12345,
    percent: 4.22,
    delegatesExpenses: 2160000,
    otherExpenses: 50500000,
    amountDelegates: 21,
    totalDAI: 2130885,
    start: DateTime.fromISO('2021-11-01'),
    end: DateTime.fromISO('2023-06-01'),
  },
];

export const [[TotalAndKeyStats, TotalAndKeyStatsDark]] = createThemeModeVariants(
  TotalAndKeyStatsComponent,
  variantsArgs
);

TotalAndKeyStats.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:208036&t=ZzkWyPsIPh7BIgKB-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:203738&t=oRxIEkwi7dkVYRAp-4',
        options: {
          style: {
            left: -24,
            top: 4,
          },
          componentStyle: {
            width: '770px',
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:195953&t=oRxIEkwi7dkVYRAp-4',
        options: {
          style: {
            left: -24,
            top: 4,
          },
          componentStyle: {
            width: '1130px',
          },
        },
      },
    },
  },
};

TotalAndKeyStatsDark.parameters = {};
