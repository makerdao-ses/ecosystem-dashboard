import { DateTime } from 'luxon';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import { InnerTableColumnBuilder } from '@/core/businessLogic/tableBuilderColumns';
import { InnerTableRowBuilder } from '@/core/businessLogic/tableBuilderRow';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import TotalWalletSections from './TotalActualSection';
import type { Meta } from '@storybook/react';
const mainTableColumns = [
  new InnerTableColumnBuilder()
    .withAlign('left')
    .withCellRender(renderWallet)
    .withHeader('Wallet')
    .withIsCardHeader(true)
    .withMinWidth('220px')
    .withType('custom')
    .withHasBorderBottomOnCard(true)
    .withWidth('220px')
    .build(),
  new InnerTableColumnBuilder()
    .withAlign('right')
    .withHasBorderBottomOnCard(true)
    .withHeader('Mthly Budget')
    .withType('number')
    .build(),
  new InnerTableColumnBuilder()
    .withHasBorderBottomOnCard(true)
    .withAlign('right')
    .withHeader('Forecast')
    .withType('incomeNumber')
    .build(),
  new InnerTableColumnBuilder()
    .withHasBorderBottomOnCard(true)
    .withAlign('right')
    .withHeader('Actuals')
    .withType('incomeNumber')
    .build(),
  new InnerTableColumnBuilder()
    .withHasBorderBottomOnCard(true)
    .withAlign('right')
    .withHeader('Difference')
    .withType('number')
    .build(),
  new InnerTableColumnBuilder().withAlign('right').withHeader('Payments').withType('number').build(),
] as InnerTableColumn[];
const meta: Meta<typeof TotalWalletSections> = {
  title: 'Fusion/Components/Budget Statements/Actuals Tab/TotalSections',
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

    mainTableColumns,
    mainTableItems: [
      new InnerTableRowBuilder()
        .withType('normal')
        .addItem({
          column: mainTableColumns[0],
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
        })
        .addItem({
          column: mainTableColumns[1],
          value: 37521,
        })
        .addItem({
          column: mainTableColumns[2],
          value: 37521,
        })
        .addItem({
          column: mainTableColumns[3],
          value: 0,
        })
        .addItem({
          column: mainTableColumns[4],
          value: 37521,
        })
        .addItem({
          column: mainTableColumns[5],
          value: 0,
        })
        .build(),
      new InnerTableRowBuilder()
        .withType('total')
        .withHideMobile(true)
        .addItem({
          column: mainTableColumns[0],
          value: 'Total',
        })
        .addItem({
          column: mainTableColumns[1],
          value: 37521,
        })
        .addItem({
          column: mainTableColumns[2],
          value: 37521,
        })
        .addItem({
          column: mainTableColumns[3],
          value: 0,
        })
        .addItem({
          column: mainTableColumns[4],
          value: 37521,
        })
        .addItem({
          column: mainTableColumns[5],
          value: 0,
        })
        .build(),
    ] as InnerTableRow[],
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
