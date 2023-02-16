import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit, headersSort } from '@ses/core/utils/test.utils';
import { CustomTable2 } from './custom-table-2';
import type { CustomTableColumn, CustomTableRow } from './custom-table-2';
import type { SortEnum } from '@ses/core/enums/sort.enum';
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
