import {
  BudgetStatementDto,
  ContributorCommitmentDto,
  CoreUnitDto,
  CuMipDto,
  RoadMapDto,
  SocialMediaChannelDto
} from '../../models/dto/core-unit.dto';
import { CuCategoryEnum } from '../../enums/cu-category.enum';

export class CoreUnitsBuilder {
  private readonly _coreUnit: CoreUnitDto;

  constructor() {
    this._coreUnit = {
      name: '',
      code: '',
      image: '',
      id: '',
      category: [] as string[],
      budgetStatements: [] as BudgetStatementDto[],
      socialMediaChannels: [] as SocialMediaChannelDto[],
      cuMip: [] as CuMipDto[],
      roadMap: [] as RoadMapDto[],
      contributorCommitment: [] as ContributorCommitmentDto[],
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

  addCategory(category: CuCategoryEnum) {
    this._coreUnit.category.push(category);
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

  addRoadMap(roadMap: RoadMapDto): CoreUnitsBuilder {
    this._coreUnit.roadMap.push(roadMap);
    return this;
  }

  addContributorCommitment(contributorCommitment: ContributorCommitmentDto): CoreUnitsBuilder {
    this._coreUnit.contributorCommitment.push(contributorCommitment);
    return this;
  }

  build(): CoreUnitDto {
    return this._coreUnit;
  }
}
