import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit } from '@ses/core/utils/tests';
import ListCoreUnit from './list-core-unit';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ListCoreUnit> = {
  title: 'Components/CUTable/ListCoreUnit',
  component: ListCoreUnit,
  parameters: {
    chromatic: {
      viewports: [1194, 1280, 1440],
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
    columns,
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
const [[CoreUnitList, CoreUnitListDark]] = createThemeModeVariants(ListCoreUnit, variantsArgs);
export { CoreUnitList, CoreUnitListDark };

CoreUnitList.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
    },
  },
};
CoreUnitListDark.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
    },
  },
};
