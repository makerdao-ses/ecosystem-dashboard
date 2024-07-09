import { DateTime } from 'luxon';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import BreakdownSection from './BreakdownSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BreakdownSection> = {
  title: 'Fusion/Components/Budget Statements/BreakdownSection',
  component: BreakdownSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2023-01-01T04:14:00.000Z'),
  },
};

export default meta;

const variantsArgs = [
  {
    longCode: 'SES-01',
    shortCode: 'SES',
    resource: 'CoreUnit',
    breakdownTitleRef: null,
    breakdownTabs: ['Permanent Team'],
    headerIds: ['Permanent Team'],

    breakdownItemsForActiveTab: [
      {
        type: 'section',
        category: undefined,
        items: [
          {
            column: {
              align: 'left',
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Headcount Expenses',
          },
        ],
      },
      {
        type: 'category',
        category: 'General',
        subHeader: 'Headcount Expenses',
        items: [
          {
            column: {
              align: 'left',
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Compensation & Benefits',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 104335.38,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 104622.3,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: -286.92,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: ' ',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
      {
        type: 'category',
        category: 'General',
        subHeader: 'Headcount Expenses',
        items: [
          {
            column: {
              align: 'left',
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Travel & Entertainment',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 4500,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 3487.17,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 1012.83,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: ' ',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
      {
        type: 'subTotal',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        borderTop: true,
        borderBottom: true,
        items: [
          {
            column: {
              align: 'left',
              header: 'Subtotal',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Subtotal',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 108835.38,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 108109.47,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 725.91,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: '',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
      {
        type: 'section',
        category: undefined,
        items: [
          {
            column: {
              align: 'left',
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Non-Headcount Expenses',
          },
        ],
      },
      {
        type: 'category',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        items: [
          {
            column: {
              align: 'left',
              handleOpenModal: () => null,
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Professional Services',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 4500,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 4500,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: ' ',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
      {
        type: 'category',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        items: [
          {
            column: {
              align: 'left',
              handleOpenModal: () => null,
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Admin Expense',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 5250,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 5604.69,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: -354.69,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: ' ',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
      {
        type: 'category',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        items: [
          {
            column: {
              align: 'left',
              handleOpenModal: () => null,
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Software Expense',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 5599.1,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 23384.44,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: -17785.34,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: ' ',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 15450,
          },
        ],
      },
      {
        type: 'category',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        items: [
          {
            column: {
              align: 'left',
              handleOpenModal: () => null,
              header: 'Expense Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 134285,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 0,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: ' ',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 149622.53,
          },
        ],
      },
      {
        type: 'subTotal',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        borderTop: true,
        borderBottom: true,
        items: [
          {
            column: {
              align: 'left',
              header: 'Subtotal',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Subtotal',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 134285,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 15349.1,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 33489.13,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: -18140.03,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: '',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 165072.53,
          },
        ],
      },
      {
        type: 'total',
        category: undefined,
        items: [
          {
            column: {
              align: 'left',
              header: 'Total',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Total',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: 134285,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 124184.48,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
              hasBorderBottomOnCard: true,
            },
            value: 141598.6,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
              hasBorderBottomOnCard: true,
            },
            value: -17414.12,
          },
          {
            column: {
              align: 'left',
              header: 'Comments',
              type: 'text',
              width: '300px',
              hasBorderBottomOnCard: true,
            },
            value: '',
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 165072.53,
          },
        ],
      },
    ],
    currentMonth: DateTime.fromISO('2023-01-01T04:14:00.000Z'),

    breakdownColumnsForActiveTab: [
      {
        align: 'left',
        handleOpenModal: () => null,
        header: 'Expense Category',
        isCardHeader: true,
        type: 'text',
        width: '240px',
      },
      {
        align: 'right',
        hasBorderBottomOnCard: true,
        header: 'Mthly Budget',
        type: 'number',
      },
      {
        align: 'right',
        hasBorderBottomOnCard: true,
        header: 'Forecast',
        type: 'incomeNumber',
      },
      {
        align: 'right',
        hasBorderBottomOnCard: true,
        header: 'Actuals',
        type: 'incomeNumber',
      },
      {
        align: 'right',
        hasBorderBottomOnCard: true,
        header: 'Difference',
        type: 'number',
      },
      {
        align: 'left',
        hasBorderBottomOnCard: true,
        header: 'Comments',
        type: 'text',
        width: '300px',
      },
      {
        align: 'right',
        header: 'Payments',
        type: 'number',
      },
    ],
    mainTableItems: [
      {
        type: 'normal',
        items: [
          {
            column: {
              align: 'left',
              cellRender: renderWallet,
              header: 'Wallet',
              isCardHeader: true,
              minWidth: '220px',
              type: 'custom',
              width: '220px',
            },
            value: {
              name: 'Permanent Team (Dai)',
              address: '0x34d8d61050ef9d2b48ab00e6dc8a8ca6581c5d63',
              currentBalance: 0,
              id: '1946',
              budgetStatementLineItem: [
                {
                  actual: 0,
                  budgetCap: 450,
                  budgetCategory: 'Community Development Expense',
                  comments: '',
                  forecast: 450,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-07-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 1250,
                  budgetCategory: 'Contingency Buffer',
                  comments: '',
                  forecast: 1250,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-07-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 17008,
                  budgetCategory: 'Compensation & Benefits',
                  comments: '',
                  forecast: 17008,
                  group: 'null',
                  headcountExpense: true,
                  month: '2024-07-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 4500,
                  budgetCategory: 'Software Expense',
                  comments: '',
                  forecast: 4500,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-07-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 11792,
                  budgetCategory: 'Professional Services',
                  comments: '',
                  forecast: 11792,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-07-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 2521,
                  budgetCategory: 'Travel & Entertainment',
                  comments: '',
                  forecast: 2521,
                  group: 'null',
                  headcountExpense: true,
                  month: '2024-07-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 1250,
                  budgetCategory: 'Contingency Buffer',
                  comments: '',
                  forecast: 1250,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-06-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 17008,
                  budgetCategory: 'Compensation & Benefits',
                  comments: '',
                  forecast: 17008,
                  group: 'null',
                  headcountExpense: true,
                  month: '2024-06-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 4500,
                  budgetCategory: 'Software Expense',
                  comments: '',
                  forecast: 4500,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-06-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 11792,
                  budgetCategory: 'Professional Services',
                  comments: '',
                  forecast: 11792,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-06-01',
                  payment: 0,
                },
              ],
            },
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
            },
            value: 37521,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
            },
            value: 37521,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
            },
            value: 37521,
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
      {
        type: 'total',
        hideMobile: true,
        items: [
          {
            column: {
              align: 'left',
              cellRender: renderWallet,
              header: 'Wallet',
              isCardHeader: true,
              minWidth: '220px',
              type: 'custom',
              width: '220px',
            },
            value: 'Total',
          },
          {
            column: {
              align: 'right',
              header: 'Mthly Budget',
              type: 'number',
            },
            value: 37521,
          },
          {
            column: {
              align: 'right',
              header: 'Forecast',
              type: 'incomeNumber',
            },
            value: 37521,
          },
          {
            column: {
              align: 'right',
              header: 'Actuals',
              type: 'incomeNumber',
            },
            value: 0,
          },
          {
            column: {
              align: 'right',
              header: 'Difference',
              type: 'number',
            },
            value: 37521,
          },
          {
            column: {
              align: 'right',
              header: 'Payments',
              type: 'number',
            },
            value: 0,
          },
        ],
      },
    ],
  },
];

const [[BreakdownSectionLight, BreakdownSectionDark]] = createThemeModeVariants(BreakdownSection, variantsArgs);

export { BreakdownSectionLight, BreakdownSectionDark };
