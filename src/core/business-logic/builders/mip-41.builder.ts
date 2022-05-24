import { Mip41Dao } from '../../../stories/containers/cu-table/cu-table.api';

export class Mip41Builder {
  private readonly _mip41: Mip41Dao;

  constructor() {
    this._mip41 = {
      facilitatorName: '',
      contributorId: ''
    } as Mip41Dao;
  }

  public withFacilitatorName(facilitatorName: string): Mip41Builder {
    this._mip41.facilitatorName = facilitatorName;
    return this;
  }

  public withContributorId(contributorId: string): Mip41Builder {
    this._mip41.contributorId = contributorId;
    return this;
  }
}
