import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { ResourceType } from '@/core/models/interfaces/types';
import CardExpenses from './CardExpenses';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CardExpenses> = {
  title: 'Fusion/Views/Core Unit About/CardExpense',
  component: CardExpenses,
  parameters: {
    chromatic: {
      viewports: [768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    code: 'SES',
    shortCode: 'SES',
    resource: ResourceType.CoreUnit,

    isTitlePresent: true,

    titleCard: 'View all expenses of the SES Core Unit',

    showMakerburnLink: true,
  },
  {
    code: 'SES',
    shortCode: 'SES',
    resource: ResourceType.EcosystemActor,

    isTitlePresent: true,

    titleCard: 'View all expenses of the Powerhouse Ecosystem Actor.',

    showMakerburnLink: false,
    auditors: [
      {
        id: '1',
        // eslint-disable-next-line spellcheck/spell-checker
        username: 'deniz',
      },
      {
        id: '2',
        // eslint-disable-next-line spellcheck/spell-checker
        username: 'dumitru',
      },
    ],
  },
];

const [[Expense, CardExpenseDarkMode], [ExpenseAuditor, CardExpenseDarkModeAuditor]] = createThemeModeVariants(
  CardExpenses,
  variantsArgs
);
export { Expense, CardExpenseDarkMode, ExpenseAuditor, CardExpenseDarkModeAuditor };

Expense.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1267:42165&t=mA2MB7OjSAU7mcF9-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:20936&t=uwfKa7MntZI25ojz-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 386,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1237:19703&t=uwfKa7MntZI25ojz-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 379,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1020:18928&t=uwfKa7MntZI25ojz-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 416,
          },
        },
      },
    },
  },
};

ExpenseAuditor.parameters = {
  figma: {
    component: {
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1271:49283&t=uwfKa7MntZI25ojz-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 343,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1271:47613&t=mA2MB7OjSAU7mcF9-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 386,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1271:46914&t=uwfKa7MntZI25ojz-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 379,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1258:41586&t=uwfKa7MntZI25ojz-4',
        options: {
          style: {
            left: -13,
            top: 0,
          },
          componentStyle: {
            width: 416,
          },
        },
      },
    },
  },
};
