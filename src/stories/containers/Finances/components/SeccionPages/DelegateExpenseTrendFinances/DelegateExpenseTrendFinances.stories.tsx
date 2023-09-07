import { enumForStories, getHeadersExpenseReport, mockDataApiTeam } from '@ses/containers/Finances/utils/utils';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateExpenseTrendFinances from './DelegateExpenseTrendFinances';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/NewFinances/Section/DelegateExpenseTrendFinances',
  component: DelegateExpenseTrendFinances,
} as ComponentMeta<typeof DelegateExpenseTrendFinances>;

const args = [
  {
    columns: getHeadersExpenseReport(enumForStories, false),
    expenseReport: mockDataApiTeam.slice(0, 9),
    sortClick: () => null,
    handleLinkToPage: () => null,
    handleLoadMore: () => null,
    showSome: true,
  },
  {
    columns: getHeadersExpenseReport(enumForStories, true),
    expenseReport: mockDataApiTeam.slice(0, 9),
    sortClick: () => null,
    handleLinkToPage: () => null,
    handleLoadMore: () => null,
    showSome: true,
  },
];
export const [[LightMode, DarkMode], [DeskLightMode1194, DeskLightModeDark1194]] = createThemeModeVariants(
  DelegateExpenseTrendFinances,
  args
);

LightMode.parameters = {
  chromatic: {
    viewports: [375, 1280, 1440, 1920],
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

DeskLightMode1194.parameters = {
  chromatic: {
    viewports: [1194],
  },
  figma: {
    component: {
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22944:241810&mode=design&t=dTByGfvKLwYnVbvR-4',
        options: {
          componentStyle: {
            width: 1130,
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
DeskLightModeDark1194.parameters = {};
