import { setCuMipStatusModifiedDate } from '../core-units';
import type { CuStatusEnum } from '../../enums/cu-status.enum';
import type { CuMipDto, Mip40Dto, Mip41Dto } from '../../models/dto/core-unit.dto';

export class CuMipBuilder {
  private readonly _cuMip: CuMipDto;

  constructor() {
    this._cuMip = {
      mipStatus: 'Accepted',
      mip40: [] as Mip40Dto[],
      mip41: [] as Mip41Dto[],
      accepted: '',
      rejected: '',
      rfc: '',
      formalSubmission: '',
      obsolete: '',
    } as CuMipDto;
  }

  withStatus(status: CuStatusEnum, date: string): CuMipBuilder {
    this._cuMip.mipStatus = status;
    setCuMipStatusModifiedDate(this._cuMip, status, date);
    return this;
  }

  addMip40(mip40: Mip40Dto): CuMipBuilder {
    this._cuMip.mip40.push(mip40);
    return this;
  }

  addMip41(mip41: Mip41Dto): CuMipBuilder {
    this._cuMip.mip41.push(mip41);
    return this;
  }

  build(): CuMipDto {
    return this._cuMip;
  }
}
