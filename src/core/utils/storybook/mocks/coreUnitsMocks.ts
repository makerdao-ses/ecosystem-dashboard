import { BudgetStatementBuilder } from '@ses/core/businessLogic/builders/budgetStatementBuilder';
import { BudgetStatementLineItemBuilder } from '@ses/core/businessLogic/builders/budgetStatementLineItemBuilder';
import { BudgetStatementMKRVestBuilder } from '@ses/core/businessLogic/builders/budgetStatementMKRVestBuilder ';
import { BudgetStatementWalletBuilder } from '@ses/core/businessLogic/builders/budgetStatementWalletBuilder';
import { BudgetStatementWalletTransferRequestBuilder } from '@ses/core/businessLogic/builders/budgetStatementWalletTransferRequestBuilder';
import { CoreUnitsBuilder } from '@ses/core/businessLogic/builders/coreUnitsBuilder';
import { CuMipBuilder } from '@ses/core/businessLogic/builders/cuMIPBuilder';
import { UserBuilder } from '@ses/core/businessLogic/builders/userBuilder';
import { CuCategoryEnum } from '@ses/core/enums/cuCategoryEnum';
import { CuMipStatus } from '@ses/core/models/interfaces/types';
import type { SocialMediaChannels } from '@ses/core/models/interfaces/socialMedia';

