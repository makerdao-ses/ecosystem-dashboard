import { setCuMipStatusModifiedDate } from '../../coreUnits';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';
import type { CuMipStatus } from '@ses/core/models/interfaces/types';

export class CuMipAboutBuilder {
  private readonly _cuMip: CuMip;

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
      mipStatus: '' as CuMipStatus,
      mipUrl: '',
      mip39: [],
      mip40: [],
      mip41: [],
      mipReplaces: [],
    } as CuMip;
  }

  withStatus(status: CuMipStatus, date: string): CuMipAboutBuilder {
    this._cuMip.mipStatus = status;
    setCuMipStatusModifiedDate(this._cuMip, status, date);
    return this;
  }

  build(): CuMip {
    return this._cuMip;
  }
}
