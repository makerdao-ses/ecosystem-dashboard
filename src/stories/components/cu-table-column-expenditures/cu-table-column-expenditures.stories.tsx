import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuTableColumnExpenditures } from './cu-table-column-expenditures';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnExpenditures',
  component: CuTableColumnExpenditures,
} as ComponentMeta<typeof CuTableColumnExpenditures>;

const args = [
  {
    value: 16500,
    percent: 120,
    items: [{ value: 70 }, { value: 85 }, { value: 120 }],
    budgetCaps: [90, 80, 100],
    months: ['October', 'November', 'December'],
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(CuTableColumnExpenditures, args);
