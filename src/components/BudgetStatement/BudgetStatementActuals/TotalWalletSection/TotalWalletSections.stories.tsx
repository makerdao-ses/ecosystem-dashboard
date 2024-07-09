import { DateTime } from 'luxon';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import TotalWalletSections from './TotalWalletSections';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TotalWalletSections> = {
  title: 'Fusion/Components/Budget Statements/TotalWalletSections',
  component: TotalWalletSections,
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
    currentMonth: DateTime.fromISO('2023-01-01T04:14:00.000Z'),

    mainTableColumns: [
      {
        align: 'left',
        cellRender: renderWallet,
        header: 'Wallet',
        isCardHeader: true,
        minWidth: '220px',
        type: 'custom',
        width: '220px',
      },
      {
        align: 'right',
        header: 'Mthly Budget',
        type: 'number',
      },
      {
        align: 'right',
        header: 'Forecast',
        type: 'incomeNumber',
      },
      {
        align: 'right',
        header: 'Actuals',
        type: 'incomeNumber',
      },
      {
        align: 'right',
        header: 'Difference',
        type: 'number',
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
                {
                  actual: 0,
                  budgetCap: 2521,
                  budgetCategory: 'Travel & Entertainment',
                  comments: '',
                  forecast: 2521,
                  group: 'null',
                  headcountExpense: true,
                  month: '2024-06-01',
                  payment: 0,
                },
                {
                  actual: 0,
                  budgetCap: 450,
                  budgetCategory: 'Community Development Expense',
                  comments: '',
                  forecast: 450,
                  group: 'null',
                  headcountExpense: false,
                  month: '2024-06-01',
                  payment: 0,
                },
              ],
              budgetStatementTransferRequest: [],
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

    longCode: 'SES-01',
    shortCode: 'SES',
    resource: 'CoreUnit',
  },
];

const [[BudgetStatementActualsLight, BudgetStatementActualsDark]] = createThemeModeVariants(
  TotalWalletSections,
  variantsArgs
);

export { BudgetStatementActualsLight, BudgetStatementActualsDark };
