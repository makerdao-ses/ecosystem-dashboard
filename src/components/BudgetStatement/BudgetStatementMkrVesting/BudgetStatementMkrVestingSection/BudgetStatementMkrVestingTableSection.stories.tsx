import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import { InnerTableColumnBuilder } from '@/core/businessLogic/tableBuilderColumns';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';

import ToolTipMkrVesting from '../ToolTipMkrVesting';
import BudgetStatementMkrVestingTableSection from './BudgetStatementMkrVestingTableSection';
import type { Meta } from '@storybook/react';

const mainTableColumns = [
  new InnerTableColumnBuilder()
    .withHeader('Vesting Date')
    .withIsCardHeader(true)
    .withHasBorderBottomOnCard(true)
    .build(),
  new InnerTableColumnBuilder()
    .withAlign('right')
    .withHasBorderBottomOnCard(true)
    .withHeader('MKR Amount')
    .withType('number')
    .build(),
  new InnerTableColumnBuilder()
    .withHasBorderBottomOnCard(true)
    .withAlign('right')
    .withHeader('Last month')
    .withType('incomeNumber')
    .build(),
  new InnerTableColumnBuilder()
    .withHasBorderBottomOnCard(true)
    .withAlign('right')
    .withHeader(<ToolTipMkrVesting title="Difference" />)
    .withType('incomeNumber')
    .build(),
  new InnerTableColumnBuilder().withAlign('left').withHeader('Reason(s)').withType('text').build(),
] as InnerTableColumn[];
const mainTableItems = [
  {
    borderBottom: true,
    type: 'category',
    items: [
      {
        column: {
          header: 'Vesting Date',
          align: 'right',
          isCardHeader: true,
        },
        value: '2022-06-01',
      },
      {
        column: {
          header: 'Last month',
          type: 'number',
          align: 'right',
          hasBorderBottomOnCard: true,
        },
        value: 234,
      },
      {
        column: {
          header: 'Difference',
          type: 'number',
          align: 'right',
          hasBorderBottomOnCard: true,
        },
        value: 366.35,
      },
      {
        column: {
          header: 'Last month',
          type: 'number',
          align: 'right',
          hasBorderBottomOnCard: true,
        },
        value: 234,
      },
      {
        column: {
          header: 'Reason(s)',
          type: 'text',
        },
        value: 'new hires',
      },
    ],
  },
  {
    borderBottom: true,
    type: 'category',
    items: [
      {
        column: {
          header: 'Vesting Date',
          isCardHeader: true,
        },
        value: '2022-12-31',
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'MKR Amount',
          type: 'number',
        },
        value: 183.18,
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'Last month',
          type: 'number',
        },
        value: 0,
      },
      {
        column: {
          header: 'Difference',
          type: 'number',
          align: 'right',
          hasBorderBottomOnCard: true,
        },
        value: 234,
      },
      {
        column: {
          align: 'right',

          header: 'Reason(s)',
          type: 'text',
        },
        value: 'new hires',
      },
    ],
  },
  {
    borderBottom: true,
    type: 'category',
    items: [
      {
        column: {
          header: 'Vesting Date',
          isCardHeader: true,
        },
        value: '2023-06-01',
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'MKR Amount',
          type: 'number',
        },
        value: 183.18,
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'Last month',
          type: 'number',
        },
        value: 0,
      },
      {
        column: {
          header: 'Difference',
          type: 'number',
          align: 'right',
          hasBorderBottomOnCard: true,
        },
        value: 234,
      },
      {
        column: {
          align: 'right',

          header: 'Reason(s)',
          type: 'text',
        },
        value: 'new hires',
      },
    ],
  },
  {
    borderBottom: true,
    type: 'total',
    items: [
      {
        column: {
          header: 'Vesting Date',
          isCardHeader: true,
        },
        value: 'Total',
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'MKR Amount',
          type: 'number',
        },
        value: 1099.07,
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'Last month',
          type: 'number',
        },
        value: 2340,
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'Difference',
          type: 'number',
        },
        value: 2340,
      },
    ],
  },
] as InnerTableRow[];

const meta: Meta<typeof BudgetStatementMkrVestingTableSection> = {
  title: 'Fusion/Components/Budget Statements/MkrVesting Tab/BudgetStatementMkrVestingTableSection',
  component: BudgetStatementMkrVestingTableSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    mainTableColumns,
    mainTableItems: mainTableItems as InnerTableRow[],
    longCode: 'SES-01',
    shortCode: 'SES',
    resource: 'CoreUnit',
  },
];

const [[BudgetStatementActualsLight, BudgetStatementActualsDark]] = createThemeModeVariants(
  BudgetStatementMkrVestingTableSection,
  variantsArgs
);

export { BudgetStatementActualsLight, BudgetStatementActualsDark };
