import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit } from '@ses/core/utils/test.utils';

import ListCoreUnit from './list-core-unit';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ListCoreUnit',
  component: ListCoreUnit,
  parameters: {
    chromatic: {
      viewports: [1194, 1280, 1440],
      pauseAnimationAtEnd: false,
    },
  },
} as ComponentMeta<typeof ListCoreUnit>;

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
export const [[Summary, SummaryDark]] = createThemeModeVariants(ListCoreUnit, variantsArgs);

Summary.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
    },
  },
};
SummaryDark.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
      1440: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=3CQ5tXdbVw9JDdFv-4',
    },
  },
};
