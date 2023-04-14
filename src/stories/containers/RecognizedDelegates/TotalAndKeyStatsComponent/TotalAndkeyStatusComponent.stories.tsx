import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import TotalAndKeyStatsComponent from './TotalAndkeyStatusComponent';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/TotalAndKeyStatsComponent',
  component: TotalAndKeyStatsComponent,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as ComponentMeta<typeof TotalAndKeyStatsComponent>;

const variantsArgs = [
  {
    totalDelegates: 52,
    shadowTotal: 31,
    annual: 12345,
    percent: 4.22,
    delegatesExpenses: 123456,
    otherExpenses: 343434,
    amountDelegates: 21,
    totalDAI: 17892312,
    start: 'Nov 2021',
    end: 'Jun 2023',
  },
];

export const [[TotalAndKeyStats, TotalAndKeyStatsDark]] = createThemeModeVariants(
  TotalAndKeyStatsComponent,
  variantsArgs
);

TotalAndKeyStats.parameters = {
  figma: {
    component: {
      375: {
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
    },
  },
};

TotalAndKeyStatsDark.parameters = {};
