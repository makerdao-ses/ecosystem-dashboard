import type { CuCategoryEnum } from '../../../enums/cu-category.enum';
import type {
  BudgetStatementDto,
  ContributorCommitmentDto,
  CoreUnitDto,
  CuMipDto,
  SocialMediaChannelDto,
} from '../../../models/dto/core-unit.dto';

export class CoreUnitsAboutBuilder {
  private readonly _coreUnitAbout: CoreUnitDto;

  constructor() {
    this._coreUnitAbout = {
      id: '',
      code: '',
      category: [] as CuCategoryEnum[],
      name: '',
      sentenceDescription: '',
      paragraphDescription: '',
      paragraphImage: '',
      socialMediaChannels: [] as SocialMediaChannelDto[],
      cuMip: [] as CuMipDto[],
      budgetStatements: [] as BudgetStatementDto[],
      contributorCommitment: [] as ContributorCommitmentDto[],
    } as CoreUnitDto;
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

  withParagraphDescription(paragraphDescription: string): CoreUnitsAboutBuilder {
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

  addBudgetStatement(budgetStatement: BudgetStatementDto): CoreUnitsAboutBuilder {
    this._coreUnitAbout.budgetStatements.push(budgetStatement);
    return this;
  }

  addSocialMediaChannel(socialMediaChannel: SocialMediaChannelDto): CoreUnitsAboutBuilder {
    this._coreUnitAbout.socialMediaChannels.push(socialMediaChannel);
    return this;
  }

  addCuMip(cuMip: CuMipDto): CoreUnitsAboutBuilder {
    this._coreUnitAbout.cuMip.push(cuMip);
    return this;
  }

  addContributorCommitment(contributor: ContributorCommitmentDto): CoreUnitsAboutBuilder {
    this._coreUnitAbout.contributorCommitment.push(contributor);
    return this;
  }

  build(): CoreUnitDto {
    return this._coreUnitAbout;
  }
}
