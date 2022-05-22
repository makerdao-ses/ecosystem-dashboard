import {
  BudgetStatementDao,
  CoreUnitDao,
  CuMipDao,
  RoadMapDao,
  SocialMediaChannelDAO
} from '../../../stories/containers/cu-table/cu-table.api';
import { CuCategoryEnum } from '../../enums/cu-category.enum';

export class CoreUnitsBuilder {
  private readonly _coreUnit: CoreUnitDao;

  constructor() {
    this._coreUnit = {
      name: '',
      code: '',
      image: '',
      id: '',
      category: [] as string[],
      budgetStatements: [] as BudgetStatementDao[],
      socialMediaChannels: [] as SocialMediaChannelDAO[],
      cuMip: [] as CuMipDao[],
      roadMap: [] as RoadMapDao[]
    } as CoreUnitDao;
  }

  withName(name: string): CoreUnitsBuilder {
    this._coreUnit.name = name;
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

  addBudgetStatement(budgetStatement: BudgetStatementDao): CoreUnitsBuilder {
    this._coreUnit.budgetStatements.push(budgetStatement);
    return this;
  }

  addSocialMediaChannel(socialMediaChannel: SocialMediaChannelDAO): CoreUnitsBuilder {
    this._coreUnit.socialMediaChannels.push(socialMediaChannel);
    return this;
  }

  addCuMip(cuMip: CuMipDao): CoreUnitsBuilder {
    this._coreUnit.cuMip.push(cuMip);
    return this;
  }

  addRoadMap(roadMap: RoadMapDao): CoreUnitsBuilder {
    this._coreUnit.roadMap.push(roadMap);
    return this;
  }

  build(): CoreUnitDao {
    return this._coreUnit;
  }
}
