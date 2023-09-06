import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import { enumForStories, getHeadersExpenseReport } from '../../utils/utils';
import HeaderDelegateExpense from './HeaderDelegateExpense';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/NewFinances/HeaderDelegateExpense',
  component: HeaderDelegateExpense,
} as ComponentMeta<typeof HeaderDelegateExpense>;

const variantsArgs = [
  {
    columns: getHeadersExpenseReport(enumForStories, false),
  },
  {
    columns: getHeadersExpenseReport(enumForStories, true),
  },
];

export const [[HeaderDelegate, HeaderDelegateDark], [HeaderDelegate1194, HeaderDelegate1194Dark]] =
  createThemeModeVariants(HeaderDelegateExpense, variantsArgs);

HeaderDelegate.parameters = {
  chromatic: {
    viewports: [1280],
  },
  figma: {
    component: {
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214492&mode=dev',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
    },
  },
};
HeaderDelegate.parameters = {
  chromatic: {
    viewports: [1440],
  },
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200754&mode=dev',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};
HeaderDelegate.parameters = {
  chromatic: {
    viewports: [1920],
  },
  figma: {
    component: {
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205054&mode=design&t=stARrczXcxThl0Bv-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

HeaderDelegate1194.parameters = {
  chromatic: {
    viewports: [1194],
  },
  figma: {
    component: {
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:241815&mode=design&t=stARrczXcxThl0Bv-4',
        options: {
          style: {
            left: -40,
            top: -22,
          },
          componentStyle: {
            width: 1130,
          },
        },
      },
    },
  },
};
HeaderDelegate1194Dark.parameters = {};
HeaderDelegateDark.parameters = {};
