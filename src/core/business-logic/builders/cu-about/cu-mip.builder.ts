import { CuMip } from '../../../../stories/containers/cu-about/cu-about.api';
import { CuStatusEnum } from '../../../enums/cu-status.enum';
import { setCuMipStatusModifiedDate } from '../../core-units';

export class CuMipAboutBuilder {
  private readonly _cuMip: CuMip;

  constructor() {
    this._cuMip = {
      mipTitle: '',
      mipCode: '',
      cuId: '',
      rfc: '',
      formalSubmission: '',
      accepted: '',
      rejected: '',
      obsolete: '',
      mipStatus: '' as CuStatusEnum,
      mipUrl: '',
    } as CuMip;
  }

  withStatus(status: CuStatusEnum, date: string): CuMipAboutBuilder {
    this._cuMip.mipStatus = status;
    setCuMipStatusModifiedDate(this._cuMip, status, date);
    return this;
  }

  build(): CuMip {
    return this._cuMip;
  }
}
