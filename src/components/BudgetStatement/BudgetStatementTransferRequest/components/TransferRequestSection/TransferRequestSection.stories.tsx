import { DateTime } from 'luxon';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';

// import { TargetValueThreeMonths } from '../TargetValueThreeMonths/TargetValueThreeMonths';
import { TargetValueThreeMonths } from '../TargetValueThreeMonths/TargetValueThreeMonths';
import TransferRequestSection from './TransferRequestSection';
import type { Meta } from '@storybook/react';

const target = {
  amount: 1000,
  calculation: 'Jan + Feb + Mar forecast',
  description:
    'SES-001 works with an Auditor for topping up their operational wallet to a runway of 3 months of forecasted expenses, after approval of their latest expense report.',
  source: {
    code: 'MIP40c3SP55',
    title: 'MIP40c3-SP55: Modify Core Unit Budget - Sustainable Ecosystem Scaling (SES-001)',
    url: 'https://mips.makerdao.com/mips/details/MIP40c3SP55',
  },
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
    header: 'Target Balance',
    type: 'custom',
  },
  {
    align: 'right',
    header: 'Balance',
    type: 'number',
  },
  {
    align: 'right',
    header: 'Transfer Request',
    type: 'number',
  },
] as InnerTableColumn[];
const mainTableItems = [
  {
    borderBottom: true,
    type: 'category',
    items: [
      {
        column: mainTableColumns[0],
        value: {
          type: 'custom',
          name: 'Permanent Team (Dai)',
          address: '0x34d8d61050ef9d2b48ab00e6dc8a8ca6581c5d63',
          currentBalance: 0,
          id: '1946',
        },
      },
      {
        column: mainTableColumns[1],
        value: (
          <TargetValueThreeMonths
            balance={target?.amount || 0}
            months={target?.calculation || ''}
            link={target?.source.url || ''}
            description={target?.description || ''}
            name={target?.source.title || ''}
            mipNumber={target?.source.code || ''}
          />
        ),
      },
      {
        column: mainTableColumns[2],
        value: 500,
      },
      {
        column: mainTableColumns[2],
        value: 500,
      },
    ],
  },
  {
    borderBottom: true,
    type: 'category',
    items: [
      {
        column: mainTableColumns[0],
        value: {
          type: 'custom',
          name: 'Grants',
          address: '0x34d8d6ss1050ef9d2b48ab00e6dc8a8ca6581c5d63',
          currentBalance: 123,
          id: '1948',
        },
      },
      {
        column: mainTableColumns[1],
        value: (
          <TargetValueThreeMonths
            balance={target?.amount || 0}
            months={target?.calculation || ''}
            link={target?.source.url || ''}
            description={target?.description || ''}
            name={target?.source.title || ''}
            mipNumber={target?.source.code || ''}
          />
        ),
      },
      {
        column: mainTableColumns[2],
        value: 600,
      },
      {
        column: {
          header: 'Difference',
          type: 'number',
          align: 'right',
          hasBorderBottomOnCard: true,
        },
        value: 400,
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
        value: 2000,
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'Last month',
          type: 'number',
        },
        value: 1100,
      },
      {
        column: {
          align: 'right',
          hasBorderBottomOnCard: true,
          header: 'Difference',
          type: 'number',
        },
        value: 900,
      },
    ],
  },
] as InnerTableRow[];

const meta: Meta<typeof TransferRequestSection> = {
  title: 'Fusion/Components/Budget Statements/Transfer Request Tab/TransferRequestSection',
  component: TransferRequestSection,
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
    mainTableItems,
    longCode: 'SES-01',
    shortCode: 'SES',
    resource: 'CoreUnit',
  },
];

const [[TransferRequestLight, TransferRequestDark]] = createThemeModeVariants(TransferRequestSection, variantsArgs);

export { TransferRequestLight, TransferRequestDark };
