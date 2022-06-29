import { ContributorDto, Mip41Dto } from '../../models/dto/core-unit.dto';

export class Mip41Builder {
  private readonly _mip41: Mip41Dto;

  constructor() {
    this._mip41 = {
      contributor: []
    } as Mip41Dto;
  }

  public addContributor(contributor: ContributorDto) {
    this._mip41.contributor.push(contributor);

    return this;
  }

  public build(): Mip41Dto {
    return this._mip41;
  }
}
