import { DateTime } from 'luxon';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import ProgressiveIndicator from '../ProgresiveIndicator';
import ForecastBreakdownSection from './ForecastBreakdownSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ForecastBreakdownSection> = {
  title: 'Fusion/Components/Budget Statements/ForeCast Tab/BreakdownSection',
  component: ForecastBreakdownSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2023-01-01T04:14:00.000Z'),
  },
};

export default meta;
const currentMonth = DateTime.fromISO('2023-01-01T04:14:00.000Z');
const breakdownColumnsForActiveTab = [
  {
    hasBorderBottomOnCard: true,
    header: 'Budget Category',
    isCardHeader: true,
    type: 'text',
    width: '240px',
  },
  {
    align: 'right',
    hasBorderBottomOnCard: true,
    header: 'January',
    type: 'custom',
  },
  {
    align: 'right',
    hasBorderBottomOnCard: true,
    header: 'February',
    type: 'custom',
  },
  {
    align: 'right',
    hasBorderBottomOnCard: true,
    hasBorderRight: true,
    header: 'March',
    type: 'custom',
  },
  {
    align: 'right',
    hasBorderBottomOnCard: true,
    hasBorderRight: true,
    header: 'Mthly Budget',
    hidden: true,
    type: 'number',
  },
  {
    align: 'right',
    header: 'Totals',
    type: 'custom',
  },
  {
    align: 'right',
    header: 'Qtly Budget',
    hidden: true,
    type: 'number',
  },
];
const mainTableItems = [
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
              forecast: 450,
              group: 'null',
              headcountExpense: false,
              month: 'January',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 1250,
              budgetCategory: 'Contingency Buffer',

              forecast: 1250,
              group: 'null',
              headcountExpense: false,
              month: 'February',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 17008,
              budgetCategory: 'Compensation & Benefits',

              forecast: 17008,
              group: 'null',
              headcountExpense: true,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 4500,
              budgetCategory: 'Software Expense',

              forecast: 4500,
              group: 'null',
              headcountExpense: false,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 11792,
              budgetCategory: 'Professional Services',

              forecast: 11792,
              group: 'null',
              headcountExpense: false,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 2521,
              budgetCategory: 'Travel & Entertainment',

              forecast: 2521,
              group: 'null',
              headcountExpense: true,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 1250,
              budgetCategory: 'Contingency Buffer',

              forecast: 1250,
              group: 'null',
              headcountExpense: false,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 17008,
              budgetCategory: 'Compensation & Benefits',

              forecast: 17008,
              group: 'null',
              headcountExpense: true,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 4500,
              budgetCategory: 'Software Expense',

              forecast: 4500,
              group: 'null',
              headcountExpense: false,
              month: '2023-01-01',
              payment: 0,
            },
            {
              actual: 0,
              budgetCap: 11792,
              budgetCategory: 'Professional Services',

              forecast: 11792,
              group: 'null',
              headcountExpense: false,
              month: '2023-01-01',
              payment: 0,
            },
          ],
        },
      },
    ],
  },
];

const variantsArgs = [
  {
    longCode: 'SES-01',
    shortCode: 'SES',
    resource: 'CoreUnit',
    breakdownTitleRef: null,
    breakdownTabs: ['Permanent Team'],
    headerIds: ['Permanent Team'],
    currentMonth,
    breakdownItems: [
      {
        type: 'section',
        category: undefined,
        items: [
          {
            column: {
              hasBorderBottomOnCard: true,
              header: 'Budget Category',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Non-Headcount Expenses',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: '',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: '',
          },
          {
            column: {
              align: 'right',
              hasBorderBottomOnCard: true,
              hasBorderRight: true,
              header: '',
              type: 'custom',
            },

            value: '',
          },
        ],
      },
      {
        type: 'normal',
        category: 'General',
        subHeader: 'Headcount Expenses',
        showHeader: true,

        items: [
          {
            column: breakdownColumnsForActiveTab[0],
            value: 'Compensation & Benefits',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
        ],
      },
      {
        type: 'normal',
        category: 'General',
        subHeader: 'Headcount Expenses',
        showHeader: true,

        items: [
          {
            column: breakdownColumnsForActiveTab[0],
            value: 'Travel & Entertainment',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
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
              align: 'right',
              header: 'Subtotal',
              isCardHeader: true,
              type: 'text',
              width: '240px',
            },
            value: 'Subtotal',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },

          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
        ],
      },
      {
        type: 'section',
        category: undefined,
        items: [
          {
            column: {
              hasBorderBottomOnCard: true,
              header: 'Budget Category',
              isCardHeader: true,
              type: 'text',

              width: '240px',
            },
            value: 'Non-Headcount Expenses',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: '',
          },
          {
            column: breakdownColumnsForActiveTab[1],
            value: '',
          },
          {
            column: {
              align: 'right',
              hasBorderBottomOnCard: true,
              hasBorderRight: true,
              header: '',
              type: 'custom',
            },

            value: '',
          },
        ],
      },
      {
        type: 'normal',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        showHeader: true,
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
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },

          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
        ],
      },
      {
        type: 'normal',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        showHeader: true,
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
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
        ],
      },
      {
        type: 'normal',
        category: 'General',
        subHeader: 'Non-Headcount Expenses',
        showHeader: true,
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
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },

          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
        ],
      },
      {
        type: 'normal',
        showHeader: true,
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
            value: 'Contingency Buffer',
          },

          {
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },

          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
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
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },

          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
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
            column: breakdownColumnsForActiveTab[1],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[2],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
          {
            column: breakdownColumnsForActiveTab[3],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },

          {
            column: breakdownColumnsForActiveTab[5],
            value: <ProgressiveIndicator month={currentMonth} budgetCap={3454} forecast={345} />,
          },
        ],
      },
    ],
    breakdownColumnsForActiveTab,
    mainTableItems,
  },
  {
    longCode: 'PH-01',
    shortCode: 'PH',
    resource: 'CoreUnit',
    breakdownTitleRef: null,
    breakdownTabs: ['Permanent Team'],
    headerIds: ['Permanent Team'],
    currentMonth,
    breakdownItems: [],
    breakdownColumnsForActiveTab: [],
    mainTableItems,
  },
];

const [[BreakdownSectionLight, BreakdownSectionDark], [BreakdownSectionEmpty, BreakdownSectionEmptyDark]] =
  createThemeModeVariants(ForecastBreakdownSection, variantsArgs);

export { BreakdownSectionLight, BreakdownSectionDark, BreakdownSectionEmpty, BreakdownSectionEmptyDark };
