import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { mockDataApiTeam } from '../../utils/utils';
import DelegateExpenseTrendItem from './DelegateExpenseTrendItem';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DelegateExpenseTrendItem> = {
  title: 'Components/NewFinances/DelegateExpenseTrendItem',
  component: DelegateExpenseTrendItem,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1194, 1280, 1440, 1920],
    },
    date: new Date('2023-09-24T09:08:34.123'),
  },
};
export default meta;

const variantsArgs = [
  {
    handleLinkToPage: () => null,
    link: '#',
    isMobile: false,
    expenseReport: mockDataApiTeam[0],
  },
  {
    handleLinkToPage: () => null,
    link: '#',
    isMobile: true,
    expenseReport: mockDataApiTeam[0],
  },
];

const [[DelegateExpense, DelegateExpenseDark], [DelegateExpenseMobile, DelegateExpenseMobileDark]] =
  createThemeModeVariants(DelegateExpenseTrendItem, variantsArgs);
export { DelegateExpense, DelegateExpenseDark, DelegateExpenseMobile, DelegateExpenseMobileDark };

DelegateExpense.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24369:100466&mode=dev',
        options: {
          style: {
            left: -12,
            top: -8,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:204291&mode=dev',
        options: {
          style: {
            left: -1,
            top: -1,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214505&mode=dev',
        options: {
          style: {
            left: -4,

            top: -2,
          },
          componentStyle: {
            width: 1184,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200767&mode=dev',
        options: {
          style: {
            left: -4,

            top: -2,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205067&mode=dev',
        options: {
          style: {
            left: -4,
            top: -2,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

DelegateExpenseDark.parameters = {};
DelegateExpenseMobile.parameters = {
  chromatic: {
    viewports: [375],
  },
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24365:95547&mode=dev',
        options: {
          style: {
            left: -40,
            top: -20,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
    },
  },
};
DelegateExpenseMobileDark.parameters = {};
