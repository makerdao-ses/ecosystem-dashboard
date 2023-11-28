import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit } from '@ses/core/utils/tests';
import ItemCoreUnit from './ItemCoreUnit';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ItemCoreUnit> = {
  title: 'Components/CUTable/ItemCoreUnit',
  component: ItemCoreUnit,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2023-03-02T09:56:16Z'),
  },
};
export default meta;

const variantsArgs = [
  {
    queryStrings: '',
    loading: false,
    columns,
    cu: CoreUnit,
  },
];
const [[CoreUnitItem, CoreUnitItemDark]] = createThemeModeVariants(ItemCoreUnit, variantsArgs);
export { CoreUnitItem, CoreUnitItemDark };

CoreUnitItem.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A143329&t=dYLq7P56qu0pz8sc-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -4,
            left: -38,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A94026&t=pLOkuWP1eCxO98xA-4',
        options: {
          componentStyle: {
            width: 776,
          },
          style: {
            top: 14,
            left: 0,
          },
        },
      },

      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A140505&t=pLOkuWP1eCxO98xA-4',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: 12,
            left: -2,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8613%3A86751&t=aOydtnf6uboTcy3u-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 13,
            left: -3,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14171%3A254374&t=qZAPiyjv5nxXIEeC-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 13,
            left: -3,
          },
        },
      },
    },
  },
};
