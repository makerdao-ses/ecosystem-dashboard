import { setCuMipStatusModifiedDate } from '../../core-units';
import type { CuStatusEnum } from '../../../enums/cu-status.enum';
import type { CuMipDto } from '../../../models/dto/core-unit.dto';

export class CuMipAboutBuilder {
  private readonly _cuMip: CuMipDto;

  constructor() {
    this._cuMip = {
      mipTitle: '',
      mipCode: '',
      cuId: '',
      dateMip: new Date(),
      rfc: '',
      formalSubmission: '',
      accepted: '',
      rejected: '',
      obsolete: '',
      mipStatus: '' as CuStatusEnum,
      mipUrl: '',
      mip40: [],
      mip41: [],
    } as CuMipDto;
  }

  withStatus(status: CuStatusEnum, date: string): CuMipAboutBuilder {
    this._cuMip.mipStatus = status;
    setCuMipStatusModifiedDate(this._cuMip, status, date);
    return this;
  }

  build(): CuMipDto {
    return this._cuMip;
  }
}
