import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CUNewExpenseReport from './NewExpenseReport';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CUNewExpenseReport> = {
  title: 'Fusion/Components/Budget Statements/Comments/New Expense Report',
  component: CUNewExpenseReport,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
    },
    date: {
      control: {
        type: 'date',
      },
    },
  },
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
    },
  },
};
export default meta;

const [[Light, Dark]] = createThemeModeVariants(
  CUNewExpenseReport,
  [
    {
      description: 'Core Unit XXX has published a new expense report for September 2022',
      date: '2022-11-15T15:44:41.789Z',
    },
  ],
  false
);
export { Light, Dark };

Light.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3161-74756',
        options: {
          componentStyle: {
            width: 343,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3145-58507',
        options: {
          componentStyle: {
            width: 461,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3145-55365',
        options: {
          componentStyle: {
            width: 714,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=3145-53047',
        options: {
          componentStyle: {
            width: 892,
          },
        },
      },
    },
    options: {
      style: {
        top: 0,
        left: 0,
      },
    },
  } as FigmaParams,
};
