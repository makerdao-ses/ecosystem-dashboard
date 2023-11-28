import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CUActivityItem from './CUActivityItem';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CUActivityItem> = {
  title: 'Components/Activity Feed/Activity Item',
  component: CUActivityItem,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2022-09-22T12:23:00Z'), // 2 day ago
  },
  argTypes: {},
};
export default meta;

const args = [
  {
    activity: {
      activityFeed: {
        id: 1,
        created_at: '2022-09-20T12:23:00Z',
        event: 'CU_BUDGET_STATEMENT_COMMENT',
        description:
          'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).',
        params: {
          coreUnit: {
            code: 'SES-001',
            shortCode: 'SES',
          },
          month: '2023-01',
        },
      },
      team: {
        name: 'Sustainable Ecosystem Scaling',
        shortCode: 'SES',
        image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
      },
    },
    isNew: true,
  },
  {
    activity: {
      activityFeed: {
        id: 1,
        created_at: '2022-09-20T12:23:00Z',
        event: 'CU_BUDGET_STATEMENT_COMMENT',
        description:
          'Signal your support or opposition to prioritising onboarding GUNIV3-BUSD-DAI (Gelato Uniswap v3 BUSD-DAI).',
        params: {
          coreUnit: {
            code: 'SES-001',
            shortCode: 'SES',
          },
          month: '2023-01',
        },
      },
    },
    isNew: true,
  },
];
const [[GlobalLightMode, GlobalDarkMode], [CULightMode, CUDarkMode]] = createThemeModeVariants(CUActivityItem, args);
export { GlobalLightMode, GlobalDarkMode, CULightMode, CUDarkMode };

GlobalLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8890%3A160586',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9776%3A110930',
        options: {
          componentStyle: {
            width: 770,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9760%3A106852',
        options: {
          componentStyle: {
            width: 1130,
          },
        },
      },
    },
    options: {
      style: {
        top: -5,
        left: -40,
      },
    },
  } as FigmaParams,
};

CULightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A157761',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=9109%3A171793',
        options: {
          componentStyle: {
            width: 770,
          },
        },
      },
    },
    options: {
      style: {
        top: -5,
        left: -40,
      },
    },
  } as FigmaParams,
};
