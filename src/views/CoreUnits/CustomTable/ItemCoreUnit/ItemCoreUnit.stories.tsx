import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { columns1024, columns1280, CoreUnit } from '@ses/core/utils/tests';
import ItemCoreUnit from './ItemCoreUnit';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ItemCoreUnit> = {
  title: 'Components/CUTable/ItemCoreUnit',
  component: ItemCoreUnit,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
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
    columns: columns1024,
    cu: CoreUnit,
  },
  {
    queryStrings: '',
    loading: false,
    columns: columns1280,
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
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:51949&t=4msz1XMpVAvVukiF-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 4,
            left: -14,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=342:66196&t=4msz1XMpVAvVukiF-4',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 4,
            left: -14,
          },
        },
      },

      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:45299&t=hb8vdSiYDruV77HV-4',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 6,
            left: -10,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=331:43652&t=hb8vdSiYDruV77HV-4',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: 13,
            left: -3,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=272:40417&t=hb8vdSiYDruV77HV-4',
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
