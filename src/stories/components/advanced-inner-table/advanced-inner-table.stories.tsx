import { renderLinks } from '@ses/containers/transparency-report/transparency-report.utils';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import React from 'react';
import { formatAddressForOutput } from '../../../core/utils/string.utils';
import { CustomLink } from '../custom-link/custom-link';
import { WalletTableCell } from '../wallet-table-cell/wallet-table-cell';
import { AdvancedInnerTable } from './advanced-inner-table';
import type { InnerTableColumn, InnerTableRow } from './advanced-inner-table';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/AdvancedInnerTable',
  component: AdvancedInnerTable,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof AdvancedInnerTable>;

const budgetStatement = {
  name: 'Recognized Delegates',
  address: '0x232b...8482',
  currentBalance: 454,
  budgetStatementLineItem: [],
  budgetStatementTransferRequest: [],
};

const mainTableColumns: InnerTableColumn[] = [
  {
    header: 'budget',
    align: 'left',
    type: 'custom',
    isCardHeader: true,
    width: '202px',
    minWidth: '202px',
  },
  {
    header: 'Forecast',
    align: 'left',
    type: 'text',
    headerAlign: 'left',
  },
  {
    header: 'Actuals',
    align: 'left',
    type: 'number',
  },
  {
    header: 'Difference',
    align: 'left',
    type: 'number',
  },
  {
    header: 'Payments',
    align: 'left',
    type: 'number',
  },
  {
    header: 'External Links',
    align: 'left',
    type: 'custom',
    cellRender: renderLinks,
    isCardFooter: true,
  },
];

const variantsArgs = [
  {
    columns: mainTableColumns,
    items: [
      {
        type: 'normal',
        items: [
          {
            column: {
              type: 'custom',
              align: 'left',
              minWidth: '202px',
              width: '202px',
              isCardHeader: true,
              cellRender() {
                return (
                  <WalletTableCell
                    key={budgetStatement.address}
                    name={budgetStatement.name}
                    wallet={formatAddressForOutput(budgetStatement.address)}
                    address={budgetStatement.address}
                  />
                );
              },
            },
            value: 45,
          },
          {
            column: {
              type: 'number',
              align: 'top',
            },
            value: Math.trunc(134468),
          },
          {
            column: {
              type: 'number',
            },
            value: Math.trunc(132897),
          },
          {
            column: {
              type: 'number',
              align: 'right',
            },
            value: Math.trunc(1571),
          },
          {
            column: {
              type: 'number',
              align: 'right',
            },
            value: Math.trunc(138754),
          },
          {
            column: {
              type: 'custom',
              isCardFooter: true,
            },
            value: (
              <CustomLink
                fontFamily={'Inter, sans-serif'}
                href={'https://etherscan.io/address/'}
                style={{
                  marginRight: '16px',
                }}
                fontSize={16}
                fontSizeMobile={14}
                fontWeight={500}
              >
                Etherscan
              </CustomLink>
            ),
          },
        ],
      },
    ] as InnerTableRow[],
    style: { marginBottom: '64px' },
    cardsTotalPosition: 'center',
    longCode: 'SES',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(AdvancedInnerTable, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A153251&t=lKNQyZlf3b81o4BN-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -30,
            left: -56,
          },
        },
      },

      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A160194&t=Z9DVcTvtdJLpeRRQ-4',
        options: {
          componentStyle: {
            width: 770,
            height: 129,
          },
          style: {
            top: -18,
            left: -20,
          },
        },
      },
    },
  },
};