export const SESCoreUnitMocked = new CoreUnitsBuilder()
  .withId('1')
  .withCode('SES-001')
  .withShortCode('SES')
  .addBudgetPath('atlas/legacy/core-units/SES-001/')
  .withName('Sustainable Ecosystem Scaling')
  .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png')
  .withDescription(
    "The aim of SES is to sustainably grow the Maker Protocol's moats by systematically removing barriers between the decentralized workforce, capital, and work."
  )
  .withParagraphDescription(
    'The SES Core Unit supports a decentralized, effective, and scalable economy on top of the Maker Protocol that continues to push forward its growth in a sustainable manner.\n\nThis decentralized, effective, and scalable economy:  \n\n1. Has the best and most successful **onboarding experience** for new participants, with the highest **retention rate** in the industry.\n1. Allows everyone to **find the capital they need** to work on **the best projects** which (1) optimally drive protocol growth and (2) are most fulfilling for its participants.\n1. Has **resilient safety mechanisms** in place that **prevent protocol failure** while leaving ample space for **rapid innovation and experimentation.**\n\n**Strategy**\n\nThe strategy for growing the Maker Protocol’s moats is structured as a **continuous improvement** cycle with research and development at its core. Iterating through this cycle will systematically **drive the ecosystem closer to the vision** that was outlined.\n\nIn a typical iteration: (1) new scaling bottlenecks are first identified, (2) research is then conducted on how to remove these bottlenecks, and, finally, (3) activities are funded and kick-started to implement practical solutions in line with the research.'
  )
  .withParagraphImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/diagram.png')
  .addAuditors(new UserBuilder().withName('jhon').build())
  .addCuMip(
    new CuMipBuilder()
      .withMipTitle('MIP39c2-SP10: Core Unit Budget for Sustainable Ecosystem Scaling (SES-001)')
      .withStatus(CuMipStatus.Accepted, '2021-05-25')
      .withMipCode('MIP39')
      .withFormalSubmission('2021-05-25')
      .build()
  )
  .addCuMip(
    new CuMipBuilder()
      .withMipTitle('MIP40c3-SP10: Core Unit Facilitator Onboarding (SES-001)')
      .withStatus(CuMipStatus.Accepted, '2021-05-25')
      .withMipCode('MIP40')
      .withFormalSubmission('2021-05-25')
      .build()
  )
  .addCategory(CuCategoryEnum.Technical)
  .addCategory(CuCategoryEnum.Growth)
  .addCategory(CuCategoryEnum.Support)
  .addCategory(CuCategoryEnum.Operational)
  .addSocialMediaChannel({
    discord: 'https://discord.gg/h7GKvqDyDP',
    forumTag: 'ses-001',
    linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
    twitter: 'https://www.twitter.com/ses-makerdao',
    youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
    github: 'https://github.com/ses-makerdao',
    website: 'https://ses.makerdao.network',
  } as SocialMediaChannels)
  .addBudgetStatement(
    new BudgetStatementBuilder()
      .withId('1')
      .withMonth('2022-09-01')
      .addBudgetStatementWallet(
        new BudgetStatementWalletBuilder()
          .withName('Incubation Team')
          .withAddress('0x7c09ff9b59baaebfd721cbda3676826aa6d7bae8')
          .addBudgetStatementLineItem([
            new BudgetStatementLineItemBuilder()
              .withGroup('Travel & Entertainment')
              .withHeadcountExpense(true)
              .withMonth('2022-09-01')
              .withActual(1000)
              .withForecast(1500)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Compensation & Benefits')
              .withHeadcountExpense(true)
              .withMonth('2022-09-01')
              .withActual(104942.87)
              .withForecast(110487.03)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Gas Expense')
              .withMonth('2022-09-01')
              .withActual(450)
              .withForecast(450)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Software Development Expense')
              .withMonth('2022-09-01')
              .withActual(0)
              .withForecast(40000)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Professional Service')
              .withMonth('2022-09-01')
              .withActual(10500)
              .withForecast(10500)
              .withPayment(566)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Marketing Expense')
              .withMonth('2022-09-01')
              .withActual(1500)
              .withForecast(0)
              .build(),
            // forecast
            new BudgetStatementLineItemBuilder()
              .withGroup('Compensation & Benefits')
              .withMonth('2022-10-01')
              .withActual(1500)
              .withForecast(152)
              .withBudgetCap(554)
              .withPayment(566)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Travel & Entertainment')
              .withMonth('2022-11-01')
              .withActual(1500)
              .withForecast(425)
              .withBudgetCap(458)
              .withHeadcountExpense(true)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Software Expense')
              .withMonth('2022-12-01')
              .withActual(1500)
              .withForecast(778)
              .withBudgetCap(965548)
              .build(),
          ])
          .addBudgetStatementTransferRequest([
            new BudgetStatementWalletTransferRequestBuilder()
              .withRequestAmount(332276.72)
              .withWalletBalance(238253.38)
              .withWalletBalanceTimeStamp('2022-09-22T18:22:03.856Z')
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
      )
      .addBudgetStatementWallet(
        new BudgetStatementWalletBuilder()
          .withName('Permanent Team')
          .withAddress('0xb5eb779ce300024edb3df9b6c007e312584f6f4f')
          .addBudgetStatementLineItem([
            new BudgetStatementLineItemBuilder()
              .withMonth('2022-09-01')
              .withActual(2000)
              .withForecast(1500)
              .withPayment(2200)
              .build(),
            new BudgetStatementLineItemBuilder()
              .withGroup('Marketing Expense')
              .withMonth('2022-11-01')
              .withActual(256)
              .withForecast(865)
              .withBudgetCap(7445)
              .build(),
          ])
          .addBudgetStatementTransferRequest([
            new BudgetStatementWalletTransferRequestBuilder()
              .withRequestAmount(-18915.2)
              .withWalletBalance(101478.2)
              .withWalletBalanceTimeStamp('2022-28-22T18:22:03.856Z')
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
      )
      .addBudgetStatementMKRVest([
        new BudgetStatementMKRVestBuilder()
          .withComments('Vesting for the SES-001 Core Unit')
          .withMKRAmount(10)
          .withMKRAmountOld(10)
          .withVestingDate('1021-09-01')
          .build(),
        new BudgetStatementMKRVestBuilder()
          .withMKRAmount(2.47)
          .withMKRAmountOld(2.47)
          .withVestingDate('1021-08-24')
          .build(),
        new BudgetStatementMKRVestBuilder()
          .withComments('Vesting testing')
          .withMKRAmount(9.04)
          .withMKRAmountOld(9.04)
          .withVestingDate('1021-08-01')
          .build(),
        new BudgetStatementMKRVestBuilder()
          .withMKRAmount(5.36)
          .withMKRAmountOld(5.36)
          .withVestingDate('1021-07-16')
          .build(),
      ])
      .build()
  )
  .build();
