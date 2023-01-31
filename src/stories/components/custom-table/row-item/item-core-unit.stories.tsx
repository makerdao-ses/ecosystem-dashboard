import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit } from '@ses/core/utils/test.utils';
import ItemCoreUnit from './item-core-unit';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ItemCoreUnit',
  component: ItemCoreUnit,
  parameters: {
    fullscreen: 'centered',
    chromatic: {
      viewports: [1194, 1280],
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '3em',
          width: 'fit-content',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ItemCoreUnit>;

const variantsArgs = [
  {
    queryStrings: '',
    key: '2',
    loading: false,
    columns,
    cu: CoreUnit,
  },
];
export const [[Summary, SummaryDark]] = createThemeModeVariants(ItemCoreUnit, variantsArgs);

Summary.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13993&t=t4FrzPIVoc7xPgpL-4',
      1284: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13993&t=t4FrzPIVoc7xPgpL-4',
    },
  },
};
SummaryDark.parameters = {
  figma: {
    component: {
      1194: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13993&t=t4FrzPIVoc7xPgpL-4',
      1284: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13993&t=t4FrzPIVoc7xPgpL-4',
    },
  },
};
