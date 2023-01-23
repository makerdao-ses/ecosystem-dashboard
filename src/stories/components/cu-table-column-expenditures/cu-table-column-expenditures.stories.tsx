import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CuTableColumnExpenditures } from './cu-table-column-expenditures';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ColumnExpenditures',
  component: CuTableColumnExpenditures,
} as ComponentMeta<typeof CuTableColumnExpenditures>;

const variantsArgs = [
  {
    value: 16705,
    percent: 96,
    items: [{ value: 70 }, { value: 60 }, { value: 90 }],
    budgetCaps: [90, 80, 100],
  },
];

export const [[Expenditures, ExpendituresDark]] = createThemeModeVariants(CuTableColumnExpenditures, variantsArgs);

Expenditures.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101706&t=vtK1PenCnIfiA5DY-4',
  },
};
ExpendituresDark.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8853%3A101706&t=vtK1PenCnIfiA5DY-4',
  },
};
