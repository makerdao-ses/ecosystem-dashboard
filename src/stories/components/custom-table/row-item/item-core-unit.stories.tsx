import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns, CoreUnit } from '@ses/core/utils/test.utils';
import ItemCoreUnit from './item-core-unit';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ItemCoreUnit',
  component: ItemCoreUnit,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
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
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A143329&t=dYLq7P56qu0pz8sc-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -4,
            left: -40,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A94026&t=pLOkuWP1eCxO98xA-4',
        options: {
          componentStyle: {
            width: 770,
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
            top: 12,
            left: -6,
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
            top: 12,
            left: -6,
          },
        },
      },
    },
  },
};
CoreUnitItemDark.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A142787&t=pLOkuWP1eCxO98xA-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -8,
            left: -40,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5232%3A94026&t=pLOkuWP1eCxO98xA-4',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: 14,
            left: 3,
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
    },
  },
};
