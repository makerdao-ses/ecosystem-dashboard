import { buildExpenseMetricsLineChartSeries } from '@ses/containers/Finances/utils/utils';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import MakerDAOExpenseMetricsFinances from './MakerDAOExpenseMetrics';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof MakerDAOExpenseMetricsFinances> = {
  title: 'Components/NewFinances/Section/MakerDAOExpenseMetricsFinances',
  component: MakerDAOExpenseMetricsFinances,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const chartData = {
  budget: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  forecast: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  actuals: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  onChain: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
  protocolNetOutflow: [123434, 123434, 123434, 123434, 100000, 250000, 900000, 1250000, 0, 1400000, 1400000, 1500000],
};
const args = [
  {
    title: 'MakerDAO Expense Metrics',
    year: 2023,
    series: buildExpenseMetricsLineChartSeries(chartData, [], true, 'monthly'),
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,
  },
  {
    title: 'MakerDAO Expense Metrics',
    year: 2023,
    series: buildExpenseMetricsLineChartSeries(chartData, [], false, 'monthly'),
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,
  },
];

const [[LightMode], [, DarkMode]] = createThemeModeVariants(MakerDAOExpenseMetricsFinances, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-337836',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 38,
            left: 0,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-331810',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 64,
            left: 0,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-330256',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 64,
            left: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-334923',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 64,
            left: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966-336453',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 64,
            left: 0,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28966:333454&mode=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 64,
            left: 0,
          },
        },
      },
    },
  },
};
