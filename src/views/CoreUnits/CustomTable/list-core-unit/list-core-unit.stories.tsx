import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns1024, CoreUnit } from '@ses/core/utils/tests';
import ListCoreUnit from './list-core-unit';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ListCoreUnit> = {
  title: 'Components/CUTable/ListCoreUnit',
  component: ListCoreUnit,
  parameters: {
    chromatic: {
      viewports: [1024, 1280, 1440],
      pauseAnimationAtEnd: false,
    },
    date: new Date('2022-12-26T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    queryStrings: '',
    isLoading: false,
    columns: columns1024,
    rows: [
      {
        value: CoreUnit,
        key: CoreUnit.code,
      },
      {
        value: CoreUnit,
        key: `${CoreUnit.code}+1`,
      },
      {
        value: CoreUnit,
        key: `${CoreUnit.code}+2`,
      },
      {
        value: CoreUnit,
        key: `${CoreUnit.code}+3`,
      },
    ],
  },
];
const [[CoreUnitList1024, CoreUnitListDark1024]] = createThemeModeVariants(ListCoreUnit, variantsArgs);
export { CoreUnitList1024, CoreUnitListDark1024 };
