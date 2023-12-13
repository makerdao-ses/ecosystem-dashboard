import { atlasBudget, legacyBudget, scopeBudget } from '@ses/containers/Finances/utils/utils';
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

const args = [
  {
    year: 2023,
    newActuals: atlasBudget,
    newBudget: scopeBudget,
    newForecast: legacyBudget,
    newNetExpensesOffChain: atlasBudget,
    newNetExpensesOnChain: scopeBudget,
    selectedGranularity: 'monthly',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleGranularityChange: (value: string) => null,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(MakerDAOExpenseMetricsFinances, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24365:95374&mode=dev',
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
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24369:100308&mode=dev',
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
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:202077&mode=dev',
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
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214334&mode=dev',
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
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200596&mode=dev',
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:204896&mode=dev',
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
