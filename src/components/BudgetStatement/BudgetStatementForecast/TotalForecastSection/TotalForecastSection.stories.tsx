import { DateTime } from 'luxon';

import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import { InnerTableRowBuilder } from '@/core/businessLogic/tableBuilderRow';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';

import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import HeaderWithIcon from '../HeaderWithIcon/HeaderWithIcon';
import ProgressiveIndicator from '../ProgresiveIndicator';
import TotalForecastSection from './TotalForecastSection';
import type { Meta } from '@storybook/react';

const source = {
  description: '1 Month Budget Cap',
  url: 'https://mips.makerdao.com/mips/details/MIP40c3SP82',
  mipNumber: 'MIP40c3SP82',
  title: 'June',
  name: 'MIP40c3-SP82: Modify Development & UX Core Unit Budget (DUX-001)',
  code: 'SES',
};

const mainTableColumns = [
  {
    cellRender: renderWallet,
    header: 'Wallet',
    isCardHeader: true,
    minWidth: '220px',
    type: 'custom',
    width: '220px',
  },
  {
    align: 'right',
    header: (
      <HeaderWithIcon
        description="1 Month Budget Cap"
        link={source.url || ''}
        mipNumber="MIP39c2-SP1"
        title="June"
        name="MIP39c2-SP1:Adding Core Unit (Real-World Finance)"
      />
    ),
    type: 'custom',
  },
  {
    align: 'right',
    header: (
      <HeaderWithIcon
        description="1 Month Budget Cap"
        link={source.url || ''}
        mipNumber="MIP39c2-SP1"
        title="July"
        name="MIP39c2-SP1:Adding Core Unit (Real-World Finance)"
      />
    ),
    type: 'custom',
  },
  {
    align: 'right',
    hasBorderRight: true,
    header: (
      <HeaderWithIcon
        description="1 Month Budget Cap"
        link={source.url || ''}
        mipNumber="MIP39c2-SP1"
        title="August"
        name="MIP39c2-SP1:Adding Core Unit (Real-World Finance)"
      />
    ),
    type: 'custom',
  },
  {
    align: 'right',
    hasBorderRight: true,
    header: 'Mthly Budget',
    hidden: true,
    type: 'number',
  },
  {
    align: 'right',
    header: (
      <HeaderWithIcon
        description="3 MonthS Budget Cap"
        link={source.url || ''}
        mipNumber="MIP39c2-SP1"
        title="Total"
        name="MIP39c2-SP1:Adding Core Unit (Real-World Finance)"
      />
    ),
    type: 'custom',
  },
  {
    align: 'right',
    header: 'Qtly Budget',
    hidden: true,
    type: 'number',
  },
] as InnerTableColumn[];

const meta: Meta<typeof TotalForecastSection> = {
  title: 'Fusion/Components/Budget Statements/Forecast Tab/TotalSections',
  component: TotalForecastSection,
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

const variantsArgs = [
  {
    currentMonth,
    mainTableColumns,
    mainTableItems: [
      new InnerTableRowBuilder()
        .withType('normal')
        .addItem({
          column: mainTableColumns[0],
          value: {
            type: 'custom',
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
          value: (
            // <ContainerProgressiveIndicator>
            <ProgressiveIndicator budgetCap={234} forecast={45} month={currentMonth} />
            // </ContainerProgressiveIndicator>
          ),
        })
        .addItem({
          column: mainTableColumns[2],
          value: <ProgressiveIndicator budgetCap={234} forecast={35} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[3],

          value: <ProgressiveIndicator budgetCap={234} forecast={34} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[4],
          value: <ProgressiveIndicator budgetCap={234} forecast={34} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[5],
          value: <ProgressiveIndicator budgetCap={936} forecast={145} month={currentMonth} />,
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
          value: <ProgressiveIndicator budgetCap={234} forecast={45} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[2],
          value: <ProgressiveIndicator budgetCap={234} forecast={35} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[3],
          value: <ProgressiveIndicator budgetCap={234} forecast={34} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[4],
          value: <ProgressiveIndicator budgetCap={234} forecast={34} month={currentMonth} />,
        })
        .addItem({
          column: mainTableColumns[5],
          value: <ProgressiveIndicator budgetCap={234} forecast={145} month={currentMonth} />,
        })
        .build(),
    ] as InnerTableRow[],
    longCode: 'SES-01',
    shortCode: 'SES',
    resource: 'CoreUnit',
  },
];

const [[BudgetStatementActualsLight, BudgetStatementActualsDark]] = createThemeModeVariants(
  TotalForecastSection,
  variantsArgs
);

export { BudgetStatementActualsLight, BudgetStatementActualsDark };
