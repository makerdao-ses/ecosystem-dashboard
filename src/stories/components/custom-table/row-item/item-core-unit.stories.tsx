import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit } from '@ses/core/utils/test.utils';
import ItemCoreUnit from './item-core-unit';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ItemCoreUnit',
  component: ItemCoreUnit,
  parameters: {
    chromatic: {
      viewports: [1194, 1280],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ItemCoreUnit>;

const variantsArgs = [
  {
    queryStrings: '',
    loading: false,
    columns,
    cu: CoreUnit,
  },
];
export const [[CoreUnitItem, CoreUnitItemDark]] = createThemeModeVariants(ItemCoreUnit, variantsArgs);

CoreUnitItem.parameters = {
  figma: {
    component: {
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=KBY21y7w6jiMfV8R-4',
        options: {
          componentStyle: {
            width: 1130,
            height: 120,
          },
          style: {
            top: 12,
            left: 0,
          },
        },
      },
      1284: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13993&t=t4FrzPIVoc7xPgpL-4',
      },
    },
  },
};
CoreUnitItemDark.parameters = {
  figma: {
    component: {
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A139604&t=KBY21y7w6jiMfV8R-4',
        options: {
          componentStyle: {
            width: 1130,
            height: 120,
          },
          style: {
            top: 12,
            left: 0,
          },
        },
      },

      1284: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2527%3A13993&t=t4FrzPIVoc7xPgpL-4',
        options: {
          componentStyle: {
            width: 1130,
            height: 120,
          },
          style: {
            top: 12,
            left: 0,
          },
        },
      },
    },
  },
};
