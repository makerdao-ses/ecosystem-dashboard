import { enumForStories, getHeadersExpenseReport, mockDataApiTeam } from '@ses/containers/Finances/utils/utils';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateExpenseTrendFinances from './DelegateExpenseTrendFinances';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DelegateExpenseTrendFinances> = {
  title: 'Components/NewFinances/Section/DelegateExpenseTrendFinances',
  component: DelegateExpenseTrendFinances,
  parameters: {
    date: new Date('2023-09-18T12:23:00Z'),
  },
};
export default meta;

const args = [
  {
    columns: getHeadersExpenseReport(enumForStories, 'Actuals', false),
    expenseReport: mockDataApiTeam.slice(0, 9),
    sortClick: () => null,
    handleLinkToPage: () => null,
    handleLoadMore: () => null,
    showSome: true,
  },
  {
    columns: getHeadersExpenseReport(enumForStories, 'Actuals', true),
    expenseReport: mockDataApiTeam.slice(0, 9),
    sortClick: () => null,
    handleLinkToPage: () => null,
    handleLoadMore: () => null,
    showSome: true,
  },
];
const [[LightMode, DarkMode], [DeskLightMode1024, DeskLightMode1024Dark]] = createThemeModeVariants(
  DelegateExpenseTrendFinances,
  args
);
export { LightMode, DarkMode, DeskLightMode1024, DeskLightMode1024Dark };

LightMode.parameters = {
  chromatic: {
    viewports: [375, 768, 1280, 1440, 1920],
  },
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24365:95542&mode=dev',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24369:100461&mode=dev',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -1,
            left: -12,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:214487&mode=design&t=dTByGfvKLwYnVbvR-4',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:200749&mode=design&t=dTByGfvKLwYnVbvR-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:205049&mode=design&t=dTByGfvKLwYnVbvR-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -1,
            left: -1,
          },
        },
      },
    },
  },
};

DeskLightMode1024.parameters = {
  chromatic: {
    viewports: [1024],
  },
  figma: {
    component: {
      1024: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:202230&mode=dev',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -1,
            left: -2,
          },
        },
      },
    },
  },
};

DarkMode.parameters = {};
DeskLightMode1024Dark.parameters = {};
