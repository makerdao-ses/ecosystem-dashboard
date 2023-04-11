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
    totalDAI: Math.trunc(17892312 || 0).toLocaleString('es-US'),
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16324:172948&t=EXZpxduJdSuerj2c-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {},
        },
      },
    },
  },
};

TotalAndKeyStatsDark.parameters = {};
