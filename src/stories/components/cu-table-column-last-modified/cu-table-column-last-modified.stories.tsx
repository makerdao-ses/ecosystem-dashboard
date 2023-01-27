import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { DateTime } from 'luxon';
import { CuTableColumnLastModified } from './cu-table-column-last-modified';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/LastModified',
  component: CuTableColumnLastModified,

  parameters: {
    chromatic: {
      viewports: [1280, 375],
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
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=hcRG1Rif0SbJoAGa-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=VvlIsHwhC6CtvGqf-4',
    },
    options: {
      style: {
        top: -8,
        left: 0,
      },
    },
  },
};

ModifiedDataDark.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=hcRG1Rif0SbJoAGa-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=VvlIsHwhC6CtvGqf-4',
    },
    options: {
      style: {
        top: -8,
        left: 0,
      },
    },
  },
};

ModifiedWithoutData.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131950&t=hcRG1Rif0SbJoAGa-4',

      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=VvlIsHwhC6CtvGqf-4',
    },

    options: {
      style: {
        top: -6,
        left: 0,
      },
    },
  },
};

ModifiedWithoutDataDark.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131950&t=hcRG1Rif0SbJoAGa-4',
      1280: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13146%3A131949&t=VvlIsHwhC6CtvGqf-4',
    },

    options: {
      style: {
        top: -6,
        left: 0,
      },
    },
  },
};
