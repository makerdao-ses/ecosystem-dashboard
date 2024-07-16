import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import { InnerTableColumnBuilder } from '@/core/businessLogic/tableBuilderColumns';
import { InnerTableRowBuilder } from '@/core/businessLogic/tableBuilderRow';
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
const meta: Meta<typeof BudgetStatementMkrVestingTableSection> = {
  title: 'Fusion/Components/Budget Statements/MkrVesting Tab/BudgetStatementMkrVestingTableSection',
  component: BudgetStatementMkrVestingTableSection,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
    // date: new Date('2023-01-01T04:14:00.000Z'),
  },
};

export default meta;

const variantsArgs = [
  {
    // currentMonth: DateTime.fromISO('2023-01-01T04:14:00.000Z'),

    mainTableColumns,
    mainTableItems: [
      new InnerTableRowBuilder()
        .withType('normal')
        .addItem({
          column: mainTableColumns[0],
          value: '2022-06-01',
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
          value: <div style={{ paddingLeft: 16 }}>Some reason</div>,
        })
        // .addItem({
        //   column: mainTableColumns[5],
        //   value: 0,
        // })
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
          value: <div style={{ paddingLeft: 16 }}>Some reason</div>,
        })
        // .addItem({
        //   column: mainTableColumns[5],
        //   value: 0,
        // })
        .build(),
    ] as InnerTableRow[],
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
