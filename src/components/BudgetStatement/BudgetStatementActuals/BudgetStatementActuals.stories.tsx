import { DateTime } from 'luxon';
import { BudgetStatementBuilder } from '@/core/businessLogic/builders/budgetStatementBuilder';
import { BudgetStatementLineItemBuilder } from '@/core/businessLogic/builders/budgetStatementLineItemBuilder';
import { BudgetStatementWalletBuilder } from '@/core/businessLogic/builders/budgetStatementWalletBuilder';
import { BudgetStatementWalletTransferRequestBuilder } from '@/core/businessLogic/builders/budgetStatementWalletTransferRequestBuilder';
import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { BudgetStatementActuals } from './BudgetStatementActuals';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BudgetStatementActuals> = {
  title: 'Fusion/Components/Budget Statements/BudgetStatementActuals',
  component: BudgetStatementActuals,
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
    budgetStatements: [
      new BudgetStatementBuilder()
        .withId('1')
        .withMonth('2023-01-01')
        .addBudgetStatementWallet(
          new BudgetStatementWalletBuilder()
            .withName('Incubation Team')
            .withAddress('0x7c09ff9b59baaebfd721cbda3676826aa6d7bae8')
            .addBudgetStatementLineItem([
              new BudgetStatementLineItemBuilder()
                .withGroup('Travel & Entertainment')
                .withHeadcountExpense(true)
                .withMonth('2023-01-01')
                .withActual(1000)
                .withForecast(1500)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Compensation & Benefits')
                .withHeadcountExpense(true)
                .withMonth('2023-01-01')
                .withActual(104942.87)
                .withForecast(110487.03)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Gas Expense')
                .withMonth('2023-01-01')
                .withActual(450)
                .withForecast(450)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Software Development Expense')
                .withMonth('2023-01-01')
                .withActual(0)
                .withForecast(40000)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Professional Service')
                .withMonth('2023-01-01')
                .withActual(10500)
                .withForecast(10500)
                .withPayment(566)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Marketing Expense')
                .withMonth('2023-01-01')
                .withActual(1500)
                .withForecast(0)
                .build(),
              // forecast
              new BudgetStatementLineItemBuilder()
                .withGroup('Compensation & Benefits')
                .withMonth('2022-01-01')
                .withActual(1500)
                .withForecast(152)
                .withBudgetCap(554)
                .withPayment(566)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Travel & Entertainment')
                .withMonth('2022-01-01')
                .withActual(1500)
                .withForecast(425)
                .withBudgetCap(458)
                .withHeadcountExpense(true)
                .build(),
              new BudgetStatementLineItemBuilder()
                .withGroup('Software Expense')
                .withMonth('2022-01-01')
                .withActual(1500)
                .withForecast(778)
                .withBudgetCap(965548)
                .build(),
            ])
            .addBudgetStatementTransferRequest([
              new BudgetStatementWalletTransferRequestBuilder()
                .withRequestAmount(332276.72)
                .withWalletBalance(238253.38)
                .withWalletBalanceTimeStamp('2023-01-22T18:22:03.856Z')
                .withTargetAmount(506063.09)
                .withTargetCalculation('FEB + MAR Budget Cap')
                .withTargetDescription('Auditor wallets are topped up to 2 times the budget cap')
                .withTargetSource(
                  'MIP40C3-SP14',
                  'https://mips.makerdao.com/mips/details/MIP40c3SP14',
                  'Modify Core Unit Budget - Collateral Engineering Services (SES-001)'
                )
                .build(),
            ])
            .build()
        ),
    ],
    longCode: 'SES-001',
    shortCode: 'SES',
    headline: <div />,
    resource: 'CoreUnit',
  },
];

const [[BudgetStatementActualsLight, BudgetStatementActualsDark]] = createThemeModeVariants(
  BudgetStatementActuals,

  variantsArgs
);
export { BudgetStatementActualsLight, BudgetStatementActualsDark };
