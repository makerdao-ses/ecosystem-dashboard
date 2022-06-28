import { Mip41Dto } from '../../models/dto/core-unit.dto';

export class Mip41Builder {
  private readonly _mip41: Mip41Dto;

  constructor() {
    this._mip41 = {
      facilitatorName: '',
      contributorId: ''
    } as Mip41Dto;
  }

  public withFacilitatorName(facilitatorName: string): Mip41Builder {
    this._mip41.facilitatorName = facilitatorName;
    return this;
  }

  public withContributorId(contributorId: string): Mip41Builder {
    this._mip41.contributorId = contributorId;
    return this;
  }

  public build(): Mip41Dto {
    return this._mip41;
  }
}
