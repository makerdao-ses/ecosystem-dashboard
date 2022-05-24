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
              .withLineItems([100, 100, 100])
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
        twitter: '',
        discord: '',
        website: ''
      })
      .build(),
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
