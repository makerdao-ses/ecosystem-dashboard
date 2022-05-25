import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CoreUnitsBuilder } from '../../../core/business-logic/builders/core-units.builder';
import { CuMipBuilder } from '../../../core/business-logic/builders/cu-mip.builder';
import { Mip40Builder } from '../../../core/business-logic/builders/mip-40.builder';
import { BudgetStatementBuilder } from '../../../core/business-logic/builders/budget-statement.builder';
import { BudgetStatementWalletBuilder } from '../../../core/business-logic/builders/budget-statement-wallet.builder';
import { BudgetStatementFteBuilder } from '../../../core/business-logic/builders/budget-statement-fte.builder';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { DateTime } from 'luxon';

const currentMinus1Month = DateTime.now().set({ day: 1 }).minus({ month: 1 }).toFormat('y-MM-dd');
const currentMinus2Month = DateTime.now().set({ day: 1 }).minus({ month: 2 }).toFormat('y-MM-dd');
const currentMinus3Month = DateTime.now().set({ day: 1 }).minus({ month: 3 }).toFormat('y-MM-dd');
const currentPlus1Month = DateTime.now().set({ day: 1 }).plus({ month: 1 }).toFormat('y-MM-dd');

export const initialState = {
  items: [
    (new CoreUnitsBuilder())
      .withId('1')
      .withName('Core Unit 1')
      .withCode('CU1')
      .withImage('https://cdn.w600.comps.canstockphoto.com/online-stock-images_csp25890854.jpg')
      .addCategory(CuCategoryEnum.Business)
      .addCuMip(
        (new CuMipBuilder())
          .withStatus(CuStatusEnum.Accepted, currentMinus1Month)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(currentMinus2Month, currentPlus1Month, [1000, 1100, 1000])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus1Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(currentMinus1Month)
              .withFtes(3.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus2Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([900, 100, 100])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus3Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 300, 100])
              .build()
          )
          .build()
      )
      .addRoadMap({
        ownerCuId: '1',
      })
      .addRoadMap({
        ownerCuId: '1',
      })
      .addRoadMap({
        ownerCuId: '',
      })
      .addSocialMediaChannel({
        forumTag: 'some-tag',
        linkedIn: 'https://linkedin.com',
        youtube: 'https://youtube.com',
        twitter: 'https://twitter.com',
        discord: '',
        website: ''
      })
      .build(),
    // -- Core Unit --
    (new CoreUnitsBuilder())
      .withId('2')
      .withName('Core Unit 2')
      .withCode('CU2')
      .addCategory(CuCategoryEnum.Business)
      .addCuMip(
        (new CuMipBuilder())
          .withStatus(CuStatusEnum.Accepted, currentMinus1Month)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(currentMinus2Month, currentPlus1Month, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus1Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(currentMinus1Month)
              .withFtes(2.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus2Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([100, 100, 100])
              .build()
          )
          .build()
      )
      .addRoadMap({
        ownerCuId: '2',
      })
      .addRoadMap({
        ownerCuId: '2',
      })
      .addRoadMap({
        ownerCuId: '2',
      })
      .addSocialMediaChannel({
        forumTag: 'some-tag',
        linkedIn: '',
        youtube: '',
        twitter: '',
        discord: '',
        website: ''
      })
      .build(),
    // -- Core Unit --
    (new CoreUnitsBuilder())
      .withId('3')
      .withName('Core Unit 3')
      .withCode('CU3')
      .addCategory(CuCategoryEnum.Business)
      .addCuMip(
        (new CuMipBuilder())
          .withStatus(CuStatusEnum.Accepted, currentMinus1Month)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(currentMinus2Month, currentPlus1Month, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus1Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(currentMinus1Month)
              .withFtes(7.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus3Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([100, 100, 100])
              .build()
          )
          .build()
      )
      .addRoadMap({
        ownerCuId: '3',
      })
      .addSocialMediaChannel({
        forumTag: 'some-tag',
        linkedIn: 'https://linkedin.com',
        youtube: '',
        twitter: '',
        discord: '',
        website: ''
      })
      .build(),
    // -- Core Unit --
    (new CoreUnitsBuilder())
      .withId('4')
      .withName('Core Unit 4')
      .withCode('CU4')
      .addCategory(CuCategoryEnum.Business)
      .addCuMip(
        (new CuMipBuilder())
          .withStatus(CuStatusEnum.Accepted, currentMinus1Month)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(currentMinus2Month, currentPlus1Month, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus1Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(currentMinus1Month)
              .withFtes(3.5)
              .build()
          )
          .build()
      )
      .addRoadMap({
        ownerCuId: '4',
      })
      .addRoadMap({
        ownerCuId: '4',
      })
      .addRoadMap({
        ownerCuId: '4',
      })
      .addRoadMap({
        ownerCuId: '4',
      })
      .addSocialMediaChannel({
        forumTag: 'some-tag',
        linkedIn: 'https://linkedin.com',
        youtube: 'https://youtube.com',
        twitter: '',
        discord: 'http://discord.com',
        website: ''
      })
      .build(),
    // -- Core Unit --
    (new CoreUnitsBuilder())
      .withId('5')
      .withName('Core Unit 5')
      .withCode('CU5')
      .addCategory(CuCategoryEnum.Business)
      .addCuMip(
        (new CuMipBuilder())
          .withStatus(CuStatusEnum.Accepted, currentMinus1Month)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(currentMinus2Month, currentPlus1Month, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus2Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([400, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(currentMinus1Month)
              .withFtes(10)
              .build()
          )
          .build()
      )
      .addRoadMap({
        ownerCuId: '5',
      })
      .addRoadMap({
        ownerCuId: '5',
      })
      .addSocialMediaChannel({
        forumTag: '',
        linkedIn: 'https://linkedin.com',
        youtube: 'https://youtube.com',
        twitter: '',
        discord: '',
        website: ''
      })
      .build(),
    // -- Core Unit --
    (new CoreUnitsBuilder())
      .withId('6')
      .withName('Core Unit 6')
      .withCode('CU6')
      .addCategory(CuCategoryEnum.Business)
      .addCuMip(
        (new CuMipBuilder())
          .withStatus(CuStatusEnum.Accepted, currentMinus1Month)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(currentMinus2Month, currentPlus1Month, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(currentMinus3Month)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(currentMinus1Month)
              .withFtes(4.5)
              .build()
          )
          .build()
      )
      .addRoadMap({
        ownerCuId: '6',
      })
      .addSocialMediaChannel({
        forumTag: 'some-tag',
        linkedIn: 'https://linkedin.com',
        youtube: 'https://youtube.com',
        twitter: '',
        discord: '',
        website: ''
      })
      .build(),
    // -- Core Unit --
    (new CoreUnitsBuilder())
      .withId('7')
      .withName('Core Unit 7')
      .withCode('CU7')
      .addCategory(CuCategoryEnum.Business)
      .addRoadMap({
        ownerCuId: '7',
      })
      .addSocialMediaChannel({
        forumTag: 'some-tag',
        linkedIn: 'https://linkedin.com',
        youtube: 'https://youtube.com',
        twitter: '',
        discord: '',
        website: ''
      })
      .build(),
  ],
  status: 'idle',
  facilitatorImages: {}
};
