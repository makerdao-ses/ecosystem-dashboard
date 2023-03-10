import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit, headersSort } from '@ses/core/utils/tests';
import { CustomTable2 } from './CustomTable2';
import type { CustomTableColumn, CustomTableRow } from './CustomTable2';
import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CuTable/CustomTable2',
  component: CustomTable2,
  parameters: {
    layout: 'centered',
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2022-12-26T09:08:34.123'),
  },
} as ComponentMeta<typeof CustomTable2>;

const variantsArgs = [
  {
    columns: columns as CustomTableColumn[],
    items: [
      {
        value: CoreUnit,
      },
      {
        value: CoreUnit,
      },
      {
        value: CoreUnit,
      },
      {
        value: CoreUnit,
      },
    ] as CustomTableRow[],
    loading: false,
    sortState: [] as SortEnum[],
    handleSort: () => undefined,
    headersSort,
    queryStrings: '',
  },
];

export const [[Table, TableDark]] = createThemeModeVariants(CustomTable2, variantsArgs);
