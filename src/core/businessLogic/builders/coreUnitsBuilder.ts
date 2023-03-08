import type { CuCategoryEnum } from '../../enums/cuCategoryEnum';
import type {
  ActivityFeedDto,
  AuditorDto,
  BudgetStatementDto,
  ContributorCommitmentDto,
  CoreUnitDto,
  CuMipDto,
  SocialMediaChannelDto,
} from '../../models/dto/coreUnitDTO';

export class CoreUnitsBuilder {
  private readonly _coreUnit: CoreUnitDto;

  constructor() {
    this._coreUnit = {
      name: '',
      code: '',
      shortCode: '',
      image: '',
      id: '',
      legacyBudgetStatementUrl: '',
      sentenceDescription: '',
      category: [] as string[],
      auditors: [] as AuditorDto[],
      budgetStatements: [] as BudgetStatementDto[],
      socialMediaChannels: [] as SocialMediaChannelDto[],
      cuMip: [] as CuMipDto[],
      contributorCommitment: [] as ContributorCommitmentDto[],
      activityFeed: [] as ActivityFeedDto[],
    } as CoreUnitDto;
  }

  withId(id: string): CoreUnitsBuilder {
    this._coreUnit.id = id;
    return this;
  }

  withName(name: string): CoreUnitsBuilder {
    this._coreUnit.name = name;
    return this;
  }

  withImage(image: string): CoreUnitsBuilder {
    this._coreUnit.image = image;
    return this;
  }

  withCode(code: string): CoreUnitsBuilder {
    this._coreUnit.code = code;
    return this;
  }

  withShortCode(code: string): CoreUnitsBuilder {
    this._coreUnit.shortCode = code;
    return this;
  }

  withLegacyBudgetStatementUrl(url: string): CoreUnitsBuilder {
    this._coreUnit.legacyBudgetStatementUrl = url;
    return this;
  }

  withDescription(description: string): CoreUnitsBuilder {
    this._coreUnit.sentenceDescription = description;
    return this;
  }

  addCategory(category: CuCategoryEnum) {
    this._coreUnit.category.push(category);
    return this;
  }

  addAuditors(auditors: AuditorDto | AuditorDto[]): CoreUnitsBuilder {
    if (Array.isArray(auditors)) {
      this._coreUnit.auditors = this._coreUnit.auditors.concat(auditors);
    } else {
      this._coreUnit.auditors.push(auditors);
    }
    return this;
  }

  addBudgetStatement(budgetStatement: BudgetStatementDto): CoreUnitsBuilder {
    this._coreUnit.budgetStatements.push(budgetStatement);
    return this;
  }

  addSocialMediaChannel(socialMediaChannel: SocialMediaChannelDto): CoreUnitsBuilder {
    this._coreUnit.socialMediaChannels.push(socialMediaChannel);
    return this;
  }

  addCuMip(cuMip: CuMipDto): CoreUnitsBuilder {
    this._coreUnit.cuMip.push(cuMip);
    return this;
  }

  addContributorCommitment(contributorCommitment: ContributorCommitmentDto): CoreUnitsBuilder {
    this._coreUnit.contributorCommitment.push(contributorCommitment);
    return this;
  }

  addActivity(activity: ActivityFeedDto): CoreUnitsBuilder {
    this._coreUnit.activityFeed.push(activity);
    return this;
  }

  build(): CoreUnitDto {
    return this._coreUnit;
  }
}
