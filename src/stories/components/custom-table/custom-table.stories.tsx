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
        key: CoreUnit.shortCode,
      },
      {
        value: CoreUnit,
        key: CoreUnit.shortCode,
      },
      {
        value: CoreUnit,
        key: CoreUnit.shortCode,
      },
      {
        value: CoreUnit,
        key: CoreUnit.shortCode,
      },
      {
        value: CoreUnit,
        key: CoreUnit.shortCode,
      },
      {
        value: CoreUnit,
        key: CoreUnit.shortCode,
      },
      {
        value: CoreUnit,
        key: CoreUnit.shortCode,
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

Table.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A143329&t=t4FrzPIVoc7xPgpL-4',
      834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A93999&t=t4FrzPIVoc7xPgpL-4',
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139602&t=BJYSrpHcrXx2uY02-4',
        options: {
          style: {
            top: '-2px',
            left: '30px',
          },
        },
      },
    },
  },
};
TableDark.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A143329&t=t4FrzPIVoc7xPgpL-4',
      834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A93999&t=t4FrzPIVoc7xPgpL-4',
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139602&t=BJYSrpHcrXx2uY02-4',
        options: {
          style: {
            top: '-2px',
            left: '30px',
          },
        },
      },
    },
  },
};
