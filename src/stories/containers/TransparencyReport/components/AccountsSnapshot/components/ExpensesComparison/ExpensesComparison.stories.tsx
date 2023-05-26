import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { buildRow } from '../../useAccountsSnapshot';
import ExpensesComparison from './ExpensesComparison';
import type { RowProps } from '@ses/components/AdvanceTable/types';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/CUTransparencyReport/Accounts Snapshot/Expenses Comparison',
  component: ExpensesComparison,
  parameters: {
    chromatic: {
      viewports: [834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ExpensesComparison>;

const rows = [
  buildRow(['MAY-2023', '221,503.00 DAI', '240,000.00 DAI', '8.35%', '221,504.00 DAI', '0.00%'], true, false),
  buildRow(['APR-2023', '171,503.00 DAI', '170,000.00 DAI', '-0.88%', '171,500,00 DAI', '0.00%'], false, false),
  buildRow(['MAR-2023', '288,503.00 DAI', '280,000.00 DAI', '-2,95%', '288,300.00 DAI', '-0.07%'], false, false),
  buildRow(['Totals', '681,509.00 DAI', '681,509.00 DAI', '1.25%', '681,304.25 DAI', '-0.03%'], false, true),
] as RowProps[];

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(() => <ExpensesComparison rows={rows} />, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18675%3A213452',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18595%3A254055',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A236220',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A231450',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A222613',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
