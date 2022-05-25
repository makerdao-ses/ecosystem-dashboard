import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CoreUnitsBuilder } from '../../../core/business-logic/builders/core-units.builder';
import { CuMipBuilder } from '../../../core/business-logic/builders/cu-mip.builder';
import { Mip40Builder } from '../../../core/business-logic/builders/mip-40.builder';
import { BudgetStatementBuilder } from '../../../core/business-logic/builders/budget-statement.builder';
import { BudgetStatementWalletBuilder } from '../../../core/business-logic/builders/budget-statement-wallet.builder';
import { BudgetStatementFteBuilder } from '../../../core/business-logic/builders/budget-statement-fte.builder';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';

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
          .withStatus(CuStatusEnum.Accepted, '2022-04-01')
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems('2022-03-01', '2022-06-01', [1000, 1100, 1000])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-04-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth('2022-04-01')
              .withFtes(3.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-03-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([900, 100, 100])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-02-01')
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
          .withStatus(CuStatusEnum.Accepted, '2022-04-01')
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems('2022-03-01', '2022-06-01', [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-04-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth('2022-04-01')
              .withFtes(2.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-03-01')
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
          .withStatus(CuStatusEnum.Accepted, '2022-04-01')
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems('2022-03-01', '2022-06-01', [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-04-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth('2022-04-01')
              .withFtes(7.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-02-01')
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
          .withStatus(CuStatusEnum.Accepted, '2022-04-01')
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems('2022-03-01', '2022-06-01', [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-04-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth('2022-04-01')
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
          .withStatus(CuStatusEnum.Accepted, '2022-04-01')
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems('2022-03-01', '2022-06-01', [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-03-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([400, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth('2022-04-01')
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
          .withStatus(CuStatusEnum.Accepted, '2022-04-01')
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems('2022-03-01', '2022-06-01', [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth('2022-02-01')
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400])
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth('2022-04-01')
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
  ],
  status: 'idle',
  facilitatorImages: {}
};
