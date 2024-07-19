import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { ENUM_FOR_STORIES, getHeadersExpenseReport } from '../../utils/utils';
import HeaderDelegateExpense from './HeaderDelegateExpense';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof HeaderDelegateExpense> = {
  title: 'Components/NewFinances/HeaderDelegateExpense',
  component: HeaderDelegateExpense,
};
export default meta;

const variantsArgs = [
  {
    columns: getHeadersExpenseReport(ENUM_FOR_STORIES, 'Actuals', false),
  },
  {
    columns: getHeadersExpenseReport(ENUM_FOR_STORIES, 'Actuals', true),
  },
];

const [[HeaderDelegate, HeaderDelegateDark], [HeaderDelegate1024, HeaderDelegate1024Dark]] = createThemeModeVariants(
  HeaderDelegateExpense,
  variantsArgs
);
export { HeaderDelegate, HeaderDelegateDark, HeaderDelegate1024, HeaderDelegate1024Dark };

HeaderDelegate.parameters = {
  chromatic: {
    viewports: [1280, 1440, 1920],
  },
  figma: {
    component: {
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214492&mode=dev',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200754&mode=dev',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205054&mode=dev',
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

HeaderDelegate1024.parameters = {
  chromatic: {
    viewports: [1024],
  },
  figma: {
    component: {
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:204278&mode=design&t=y0gKYTesgoKVR9cb-4',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
    },
  },
};
HeaderDelegate1024Dark.parameters = {};
HeaderDelegateDark.parameters = {};
