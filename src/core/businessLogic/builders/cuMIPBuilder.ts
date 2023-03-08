import { setCuMipStatusModifiedDate } from '../coreUnits';
import type { CuStatusEnum } from '../../enums/cuStatusEnum';
import type { CuMipDto, Mip40Dto, Mip41Dto } from '../../models/dto/coreUnitDTO';

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

  withFormalSubmission(formalSubmission: string): CuMipBuilder {
    this._cuMip.formalSubmission = formalSubmission;
    return this;
  }

  withMipCode(code: string): CuMipBuilder {
    this._cuMip.mipCode = code;
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
