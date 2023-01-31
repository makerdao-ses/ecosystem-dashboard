import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import { CuTableColumnLastModified } from './cu-table-column-last-modified';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/LastModified',
  component: CuTableColumnLastModified,

  parameters: {
    chromatic: {
      viewports: [1194, 375],
    },
  },
} as ComponentMeta<typeof CuTableColumnLastModified>;

const variantsArgs = [
  {
    date: DateTime.fromISO('2022-12-25T09:08:34.123'),
    code: 'SES',
  },
  {
    code: 'SES',
  },
];

export const [[ModifiedData, ModifiedDataDark], [ModifiedWithoutData, ModifiedWithoutDataDark]] =
  createThemeModeVariants(CuTableColumnLastModified, variantsArgs);

ModifiedData.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=hcRG1Rif0SbJoAGa-4',
      },

      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=VvlIsHwhC6CtvGqf-4',
        options: {
          style: {
            left: -5,
          },
          componentStyle: {},
        },
      },
    },
  },
};

ModifiedDataDark.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=hcRG1Rif0SbJoAGa-4',

        options: {
          style: {
            left: 12,
          },
          componentStyle: {},
        },
      },

      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=VvlIsHwhC6CtvGqf-4',
      },
    },
  },
};

ModifiedWithoutData.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131950&t=ztdR8H6oxEhBiohV-4',
        options: {
          style: {
            left: 5,
          },
          componentStyle: {},
        },
      },

      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13140%3A131657&t=ztdR8H6oxEhBiohV-4',
      },
    },
  },
};

ModifiedWithoutDataDark.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131950&t=ztdR8H6oxEhBiohV-4',
      },

      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13140%3A131657&t=ztdR8H6oxEhBiohV-4',
      },
    },
  },
};
