import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CoreUnit, headersSort, columns1024, columns1280 } from '@ses/core/utils/tests';
import { CustomTable2 } from './CustomTable2';
import type { CustomTableColumn, CustomTableRow } from './CustomTable2';
import type { SortEnum } from '@ses/core/enums/sortEnum';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CustomTable2> = {
  title: 'Fusion/Views/Core Units Index/CustomTable2',
  component: CustomTable2,
  parameters: {
    date: new Date('2023-03-02T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    columns: columns1024 as CustomTableColumn[],
    items: [
      {
        value: CoreUnit,
        key: 'SES-01',
      },
      {
        value: CoreUnit,
        key: 'SES-02',
      },
      {
        value: CoreUnit,
        key: 'SES-03',
      },
      {
        value: CoreUnit,
        key: 'SES-04',
      },
    ] as CustomTableRow[],
    loading: false,
    sortState: [] as SortEnum[],
    handleSort: () => undefined,
    headersSort,
    queryStrings: '',
  },
  {
    columns: columns1280 as CustomTableColumn[],
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

const [[Table1024, TableDark1024], [Desk1280, Desk1280ark1280]] = createThemeModeVariants(CustomTable2, variantsArgs);
export { Table1024, TableDark1024, Desk1280, Desk1280ark1280 };

Table1024.parameters = {
  chromatic: {
    viewports: [375, 768, 1024],
    pauseAnimationAtEnd: true,
  },
};
TableDark1024.parameters = {
  chromatic: {
    viewports: [375, 768, 1024],
    pauseAnimationAtEnd: true,
  },
};
Desk1280.parameters = {
  chromatic: {
    viewports: [1280, 1440],
    pauseAnimationAtEnd: true,
  },
};
Desk1280ark1280.parameters = {
  chromatic: {
    viewports: [1280, 1440],
    pauseAnimationAtEnd: true,
  },
};
