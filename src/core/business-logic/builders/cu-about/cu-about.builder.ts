import {
  BudgetStatement,
  ContributorCommitment,
  CuAbout,
  CuMip,
  SocialMediaChannels,
} from '../../../../stories/containers/cu-about/cu-about.api';
import { BudgetStatementDao } from '../../../../stories/containers/cu-table/cu-table.api';
import { CuCategoryEnum } from '../../../enums/cu-category.enum';

export class CoreUnitsAboutBuilder {
  private readonly _coreUnitAbout: CuAbout;

  constructor() {
    this._coreUnitAbout = {
      id: '',
      code: '',
      category: [] as CuCategoryEnum[],
      name: '',
      sentenceDescription: '',
      paragraphDescription: '',
      paragraphImage: '',
      socialMediaChannels: [] as SocialMediaChannels[],
      cuMip: [] as CuMip[],
      budgetStatements: [] as BudgetStatement[],
      contributorCommitment: [] as ContributorCommitment[],
    } as CuAbout;
  }

  withId(id: string): CoreUnitsAboutBuilder {
    this._coreUnitAbout.id = id;
    return this;
  }

  withName(name: string): CoreUnitsAboutBuilder {
    this._coreUnitAbout.name = name;
    return this;
  }

  withCode(code: string): CoreUnitsAboutBuilder {
    this._coreUnitAbout.code = code;
    return this;
  }

  withSentenceDescription(sentenceDescription: string): CoreUnitsAboutBuilder {
    this._coreUnitAbout.sentenceDescription = sentenceDescription;
    return this;
  }

  withParagraphDescription(
    paragraphDescription: string
  ): CoreUnitsAboutBuilder {
    this._coreUnitAbout.paragraphDescription = paragraphDescription;
    return this;
  }

  withParagraphImage(paragraphImage: string): CoreUnitsAboutBuilder {
    this._coreUnitAbout.paragraphImage = paragraphImage;
    return this;
  }

  addCategory(category: CuCategoryEnum) {
    this._coreUnitAbout.category.push(category);
    return this;
  }

  addBudgetStatement(
    budgetStatement: BudgetStatementDao
  ): CoreUnitsAboutBuilder {
    this._coreUnitAbout.budgetStatements.push(budgetStatement);
    return this;
  }

  addSocialMediaChannel(
    socialMediaChannel: SocialMediaChannels
  ): CoreUnitsAboutBuilder {
    this._coreUnitAbout.socialMediaChannels.push(socialMediaChannel);
    return this;
  }

  addCuMip(cuMip: CuMip): CoreUnitsAboutBuilder {
    this._coreUnitAbout.cuMip.push(cuMip);
    return this;
  }

  addContributorCommitment(
    contributor: ContributorCommitment
  ): CoreUnitsAboutBuilder {
    this._coreUnitAbout.contributorCommitment.push(contributor);
    return this;
  }

  build(): CuAbout {
    return this._coreUnitAbout;
  }
}
