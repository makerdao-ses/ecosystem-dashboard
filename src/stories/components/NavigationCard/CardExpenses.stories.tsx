import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardExpenses from './CardExpenses';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUAbout/CardExpenses',
  components: CardExpenses,
  decorators: [
    (Story) => (
      <div style={{ width: '405px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CardExpenses>;

const variantsArgs = [
  {
    code: 'SES',
    queryStrings: '',
    isTitlePresent: false,
    auditors: [
      {
        id: '1',
        username: 'P_Rose',
      },
      {
        id: '2',
        username: 'C_27',
      },
    ],
  },
];

export const [[Expense, CardExpenseDarkMode]] = createThemeModeVariants(CardExpenses, variantsArgs);

Expense.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13234%3A125937&t=qlSTmiqEpplzpBMd-4',

    options: {
      style: {
        top: -19,
        left: -41,
      },
    },
  },
};
CardExpenseDarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13246%3A134660&t=D2zVjXYiVOr7zmEx-4',
    options: {
      style: {
        top: -9,
        left: -15,
      },
    },
  },
};
