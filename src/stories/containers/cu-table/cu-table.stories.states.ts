import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CoreUnitsBuilder } from '../../../core/business-logic/builders/core-units.builder';
import { CuMipBuilder } from '../../../core/business-logic/builders/cu-mip.builder';
import { Mip40Builder } from '../../../core/business-logic/builders/mip-40.builder';
import { BudgetStatementBuilder } from '../../../core/business-logic/builders/budget-statement.builder';
import { BudgetStatementWalletBuilder } from '../../../core/business-logic/builders/budget-statement-wallet.builder';
import { BudgetStatementFteBuilder } from '../../../core/business-logic/builders/budget-statement-fte.builder';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import {
  CURRENT_MINUS_1_MONTH,
  CURRENT_MINUS_2_MONTH,
  CURRENT_MINUS_3_MONTH,
  CURRENT_PLUS_1_MONTH
} from '../../../core/utils/test.utils';
import { RoadmapBuilder } from '../../../core/business-logic/builders/roadmap.builder';
import { RoadmapStatusEnum } from '../../../core/enums/roadmap-status.enum';

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
          .withStatus(CuStatusEnum.Accepted, CURRENT_MINUS_1_MONTH)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MINUS_1_MONTH, [700, 400, 1000])
              .addPeriodWithLineItems(CURRENT_MINUS_1_MONTH, CURRENT_PLUS_1_MONTH, [700, 400, 600])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_1_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1200, 100, 400], CURRENT_MINUS_1_MONTH)
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(CURRENT_MINUS_1_MONTH)
              .withFtes(3.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_2_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([900, 100, 100], CURRENT_MINUS_2_MONTH)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_3_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 300, 100], CURRENT_MINUS_3_MONTH)
              .build()
          )
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('1')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('1')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('1')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
          .withStatus(CuStatusEnum.Rejected, CURRENT_MINUS_1_MONTH)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(CURRENT_MINUS_2_MONTH, CURRENT_MINUS_1_MONTH, [500, 510, 500])
              .addPeriodWithLineItems(CURRENT_MINUS_1_MONTH, CURRENT_PLUS_1_MONTH, [500, 510, 1000])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_1_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400], CURRENT_MINUS_1_MONTH)
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(CURRENT_MINUS_1_MONTH)
              .withFtes(2.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_2_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1000, 100, 100], CURRENT_MINUS_2_MONTH)
              .build()
          )
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('2')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('2')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('2')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
          .withStatus(CuStatusEnum.Withdrawn, CURRENT_MINUS_1_MONTH)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MINUS_1_MONTH, [500, 510, 500])
              .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_PLUS_1_MONTH, [500, 510])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_1_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([500, 100, 400], CURRENT_MINUS_1_MONTH)
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(CURRENT_MINUS_1_MONTH)
              .withFtes(7.5)
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_3_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([100, 100, 100], CURRENT_MINUS_3_MONTH)
              .build()
          )
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('3')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
          .withStatus(CuStatusEnum.RFC, CURRENT_MINUS_1_MONTH)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(CURRENT_MINUS_1_MONTH, CURRENT_PLUS_1_MONTH, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_1_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([1200, 100, 400], CURRENT_MINUS_1_MONTH)
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(CURRENT_MINUS_1_MONTH)
              .withFtes(3.5)
              .build()
          )
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('4')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('4')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('4')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('4')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
          .withStatus(CuStatusEnum.FormalSubmission, CURRENT_MINUS_1_MONTH)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_PLUS_1_MONTH, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_2_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([400, 100, 400], CURRENT_MINUS_2_MONTH)
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(CURRENT_MINUS_1_MONTH)
              .withFtes(10)
              .build()
          )
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('5')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('5')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
          .withStatus(CuStatusEnum.Obsolete, CURRENT_MINUS_1_MONTH)
          .addMip40(
            (new Mip40Builder())
              .addPeriodWithLineItems(CURRENT_MINUS_3_MONTH, CURRENT_MINUS_2_MONTH, [500, 510, 500])
              .build()
          )
          .build()
      )
      .addBudgetStatement(
        (new BudgetStatementBuilder())
          .withMonth(CURRENT_MINUS_3_MONTH)
          .addBudgetStatementWallet(
            (new BudgetStatementWalletBuilder())
              .withLineItems([200, 100, 400], CURRENT_MINUS_3_MONTH)
              .build()
          )
          .addBudgetStatementFTE(
            (new BudgetStatementFteBuilder())
              .withMonth(CURRENT_MINUS_1_MONTH)
              .withFtes(4.5)
              .build()
          )
          .build()
      )
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('6')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
      .addRoadMap(
        (new RoadmapBuilder())
          .withOwnerCuId('7')
          .withRoadmapStatus(RoadmapStatusEnum.InProgress)
          .build()
      )
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
  facilitatorsDescription: {}
};
